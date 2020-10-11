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

declare const U_INT_32: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt32 extends NonNegative<{}> {
  /**
   * @internal
   */
  readonly [U_INT_32]: unique symbol
}
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[UInt32]]
 *
 * @since 1.0.0
 */
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 0 | 1, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, Exclude<Digit, 9>, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 4, Exclude<Digit, 9>, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 4, 9, 0 | 1 | 2 | 3 | 4 | 5, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 4, 9, 6, Exclude<Digit, 7 | 8 | 9>, Digit, Digit, Digit]
  | [4, 2, 9, 4, 9, 6, 7, 0 | 1, Digit, Digit]
  | [4, 2, 9, 4, 9, 6, 7, 2, Exclude<Digit, 9>, Digit]
  | [4, 2, 9, 4, 9, 6, 7, 2, 9, Exclude<Digit, 6 | 7 | 8 | 9>]

/**
 * Constructs a UInt32 from [[Digits]]
 *
 * @category Constructor
 * @since 1.0.0
 */
export function of(zero: 0): UInt32
export function of(...digits: Digits): NonZero<UInt32>
export function of(...digits: Digits): UInt32 | NonZero<UInt32> {
  const ds: Array<Digit> = digits
  return pipe(ds.map((j) => j.toString()).join(''), (str) => fromNumberLossy(+str))
}

/**
 * Attempts to construct a [[UInt32]] from a `number`, computing `none` if
 * the number is not an integer in the bounds of UInt32, otherwise `some(n)`.
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<UInt32> {
  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * Attempts to construct a [[UInt32]] from a `number`, throwing a RangeError if
 * the number is not an integer in the bounds of UInt32.
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): UInt32 {
  if (!isTypeOf(n)) {
    throw new RangeError(
      `${n} cannot be coerced to UInt32 since it is not an integer within the bounds of ${boundedUInt32.bottom} and ${boundedUInt32.top}`
    )
  }
  return unsafeCoerce(n)
}

/**
 * Constructs a [[UInt32]] from a `number`, wrapping the value if it overflows
 * the range of [[UInt32]].
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): UInt32 {
  return unsafeCoerce(n >>> 0)
}

// ### Transformations

/**
 * @since 1.0.0
 */
export function toNumber(i: UInt32): number {
  return unsafeCoerce(i)
}

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is UInt32 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedUInt32.top) &&
    x >= toNumber(boundedUInt32.bottom)
  )
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: UInt32 = of(1)
/**
 * @since 1.0.0
 */
export const zero: UInt32 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: UInt32, b: UInt32): UInt32 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function mul(a: UInt32, b: UInt32): UInt32 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function sub(a: UInt32, b: UInt32): UInt32 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function degree(i: UInt32): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: UInt32, d: NonZero<UInt32>): UInt32 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: UInt32, d: NonZero<UInt32>): UInt32 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: UInt32, b: UInt32): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export function compare(a: UInt32, b: UInt32): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

/**
 * @since 1.0.0
 */
export const bottom = of(0)
/**
 * @since 1.0.0
 */
export const top: UInt32 = unsafeCoerce<number, UInt32>((Math.pow(2, 32) - 1) >>> 0)

/**
 * @since 1.0.0
 */
export function next(a: UInt32): Option<UInt32> {
  return ord.geq(ordUInt32)(a, boundedUInt32.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: UInt32): Option<UInt32> {
  return ord.leq(ordUInt32)(a, boundedUInt32.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: UInt32): Rational {
  return Ratio.of(Int)(integralUInt32.toInt(a), Int(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: UInt32, b: NonZero<UInt32>): UInt32 {
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
export function rem(a: UInt32, b: NonZero<UInt32>): UInt32 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function toInteger(a: UInt32): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<UInt32> {
  return pipe(Int.toNumber(int), option.map(fromNumberLossy))
}

/**
 * @since 1.0.0
 */
export function negate(a: UInt32): UInt32 {
  return a
}

/**
 * @since 1.0.0
 */
export function pow(n: UInt32, exp: UInt32): UInt32 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: UInt32): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const eqUInt32: Eq<UInt32> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const ordUInt32: Ord<UInt32> = {
  ...eqUInt32,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const boundedUInt32: Bounded<UInt32> = {
  ...ordUInt32,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const enumUInt32 = instanceEnum<UInt32>({
  ...ordUInt32,
  next,
  prev,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const hasToRationalUInt32: HasToRational<UInt32> = instanceHasToRational<UInt32>({
  ...ordUInt32,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntUInt32 = instanceHasToInt<UInt32>({
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const integralUInt32 = instanceIntegral<UInt32>({
  ...hasToIntUInt32,
  ...hasToRationalUInt32,
  quot,
  rem,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const numericUInt32: Numeric<UInt32> = instanceNumeric({
  fromNumber,
  toNumber,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringUInt32: Semiring<UInt32> = instanceSemiring({
  add,
  mul,
  one,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringUInt32: Ring<UInt32> = instanceRing<UInt32>({
  ...semiringUInt32,
  sub,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingUInt32 = instanceCommutativeRing({
  ...ringUInt32,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingUInt32: EuclideanRing<UInt32> = instanceEuclideanRing({
  ...commutativeRingUInt32,
  degree,
  div,
  mod,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const showUInt32: Show<UInt32> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasPowUint32 = instanceHasPow({ pow })

const exported = {
  add,
  bottom,
  boundedUInt32,
  compare,
  div,
  enumUInt32,
  eqUInt32,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  integralUInt32,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  numericUInt32,
  of,
  one,
  ordUInt32,
  pow,
  prev,
  quot,
  hasToRationalUInt32,
  rem,
  showUInt32,
  sub,
  toInt,
  toInteger,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}

/**
 * @since 1.0.0
 */
export const UInt32: Bounded<UInt32> &
  CommutativeRing<UInt32> &
  Enum<UInt32> &
  Eq<UInt32> &
  EuclideanRing<UInt32> &
  HasPow<UInt32> &
  HasToInt<UInt32> &
  HasToRational<UInt32> &
  Integral<UInt32> &
  Numeric<UInt32> &
  Ord<UInt32> &
  Ring<UInt32> &
  Semiring<UInt32> &
  Show<UInt32> &
  typeof exported = {
  ...boundedUInt32,
  ...commutativeRingUInt32,
  ...enumUInt32,
  ...euclideanRingUInt32,
  ...hasPowUint32,
  ...integralUInt32,
  ...numericUInt32,
  ...ordUInt32,
  ...hasToRationalUInt32,
  ...ringUInt32,
  ...semiringUInt32,
  ...showUInt32,
  ...exported,
}
