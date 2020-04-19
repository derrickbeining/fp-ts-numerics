import Big, { BigInteger } from 'big-integer'
import { option, ord } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import * as Enum from './Enum.Internal'
import { instanceEuclideanRing } from './EuclideanRing'
import { EuclideanRing } from './EuclideanRing'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'
import { instanceReal, Real } from './Real'
import { instanceRing } from './Ring'
import { abs } from './Ring'
import { instanceSemiring } from './Semiring'

declare const NATURAL: unique symbol

/**
 * Arbitrary-precision non-negative integers
 */
export interface Natural {
  /**
   * @internal
   */
  readonly [NATURAL]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit, 0>

export type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]

export function of(zero: 0): Natural
export function of(...digits: Digits): NonZero<Natural>
export function of(...digits: Digits): Natural | NonZero<Natural> {
  return fromBigInt(Big(digits.map((j) => j.toString()).join('')))
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordNatural = ord.fromCompare<Natural>((a, b) => {
  const _a = toBigInt(a)
  const _b = toBigInt(b)
  return _a.greater(_b) ? 1 : _a.lesser(_b) ? -1 : 0
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const realNatural: Real<Natural> = instanceReal({
  ...ordNatural,
  toRational: (a) => Ratio.of(Int)(integralNatural.toInteger(a), Int.of(1)),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralNatural: Integral<Natural> = instanceIntegral({
  ...realNatural,
  toInteger: unsafeCoerce,
  /**
   * truncating integer division (rounds toward zero)
   */
  quot(a: Natural, b: Natural): Natural {
    return fromBigInt(toBigInt(a).divide(toBigInt(b)))
  },
  /**
   * Remainder of truncating integer division. Always takes the sign of the divisor.
   */
  rem(a: Natural, b: Natural): Natural {
    return fromBigInt(toBigInt(a).remainder(toBigInt(b)))
  },
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringNatural = instanceSemiring({
  add: (a, b) => fromBigInt(toBigInt(a).add(toBigInt(b))),
  mul: (a, b) => fromBigInt(toBigInt(a).multiply(toBigInt(b))),
  one: of(1),
  zero: of(0),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringNatural = instanceRing<Natural>({
  ...semiringNatural,
  sub: (a, b) => fromBigInt(toBigInt(a).subtract(toBigInt(b))),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingNatural = instanceCommutativeRing({
  ...ringNatural,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingNatural = instanceEuclideanRing({
  ...commutativeRingNatural,

  degree: (i) => i,
  div: (n: Natural, d: NonZero<Natural>): Natural => {
    if (ordNatural.equals(d, semiringNatural.zero)) return semiringNatural.zero
    return fromBigInt(
      toBigInt(ringNatural.sub(n, euclideanRingNatural.mod(n, d))).divide(toBigInt(d))
    )
  },
  mod: (n, d) => {
    if (ordNatural.equals(d, of(0))) return of(0)
    const a = toBigInt(n)
    const b = toBigInt(abs(Natural)(d))

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
  ...ordNatural,
  next: (prev) => option.some(Natural.add(prev, Natural.one)),
  prev: (next) =>
    ordNatural.equals(next, Natural.zero)
      ? option.none
      : option.some(Natural.sub(next, Natural.one)),
})

// ## Functions

function fromBigInt(n: BigInteger): Natural {
  return unsafeCoerce(n)
}

function fromNumber(n: number): Option<Natural> {
  return isTypeOf(n) ? option.some(fromBigInt(Big(n))) : option.none
}

function fromInt(i: Int): Option<Natural> {
  return ord.lt(Int)(i, Int.zero) ? option.none : option.some(unsafeCoerce(i))
}

// function fromInt(i: Int): Natural {
//   return fromBigInt(bigint(unsafeCoerce(i)))
// }

// function fromInt32(i: Int32): Natural {
//   return fromBigInt(bigint(Int32.toNumber(i)))
// }

// function fromUInt16(i: UInt16): Natural {
//   return fromBigInt(bigint(UInt16.toNumber(i)))
// }

// function fromUInt32(i: UInt32): Natural {
//   return fromBigInt(bigint(UInt32.toNumber(i)))
// }

function isTypeOf(n: unknown): n is Natural {
  return typeof n === 'number' && Number.isInteger(n) && n >= 0
}

function toBigInt(i: Natural): BigInteger {
  return unsafeCoerce(i)
}

function toNumber(i: Natural): Option<number> {
  return toBigInt(i).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    toBigInt(i).lesser(Big(Number.MIN_SAFE_INTEGER))
    ? option.none
    : option.some(toBigInt(i).toJSNumber())
}

// function toInt(i: Natural): Option<Int> {
//   return pipe(toNumber(i), option.chain(Int.fromNumber))
// }

// function toInt32(i: Natural): Option<Int32> {
//   return pipe(toNumber(i), option.chain(Int32.fromNumber))
// }

// function toUInt16(i: Natural): option.Option<UInt16> {
//   return pipe(toInt(i), option.chain(UInt16.fromInt))
// }

// function toUInt32(i: Natural): option.Option<UInt32> {
//   return pipe(toInt(i), option.chain(UInt32.fromInt))
// }

const exported = {
  fromBigInt,
  fromInt,
  // fromInt,
  fromNumber,
  // fromUInt16,
  // fromInt32,
  // fromUInt32,
  isTypeOf,
  of,
  toBigInt,
  // toInt,
  // toInt32,
  toNumber,
  // toUInt16,
  // toUInt32,
}

export const Natural: Enum.Enum<Natural> &
  CommutativeRing<Natural> &
  EuclideanRing<Natural> &
  Integral<Natural> &
  typeof exported = {
  ...enumInt,
  ...euclideanRingNatural,
  ...integralNatural,
  ...realNatural,
  ...exported,
}
