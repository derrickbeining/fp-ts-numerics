import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { Show } from 'fp-ts/lib/Show'

import { Enum, instanceEnum } from './Enum'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceReal, Real } from './Real'

declare const u_int_8: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt8 {
  /**
   * @internal
   */
  readonly [u_int_8]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[UInt8]]
 *
 * @since 1.0.0
 */
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [1, Digit, Digit]
  | [2, 0 | 1 | 2 | 3 | 4, Digit]
  | [2, 5, 0 | 1 | 2 | 3 | 4 | 5]

/**
 * Constructs a UInt8 from [[Digits]]
 *
 * @category Constructor
 * @since 1.0.0
 */
export function of(zero: 0): UInt8
export function of(...digits: Digits): NonZero<UInt8>
export function of(...digits: Digits): UInt8 | NonZero<UInt8> {
  return pipe(
    digits
      .filter((x): x is Digits[number] => Number.isInteger(x))
      .map((j) => j.toString())
      .join(''),
    (str) => unsafeCoerce(+str & 255)
  )
}
/**
 * Attempts to construct a [[UInt8]] from a `number`, computing `nothing` if
 * the number is not an integer in the bounds of UInt8, otherwise `some(n)`.
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<UInt8> {
  return isTypeOf(n) ? option.some(unsafeCoerce(n & 255)) : option.none
}
/**
 * Attempts to construct a [[UInt8]] from a `number`, throwing a RangeError if
 * the number is not an integer in the bounds of UInt8.
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): UInt8 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to UInt8 since it is not an integer within the bounds of ${boundedUInt8.bottom} and ${boundedUInt8.top}`
    )
  }
  return unsafeCoerce(n)
}
/**
 * Constructs a [[UInt8]] from a `number`, wrapping the value if it overflows
 * the range of [[UInt8]].
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): UInt8 {
  return unsafeCoerce(n & 255)
}

/**
 * @category Transformation
 */
export function toNumber(i: UInt8): number {
  return unsafeCoerce(i)
}

/**
 * @category Type Guard
 */
export function isTypeOf(x: unknown): x is UInt8 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedUInt8.top) &&
    x >= toNumber(boundedUInt8.bottom)
  )
}
// ## Math Operations

export const one: UInt8 = fromNumberLossy(1)
export const zero: UInt8 = fromNumberLossy(0)

export function add(a: UInt8, b: UInt8): UInt8 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

export function mul(a: UInt8, b: UInt8): UInt8 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

export function sub(a: UInt8, b: UInt8): UInt8 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

export function div(n: UInt8, d: NonZero<UInt8>): UInt8 {
  const _n = toNumber(n)
  const _d = toNumber(d)
  return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
}

export function mod(n: UInt8, d: NonZero<UInt8>): UInt8 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

export function equals(a: UInt8, b: UInt8): boolean {
  return a === b
}

export function compare(a: UInt8, b: UInt8): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

export const bottom = of(0)
export const top: UInt8 = unsafeCoerce<number, UInt8>(Math.pow(2, 8) - 1)

export function next(a: UInt8): Option<UInt8> {
  return ord.geq(ordUInt8)(a, boundedUInt8.top) ? option.none : option.some(add(a, one))
}

export function prev(a: UInt8): Option<UInt8> {
  return ord.leq(ordUInt8)(a, boundedUInt8.bottom) ? option.none : option.some(sub(a, one))
}

export function toRational(a: UInt8): Rational {
  return Ratio.of(Int)(integralUInt8.toInteger(a), Int.of(1))
}

export function quot(a: UInt8, b: NonZero<UInt8>): UInt8 {
  const q = toNumber(a) / toNumber(b)
  return q < 0
    ? fromNumberLossy(Math.ceil(q))
    : q > 0
    ? fromNumberLossy(Math.floor(q))
    : fromNumberLossy(q)
}

export function rem(a: UInt8, b: NonZero<UInt8>): UInt8 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

export function toInteger(a: UInt8): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

export function abs(a: UInt8): UInt8 {
  return fromNumberLossy(Math.abs(toNumber(a)))
}

export function fromInt(int: Int): Option<UInt8> {
  return pipe(Int.toNumber(int), option.map(fromNumberLossy))
}

export function negate(a: UInt8): UInt8 {
  return a
}

export function pow(n: UInt8, exp: UInt8): UInt8 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

export function signum(_a: UInt8): UInt8 {
  return one
}

export function toInt(a: UInt8): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const eqUInt8: Eq<UInt8> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordUInt8: Ord<UInt8> = {
  ...eqUInt8,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const boundedUInt8: Bounded<UInt8> = {
  ...ordUInt8,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumUInt8 = instanceEnum<UInt8>({
  ...ordUInt8,
  next,
  prev,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const realUInt8: Real<UInt8> = instanceReal<UInt8>({
  ...ordUInt8,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralUInt8 = instanceIntegral<UInt8>({
  ...realUInt8,
  quot,
  rem,
  toInteger,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericUInt8: Numeric<UInt8> = instanceNumeric({
  ...integralUInt8,
  ...ordUInt8,
  abs,
  add,
  div,
  fromInt,
  fromNumber,
  mod,
  mul,
  negate,
  one,
  pow,
  signum,
  sub,
  toInt,
  toNumber,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const showUInt8: Show<UInt8> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

const exported = {
  abs,
  add,
  bottom,
  boundedUInt8,
  compare,
  div,
  enumUInt8,
  eqUInt8,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  integralUInt8,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  numericUInt8,
  of,
  one,
  ordUInt8,
  pow,
  prev,
  quot,
  realUInt8,
  rem,
  showUInt8,
  signum,
  sub,
  toInt,
  toInteger,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}

export const UInt8: Bounded<UInt8> &
  Enum<UInt8> &
  Integral<UInt8> &
  Numeric<UInt8> &
  Show<UInt8> &
  typeof exported = {
  ...boundedUInt8,
  ...enumUInt8,
  ...integralUInt8,
  ...numericUInt8,
  ...ordUInt8,
  ...realUInt8,
  ...showUInt8,
  ...exported,
}
