/**
 * @since 1.0.0
 */
import Big, { BigInteger } from 'big-integer'
import { option, ord } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'

import { Enum, instanceEnum } from '../Class/Enum.Internal'
import { HasToInt, instanceHasToInt } from '../Class/HasToInt'
import { HasToRational, instanceHasToRational } from '../Class/HasToRational'
import { instanceIntegral, Integral } from '../Class/Integral'
import { instanceSemiring, Semiring } from '../Class/Semiring'
import { Int } from './Int'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'

declare const NATURAL: unique symbol

/**
 * Arbitrary-precision non-negative integers
 *
 * @since 1.0.0
 */
export interface Natural extends Int {
  /**
   * @internal
   */
  readonly [NATURAL]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit, 0>

/**
 * @since 1.0.0
 */
export type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]

/**
 * @since 1.0.0
 */
export function of(zero: 0): Natural
export function of(...digits: Digits): NonZero<Natural>
export function of(...digits: Digits): Natural | NonZero<Natural> {
  return unsafeFromBigInt(Big(digits.map((j) => j.toString()).join('')))
}

/**
 * Attempts to construct a [[Natural]] from a `number`, computing `none` if
 * not a safe non-negative integer, otherwise `some(n)`.
 *
 * ```ts
 * import { Natural } from 'fp-ts-numerics'
 *
 * Natural.fromNumber(100)
 * // > option.some(Natural.of(1,0,0))
 * Natural.fromNumber(Number.MAX_VALUE)
 * // > option.nothing
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): Option<Natural> {
  return isNaturalNumber(n) ? option.some(unsafeFromBigInt(Big(n))) : option.none
}

/**
 * Unsafely attempts to construct an [[Natural]] from a `number`, throwing an error
 * if not a safe, non-negative integer.
 *
 * ```ts
 * import { Natural } from 'fp-ts-numerics'
 *
 * Natural.unsafeFromNumber(100)
 * // > Natural.of(1,0,0)
 * Natural.unsafeFromNumber(Number.MAX_VALUE)
 * // > uncaught error
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Natural {
  if (!isNaturalNumber(n)) {
    throw new Error(
      `Cannot convert number ${n} to Natural because it is not an integer between 0 and Number.MAX_SAFE_INTEGER.`
    )
  }
  return unsafeFromBigInt(Big(n))
}

function unsafeFromBigInt(n: BigInteger): Natural {
  if (!isTypeOf(n)) {
    throw new Error(`${n} cannot be converted to a Natural because it is not positive.`)
  }
  return unsafeCoerce(n)
}

function fromBigInt(n: BigInteger): Option<Natural> {
  return isTypeOf(n) ? option.some(unsafeCoerce(Big(n))) : option.none
}

/**
 * @since 1.0.0
 */
export function fromInt(i: Int): Option<Natural> {
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

/**
 * @since 1.0.0
 */
export function sub(a: Natural, b: Natural): Natural {
  return unsafeFromBigInt(toBigInt(a).subtract(toBigInt(b)))
}

/**
 * @since 1.0.0
 */
export function degree(i: Natural): Natural {
  return i
}

/**
 * @since 1.0.0
 */
export function div(n: Natural, d: NonZero<Natural>): Natural {
  if (ordNatural.equals(d, semiringNatural.zero)) return semiringNatural.zero
  return unsafeFromBigInt(toBigInt(sub(n, mod(n, d))).divide(toBigInt(d)))
}

function mod(n: Natural, d: Natural): Natural {
  if (ordNatural.equals(d, of(0))) return of(0)
  const a = toBigInt(n)
  const b = toBigInt(d)

  return unsafeFromBigInt(a.mod(b).add(b).mod(b))
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
export const hasToRationalNatural: HasToRational<Natural> = instanceHasToRational({
  ...ordNatural,
  toRational: (a) => Ratio.of(Int)(integralNatural.toInt(a), Int(1)),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntNatural = instanceHasToInt<Natural>({
  toInt: (nat) => unsafeCoerce(nat),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralNatural: Integral<Natural> = instanceIntegral({
  ...hasToIntNatural,
  ...hasToRationalNatural,
  /**
   * truncating integer division (rounds toward zero)
   */
  quot(a: Natural, b: Natural): Natural {
    return unsafeFromBigInt(toBigInt(a).divide(toBigInt(b)))
  },
  /**
   * Remainder of truncating integer division. Always takes the sign of the divisor.
   */
  rem(a: Natural, b: Natural): Natural {
    return unsafeFromBigInt(toBigInt(a).remainder(toBigInt(b)))
  },
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringNatural = instanceSemiring({
  add: (a, b) => unsafeFromBigInt(toBigInt(a).add(toBigInt(b))),
  mul: (a, b) => unsafeFromBigInt(toBigInt(a).multiply(toBigInt(b))),
  one: of(1),
  zero: of(0),
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumInt = instanceEnum({
  // Ord
  ...ordNatural,
  next: (prev) => option.some(Natural.add(prev, Natural.one)),
  prev: (next) =>
    ordNatural.equals(next, Natural.zero) ? option.none : option.some(sub(next, Natural.one)),
})

// ## Functions

function toBigInt(i: Natural): BigInteger {
  return unsafeCoerce(i)
}

function toNumber(i: Natural): Option<number> {
  return toBigInt(i).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    toBigInt(i).lesser(Big(Number.MIN_SAFE_INTEGER))
    ? option.none
    : option.some(toBigInt(i).toJSNumber())
}

function isTypeOf(n: unknown): n is Natural {
  return Big.isInstance(n) && n.greaterOrEquals(0)
}

function isNaturalNumber(n: number): boolean {
  return Number.isInteger(n) && n >= 0 && n <= Number.MAX_SAFE_INTEGER
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
  unsafeFromBigInt,
  fromInt,
  fromNumber,
  unsafeFromNumber,
  isTypeOf,
  of,
  toBigInt,
  sub,
  degree,
  div,
  mod,
  toNumber,
}

/**
 * @since 1.0.0
 */
export const Natural: Enum<Natural> &
  Integral<Natural> &
  HasToInt<Natural> &
  Semiring<Natural> &
  typeof exported = {
  ...enumInt,
  ...integralNatural,
  ...hasToRationalNatural,
  ...semiringNatural,
  ...exported,
}
