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

declare const u_int_16: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt16 {
  /**
   * @internal
   */
  readonly [u_int_16]: unique symbol
}
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[UInt16]]
 *
 * @since 1.0.0
 */
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [0 | 1 | 2 | 3 | 4 | 5, Digit, Digit, Digit, Digit]
  | [6, 0 | 1 | 2 | 3 | 4, Digit, Digit, Digit]
  | [6, 5, 0 | 1 | 2 | 3 | 4, Digit, Digit]
  | [6, 5, 5, 0 | 1 | 2, Digit]
  | [6, 5, 5, 3, 0 | 1 | 2 | 3 | 4 | 5]

/**
 * Constructs a UInt16 from [[Digits]]
 *
 * @category Constructor
 * @since 1.0.0
 */
export function of(zero: 0): UInt16
export function of(...digits: Digits): NonZero<UInt16>
export function of(...digits: Digits): UInt16 | NonZero<UInt16> {
  return pipe(
    digits
      .filter((x): x is Digits[number] => Number.isInteger(x))
      .map((j) => j.toString())
      .join(''),
    (str) => unsafeCoerce(+str & 65535)
  )
}
/**
 * Attempts to construct a [[UInt16]] from a `number`, computing `nothing` if
 * the number is not an integer in the bounds of UInt16, otherwise `some(n)`.
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<UInt16> {
  return isTypeOf(n) ? option.some(n) : option.none
}
/**
 * Attempts to construct a [[UInt16]] from a `number`, throwing a RangeError if
 * the number is not an integer in the bounds of UInt16.
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): UInt16 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to UInt16 since it is not an integer within the bounds of ${boundedUInt16.bottom} and ${boundedUInt16.top}`
    )
  }
  return unsafeCoerce(n)
}
/**
 * Constructs a [[UInt16]] from a `number`, wrapping the value if it overflows
 * the range of [[UInt16]].
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): UInt16 {
  return unsafeCoerce(n & 65535)
}

// ### Transformations

export function toNumber(i: UInt16): number {
  return unsafeCoerce(i)
}

export function isTypeOf(x: unknown): x is UInt16 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedUInt16.top) &&
    x >= toNumber(boundedUInt16.bottom)
  )
}
// ## Math Operations

export const one: UInt16 = of(1)
export const zero: UInt16 = of(0)

export function add(a: UInt16, b: UInt16): UInt16 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

export function mul(a: UInt16, b: UInt16): UInt16 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

export function sub(a: UInt16, b: UInt16): UInt16 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

export function div(n: UInt16, d: NonZero<UInt16>): UInt16 {
  const _n = toNumber(n)
  const _d = toNumber(d)
  return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
}

export function mod(n: UInt16, d: NonZero<UInt16>): UInt16 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

export function equals(a: UInt16, b: UInt16): boolean {
  return a === b
}

export function compare(a: UInt16, b: UInt16): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

export const bottom = of(0)
export const top: UInt16 = unsafeCoerce<number, UInt16>((Math.pow(2, 16) - 1) & 65535)

export function next(a: UInt16): Option<UInt16> {
  return ord.geq(ordUInt16)(a, boundedUInt16.top) ? option.none : option.some(add(a, one))
}

export function prev(a: UInt16): Option<UInt16> {
  return ord.leq(ordUInt16)(a, boundedUInt16.bottom) ? option.none : option.some(sub(a, one))
}

export function toRational(a: UInt16): Rational {
  return Ratio.of(Int)(integralUInt16.toInteger(a), Int.of(1))
}

export function quot(a: UInt16, b: NonZero<UInt16>): UInt16 {
  const q = toNumber(a) / toNumber(b)
  return q < 0
    ? fromNumberLossy(Math.ceil(q))
    : q > 0
    ? fromNumberLossy(Math.floor(q))
    : fromNumberLossy(q)
}

export function rem(a: UInt16, b: NonZero<UInt16>): UInt16 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

export function toInteger(a: UInt16): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

export function abs(a: UInt16): UInt16 {
  return fromNumberLossy(Math.abs(toNumber(a)))
}

export function fromInt(int: Int): Option<UInt16> {
  return pipe(Int.toNumber(int), option.map(fromNumberLossy))
}

export function negate(a: UInt16): UInt16 {
  return a
}

export function pow(n: UInt16, exp: UInt16): UInt16 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

export function signum(_a: UInt16): UInt16 {
  return one
}

export function toInt(a: UInt16): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const eqUInt16: Eq<UInt16> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const ordUInt16: Ord<UInt16> = {
  ...eqUInt16,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const boundedUInt16: Bounded<UInt16> = {
  ...ordUInt16,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const enumUInt16 = instanceEnum<UInt16>({
  ...ordUInt16,
  next,
  prev,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const realUInt16: Real<UInt16> = instanceReal<UInt16>({
  ...ordUInt16,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const integralUInt16 = instanceIntegral<UInt16>({
  ...realUInt16,
  quot,
  rem,
  toInteger,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const numericUInt16: Numeric<UInt16> = instanceNumeric({
  ...integralUInt16,
  ...ordUInt16,
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
const showUInt16: Show<UInt16> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

const exported = {
  abs,
  add,
  bottom,
  boundedUInt16,
  compare,
  div,
  enumUInt16,
  eqUInt16,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  integralUInt16,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  numericUInt16,
  of,
  one,
  ordUInt16,
  pow,
  prev,
  quot,
  realUInt16,
  rem,
  showUInt16,
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

export const UInt16: Bounded<UInt16> &
  Enum<UInt16> &
  Integral<UInt16> &
  Numeric<UInt16> &
  Show<UInt16> &
  typeof exported = {
  ...boundedUInt16,
  ...enumUInt16,
  ...integralUInt16,
  ...numericUInt16,
  ...ordUInt16,
  ...realUInt16,
  ...showUInt16,
  ...exported,
}
