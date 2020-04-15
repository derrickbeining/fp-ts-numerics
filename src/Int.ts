/**
 * Arbitrary precision integers
 */
import Big, { BigInteger } from 'big-integer'
import * as fc from 'fast-check'
import { option, ord } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import * as Enum from './Enum.Internal'
import { EuclideanRing } from './EuclideanRing'
import { instanceEuclideanRing } from './EuclideanRing'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'
import { instanceReal } from './Real'
import { instanceRing } from './Ring'
import { abs } from './Ring'
import { instanceSemiring } from './Semiring'

declare const INT: unique symbol

/**
 * Arbitrary precision integer type
 *
 * @category Data Type
 */
export interface Int extends Readonly<{ readonly [INT]: unique symbol }> {}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9 | Exclude<Digit, 0>
type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]

function fromBigInt(n: BigInteger): Int {
  return unsafeCoerce(n)
}

/**
 * Constructs a signed, arbitrary precision, two's complement integer from a
 * tuple of digits.
 *
 * ```ts
 * Int.fromDigits(9,2,2,3,3,7,2,0,3,6,8,5,4,7,7,6,0,0,0)
 * // > 9223372036854776000
 * ```
 *
 * @category Constructor
 */
export function of(zero: 0): Int
export function of(...digits: Digits): NonZero<Int>
export function of(...digits: Digits): Int | NonZero<Int> {
  return fromBigInt(Big(digits.map((j) => j.toString()).join('')))
}

export function toNumberLossy(i: Int): number {
  return toBigInt(i).toJSNumber()
}

export function toBigInt(i: Int): BigInteger {
  return unsafeCoerce(i)
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordInt = ord.fromCompare<Int>((a, b) => {
  const _a = toBigInt(a)
  const _b = toBigInt(b)
  return _a.greater(_b) ? 1 : _a.lesser(_b) ? -1 : 0
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringInt = instanceSemiring({
  add: (a, b) => fromBigInt(toBigInt(a).add(toBigInt(b))),
  mul: (a, b) => fromBigInt(toBigInt(a).multiply(toBigInt(b))),
  one: of(1),
  zero: of(0),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringInt = instanceRing<Int>({
  ...semiringInt,
  sub: (a, b) => fromBigInt(toBigInt(a).subtract(toBigInt(b))),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingInt = instanceCommutativeRing({
  ...ringInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingInt = instanceEuclideanRing({
  ...commutativeRingInt,

  degree: (i) => {
    return unsafeCoerce(abs(Int)(i))
  },
  div: (n: Int, d: NonZero<Int>): Int => {
    return fromBigInt(toBigInt(ringInt.sub(n, euclideanRingInt.mod(n, d))).divide(toBigInt(d)))
  },
  mod: (n, d) => {
    const a = toBigInt(n)
    const b = toBigInt(abs(Int)(d))

    return fromBigInt(
      a
        .mod(b)
        .add(b)
        .mod(b)
    )
  },
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumInt = Enum.instanceEnum({
  // Ord
  ...ordInt,
  next: (prev) => option.some(semiringInt.add(prev, semiringInt.one)),
  prev: (next) => option.some(ringInt.sub(next, semiringInt.one)),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const realInt = instanceReal({
  ...ordInt,

  toRational: (a) => Ratio.of(Int)(a, of(1)),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralInt = instanceIntegral<Int>({
  ...realInt,
  toInteger: (a) => a,
  /**
   * truncating integer division (rounds toward zero)
   */
  quot(a: Int, b: Int): Int {
    return fromBigInt(toBigInt(a).divide(toBigInt(b)))
  },
  /**
   * Remainder of truncating integer division. Always takes the sign of the dividend.
   */
  rem(a: Int, b: Int): Int {
    return fromBigInt(toBigInt(a).remainder(toBigInt(b)))
  },
})

const classes: Enum.Enum<Int> & CommutativeRing<Int> & EuclideanRing<Int> & Integral<Int> = {
  ...enumInt,
  ...euclideanRingInt,
  ...integralInt,
  ...realInt,
}

// ## Transformations

export function fromNumber(n: number): Option<Int> {
  if (Number.isInteger(n)) return option.some(unsafeCoerce(Big(n)))
  return option.none
}

export function unsafeFromNumber(n: number): Int {
  if (!Number.isSafeInteger(n)) {
    throw new Error(
      `Cannot coerce number ${n} to Int because it is not an integer between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`
    )
  }
  return fromBigInt(Big(n))
}

// function fromInt(i: Int): Integer {
//   return fromBigInt(bigint(unsafeCoerce(i)))
// }

// function fromInt32(i: Int32): Integer {
//   return fromBigInt(bigint(Int32.toNumber(i)))
// }

// function fromUInt16(i: UInt16): Integer {
//   return fromBigInt(bigint(UInt16.toNumber(i)))
// }

// function fromUInt32(i: UInt32): Integer {
//   return fromBigInt(bigint(UInt32.toNumber(i)))
// }

export function isTypeOf(n: unknown): n is Int {
  return Big.isInstance(n)
}

export function toNumber(i: Int): Option<number> {
  return toBigInt(i).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    toBigInt(i).lesser(Big(Number.MIN_SAFE_INTEGER))
    ? option.none
    : option.some(unsafeToNumber(i))
}

// function toInt(i: Integer): Option<Int> {
//   return pipe(toNumber(i), option.chain(Int.fromNumber))
// }

// function toInt32(i: Integer): Option<Int32> {
//   return pipe(toNumber(i), option.chain(Int32.fromNumber))
// }

// function toUInt16(i: Integer): option.Option<UInt16> {
//   return pipe(toInt(i), option.chain(UInt16.fromInt))
// }

// function toUInt32(i: Integer): option.Option<UInt32> {
//   return pipe(toInt(i), option.chain(UInt32.fromInt))
// }

/**
 * @since 1.0.0
 */
export function unsafeToNumber(n: Int): number {
  if (
    toBigInt(n).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    toBigInt(n).lesser(Big(Number.MIN_SAFE_INTEGER))
  ) {
    /* istanbul ignore next */
    throw new Error(
      `Integer ${n} cannot be coerced to number because it exceeds Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`
    )
  }
  return unsafeCoerce(toBigInt(n).toJSNumber())
}

/**
 * Arbitrary (from `fast-check`)
 */
export const arbitraryInt: fc.Arbitrary<Int> = fc
  .maxSafeInteger()
  .map((n) => pipe(Int.fromNumber(n), option.toNullable)!)

const utils = {
  abs: abs({ ...ringInt, ...ordInt }),
  of,
  // fromInt,
  fromNumber,
  unsafeFromNumber,
  unsafeToNumber,
  // fromUInt16,
  // fromInt32,
  // fromUInt32,
  isTypeOf,
  // toInt,
  // toInt32,
  // toUInt16,
  // toUInt32,
  toNumber,
  toNumberLossy,
}

/**
 * Provides a namespace holding all exported values, including typeclass
 * instances.
 * s
 * @category Primary Namespace
 * @since 1.0.0
 */
export const Int: typeof classes & typeof utils = {
  ...classes,
  ...utils,
}
