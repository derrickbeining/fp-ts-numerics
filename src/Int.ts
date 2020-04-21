/**
 * Arbitrary precision integers.
 *
 * Internally, `Int` uses native `BigInt` if globally available, otherwise
 * falls back to custom implementation.
 *
 * Like all numeric data types in `fp-ts-numerics`, this module exposes the
 * `Int` type and namespace as a single declaration. It is intended to be
 * consumed like so:
 *
 * ```ts
 * import { Int } from 'fp-ts-numerics'
 *
 * function isEven(n: Int): boolean {
 *   return Int.equals(Int.zero, Int.mod(n, Int.of(2)))
 * }
 * ```
 *
 * @packageDocumentation
 * @since 1.0.0
 */

// don't remove this empty line ^^^  or module doc gets removed
import Big, { BigInteger } from 'big-integer'
import { option, ord } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import { Enum, instanceEnum } from './Enum.Internal'
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
 *
 * Arbitrary precision integer type
 *
 * ## Usage
 * ```ts
 * import { Int } from 'fp-ts-numerics'
 *
 * const foo: Int = Int.of(1,2,3,4,5)
 * ```
 *
 * @category Data Type
 * @since 1.0.0
 */
export interface Int {
  /**
   * @internal
   */
  readonly [INT]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9 | Exclude<Digit, 0>

/**
 * A tuple representing the digits of an [[Int]]
 *
 * @since 1.0.0
 */
export type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]

/** @internal */
function fromBigInt(n: BigInteger): Int {
  return unsafeCoerce(n)
}

/** @internal */
function toBigInt(i: Int): BigInteger {
  return unsafeCoerce(i)
}

/**
 *
 * Constructs a signed, arbitrary precision integer from a
 * tuple of digits.
 *
 * ```ts
 * Int.of(9,2,2,3,3,7,2,0,3,6,8,5,4,7,7,6,0,0,0)
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function of(zero: 0): Int
export function of(...digits: Digits): NonZero<Int>
export function of(...digits: Digits): Int | NonZero<Int> {
  return fromBigInt(Big(digits.map((j) => j.toString()).join(''), 10))
}

/**
 *
 * Attempts to construct an [[Int]] from a `number`, returning `nothing` if
 * not an safe integer, otherwise `some(n)`.
 *
 * ```ts
 * Int.fromNumber(100)
 * // > some(100)
 * Int.fromNumber(Number.MAX_VALUE)
 * // > nothing
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): Option<Int> {
  if (Number.isInteger(n)) return option.some(unsafeCoerce(Big(n)))
  return option.none
}

/**
 * Unsafely attempts to construct an [[Int]] from a `number`, throwing an error
 * if not a safe integer.
 *
 * ```ts
 * Int.unsafeFromNumber(100)
 * // > 100
 * Int.unsafeFromNumber(Number.MAX_VALUE)
 * // > uncaught error
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Int {
  if (!Number.isSafeInteger(n)) {
    throw new Error(
      `Cannot coerce number ${n} to Int because it is not an integer between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`
    )
  }
  return fromBigInt(Big(n))
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
    return fromBigInt(a.mod(b).add(b).mod(b))
  },
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumInt = instanceEnum({
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

// ## Transformations

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

/**
 * A type guard to test if a value is an [[Int]]
 *
 * @category Type Guard
 * @since 1.0.0
 */
export function isTypeOf(n: unknown): n is Int {
  return Big.isInstance(n)
}

/**
 * Attempts to convert an [[Int]] to a `number`, computing `nothing` if outside
 * JavaScript's safe integer range, else `some(number)`.
 *
 * ```ts
 * import { option } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * expect(Int.toNumber(Int.of(1))).toBe(option.some(1))
 * ```
 *
 * @category Transformation
 * @since 1.0.0
 */
export function toNumber(i: Int): Option<number> {
  return toBigInt(i).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    toBigInt(i).lesser(Big(Number.MIN_SAFE_INTEGER))
    ? option.none
    : option.some(unsafeToNumber(i))
}

/**
 * Converts an [[Int]] to a `number` but loses precision if it's outside
 * JavaScript's safe integer range.
 *
 * ```ts
 * import { option } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * expect(Int.toNumberLossy(Int.of(1))).toBe(1)
 * ```
 *
 * @category Transformation
 * @since 1.0.0
 */
export function toNumberLossy(i: Int): number {
  return toBigInt(i).toJSNumber()
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
 * Unsafely converts an [[Int]] to a `number` throwing an error if it's outside
 * JavaScript's safe integer range.
 *
 * ```ts
 * import { option } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * expect(Int.unsafeToNumber(Int.of(1))).toBe(1)
 * expect(() => Int.unsafeToNumber(Int.of(...MAX_SAFE_INTEGER))).toBe(1)
 * ```
 *
 * @category Transformation
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
 * The `Int` type and namespace.
 *
 * This is generally the only identifier you'll need to import to work with
 * `Int`s. It holds all typeclass instances as well as all other exports of the
 * `Int` module.
 *
 * ```ts
 * import { ord } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * const is0LT10: boolean = ord.lt(Int)(Int.zero, Int.of(1,0))
 * const twoDivThree: Int = Int.div(Int.of(2), Int.of(3))
 * const zeroTo9000: Array<Int> = Enum.fromTo(Int)(Int.zero, Int.of(9,0,0,0))
 * ```
 * @category Namespace
 * @since 1.0.0
 */
export const Int: Enum<Int> &
  CommutativeRing<Int> &
  EuclideanRing<Int> &
  Integral<Int> &
  typeof utils = {
  ...enumInt,
  ...euclideanRingInt,
  ...integralInt,
  ...realInt,
  ...utils,
}
