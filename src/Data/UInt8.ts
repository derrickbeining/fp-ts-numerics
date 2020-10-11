/**
 * @since 1.0.0
 */
import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { Show } from 'fp-ts/lib/Show'

import { CommutativeRing, instanceCommutativeRing } from '../Class/CommutativeRing'
import { Enum, instanceEnum } from '../Class/Enum'
import { EuclideanRing, instanceEuclideanRing } from '../Class/EuclideanRing'
import { HasPow, instanceHasPow } from '../Class/HasPow'
import { HasToInt, instanceHasToInt } from '../Class/HasToInt'
import { HasToRational, instanceHasToRational } from '../Class/HasToRational'
import { instanceIntegral, Integral } from '../Class/Integral'
import { instanceNumeric, Numeric } from '../Class/Numeric'
import { Rational } from '../Class/Rational'
import { instanceRing, instanceSemiring, Ring, Semiring } from '../Class/Ring'
import { Int } from './Int'
import { Natural } from './Natural'
import { NonNegative } from './NonNegative'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'

declare const U_INT_8: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt8 extends NonNegative<{}> {
  /**
   * @internal
   */
  readonly [U_INT_8]: unique symbol
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
    (str) => fromNumberLossy(+str)
  )
}
/**
 * Attempts to construct a [[UInt8]] from a `number`, computing `none` if
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
 * @since 1.0.0
 */
export function toNumber(i: UInt8): number {
  return unsafeCoerce(i)
}

/**
 * @category Type Guard
 * @since 1.0.0
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

/**
 * @since 1.0.0
 */
export const one: UInt8 = fromNumberLossy(1)
/**
 * @since 1.0.0
 */
export const zero: UInt8 = fromNumberLossy(0)

/**
 * @since 1.0.0
 */
export function add(a: UInt8, b: UInt8): UInt8 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function mul(a: UInt8, b: UInt8): UInt8 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function sub(a: UInt8, b: UInt8): UInt8 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function degree(i: UInt8): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: UInt8, d: NonZero<UInt8>): UInt8 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: UInt8, d: NonZero<UInt8>): UInt8 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: UInt8, b: UInt8): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export function compare(a: UInt8, b: UInt8): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

/**
 * @since 1.0.0
 */
export const bottom = of(0)
/**
 * @since 1.0.0
 */
export const top: UInt8 = unsafeCoerce<number, UInt8>(Math.pow(2, 8) - 1)

/**
 * @since 1.0.0
 */
export function next(a: UInt8): Option<UInt8> {
  return ord.geq(ordUInt8)(a, boundedUInt8.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: UInt8): Option<UInt8> {
  return ord.leq(ordUInt8)(a, boundedUInt8.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: UInt8): Rational {
  return Ratio.of(Int)(integralUInt8.toInt(a), Int(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: UInt8, b: NonZero<UInt8>): UInt8 {
  const q = toNumber(a) / toNumber(b)
  return q < 0
    ? fromNumberLossy(Math.ceil(q))
    : q > 0
    ? fromNumberLossy(Math.floor(q))
    : fromNumberLossy(q)
}

/**
 * @since 1.0.0
 */
export function rem(a: UInt8, b: NonZero<UInt8>): UInt8 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function toInteger(a: UInt8): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<UInt8> {
  return pipe(Int.toNumber(int), option.map(fromNumberLossy))
}

/**
 * @since 1.0.0
 */
export function negate(a: UInt8): UInt8 {
  return a
}

/**
 * @since 1.0.0
 */
export function pow(n: UInt8, exp: UInt8): UInt8 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
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
export const hasToRationalUInt8: HasToRational<UInt8> = instanceHasToRational<UInt8>({
  ...ordUInt8,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntUInt8 = instanceHasToInt<UInt8>({
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralUInt8 = instanceIntegral<UInt8>({
  ...hasToIntUInt8,
  ...hasToRationalUInt8,
  quot,
  rem,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericUInt8: Numeric<UInt8> = instanceNumeric({
  fromNumber,
  toNumber,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringUInt8: Semiring<UInt8> = instanceSemiring({
  add,
  mul,
  one,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringUInt8: Ring<UInt8> = instanceRing<UInt8>({
  ...semiringUInt8,
  sub,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingUInt8 = instanceCommutativeRing({
  ...ringUInt8,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingUInt8: EuclideanRing<UInt8> = instanceEuclideanRing({
  ...commutativeRingUInt8,
  degree,
  div,
  mod,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const showUInt8: Show<UInt8> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasPowUInt8 = instanceHasPow({ pow })

const exported = {
  add,
  bottom,
  compare,
  div,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  of,
  one,
  pow,
  prev,
  quot,
  rem,
  sub,
  toInt,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}

/**
 * @since 1.0.0
 */
export const UInt8: Bounded<UInt8> &
  CommutativeRing<UInt8> &
  Enum<UInt8> &
  Eq<UInt8> &
  EuclideanRing<UInt8> &
  HasPow<UInt8> &
  HasToInt<UInt8> &
  HasToRational<UInt8> &
  Integral<UInt8> &
  Numeric<UInt8> &
  Ord<UInt8> &
  Ring<UInt8> &
  Semiring<UInt8> &
  Show<UInt8> &
  typeof exported = {
  ...boundedUInt8,
  ...commutativeRingUInt8,
  ...enumUInt8,
  ...euclideanRingUInt8,
  ...hasPowUInt8,
  ...integralUInt8,
  ...numericUInt8,
  ...ordUInt8,
  ...hasToRationalUInt8,
  ...ringUInt8,
  ...semiringUInt8,
  ...showUInt8,
  ...exported,
}
