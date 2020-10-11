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

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import { Enum, instanceEnum } from './Enum'
import { EuclideanRing, instanceEuclideanRing } from './EuclideanRing'
import { HasPow, instanceHasPow } from './HasPow'
import { HasToInt, instanceHasToInt } from './HasToInt'
import { HasToRational, instanceHasToRational } from './HasToRational'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { Natural } from './Natural'
import { NonNegative } from './NonNegative'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceRing, instanceSemiring, Ring, Semiring } from './Ring'

declare const U_INT_16: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt16 extends NonNegative<{}> {
  /**
   * @internal
   */
  readonly [U_INT_16]: unique symbol
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
    (str) => fromNumberLossy(+str)
  )
}
/**
 * Attempts to construct a [[UInt16]] from a `number`, computing `none` if
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

/**
 * @since 1.0.0
 */
export function toNumber(i: UInt16): number {
  return unsafeCoerce(i)
}

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is UInt16 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedUInt16.top) &&
    x >= toNumber(boundedUInt16.bottom)
  )
}
// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: UInt16 = of(1)
/**
 * @since 1.0.0
 */
export const zero: UInt16 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: UInt16, b: UInt16): UInt16 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function mul(a: UInt16, b: UInt16): UInt16 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function sub(a: UInt16, b: UInt16): UInt16 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function degree(i: UInt16): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: UInt16, d: NonZero<UInt16>): UInt16 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: UInt16, d: NonZero<UInt16>): UInt16 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: UInt16, b: UInt16): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export function compare(a: UInt16, b: UInt16): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

/**
 * @since 1.0.0
 */
export const bottom = of(0)
/**
 * @since 1.0.0
 */
export const top: UInt16 = unsafeCoerce<number, UInt16>((Math.pow(2, 16) - 1) & 65535)

/**
 * @since 1.0.0
 */
export function next(a: UInt16): Option<UInt16> {
  return ord.geq(ordUInt16)(a, boundedUInt16.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: UInt16): Option<UInt16> {
  return ord.leq(ordUInt16)(a, boundedUInt16.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: UInt16): Rational {
  return Ratio.of(Int)(integralUInt16.toInt(a), Int(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: UInt16, b: NonZero<UInt16>): UInt16 {
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
export function rem(a: UInt16, b: NonZero<UInt16>): UInt16 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<UInt16> {
  return pipe(Int.toNumber(int), option.map(fromNumberLossy))
}

/**
 * @since 1.0.0
 */
export function negate(a: UInt16): UInt16 {
  return a
}

/**
 * @since 1.0.0
 */
export function pow(n: UInt16, exp: UInt16): UInt16 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
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
const hasToRationalUInt16: HasToRational<UInt16> = instanceHasToRational<UInt16>({
  ...ordUInt16,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntUInt16 = instanceHasToInt<UInt16>({
  toInt,
})
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const integralUInt16 = instanceIntegral<UInt16>({
  ...hasToIntUInt16,
  ...hasToRationalUInt16,
  quot,
  rem,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const numericUInt16: Numeric<UInt16> = instanceNumeric({
  fromNumber,
  toNumber,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringUInt16: Semiring<UInt16> = instanceSemiring({
  add,
  mul,
  one,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringUInt16: Ring<UInt16> = instanceRing<UInt16>({
  ...semiringUInt16,
  sub,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingUInt16 = instanceCommutativeRing({
  ...ringUInt16,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingUInt16: EuclideanRing<UInt16> = instanceEuclideanRing({
  ...commutativeRingUInt16,
  degree,
  div,
  mod,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const showUInt16: Show<UInt16> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasPowUInt16 = instanceHasPow({ pow })

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
export const UInt16: Bounded<UInt16> &
  CommutativeRing<UInt16> &
  Enum<UInt16> &
  Eq<UInt16> &
  EuclideanRing<UInt16> &
  HasPow<UInt16> &
  HasToInt<UInt16> &
  HasToRational<UInt16> &
  Integral<UInt16> &
  Numeric<UInt16> &
  Ord<UInt16> &
  Ring<UInt16> &
  Semiring<UInt16> &
  Show<UInt16> &
  typeof exported = {
  ...boundedUInt16,
  ...commutativeRingUInt16,
  ...enumUInt16,
  ...euclideanRingUInt16,
  ...hasPowUInt16,
  ...integralUInt16,
  ...numericUInt16,
  ...ordUInt16,
  ...hasToRationalUInt16,
  ...ringUInt16,
  ...semiringUInt16,
  ...showUInt16,
  ...exported,
}
