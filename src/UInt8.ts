/**
 * @since 1.0.0
 */
import { eq, option, ord, show } from 'fp-ts'
import * as bounded from 'fp-ts/lib/Bounded'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import * as commutativeRing from './CommutativeRing'
import * as enum_ from './Enum'
import * as euclideanRing from './EuclideanRing'
import * as hasPow from './HasPow'
import * as hasToInt from './HasToInt'
import * as hasToRational from './HasToRational'
import { Int } from './Int'
import * as integral from './Integral'
import { Branded } from './Internal/Branded'
import { Natural } from './Natural'
import { NonNegative } from './NonNegative'
import { NonZero } from './NonZero'
import * as numeric from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import * as ring from './Ring'
import * as semiring from './Semiring'
import { UInt16 } from './UInt16'

type Bounded<T> = bounded.Bounded<T>
type CommutativeRing<T> = commutativeRing.CommutativeRing<T>
type Enum<T> = enum_.Enum<T>
type Eq<T> = eq.Eq<T>
type EuclideanRing<T> = euclideanRing.EuclideanRing<T>
type HasPow<T> = hasPow.HasPow<T>
type HasToInt<T> = hasToInt.HasToInt<T>
type HasToRational<T> = hasToRational.HasToRational<T>
type Integral<T> = integral.Integral<T>
type Numeric<T> = numeric.Numeric<T>
type Ord<T> = ord.Ord<T>
type Ring<T> = ring.Ring<T>
type Semiring<T> = semiring.Semiring<T>
type Show<T> = show.Show<T>

declare const U_INT_8: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt8 extends Branded<NonNegative<UInt16>, typeof U_INT_8> {}

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
    throw new RangeError(
      `${n} cannot be coerced to UInt8 since it is not an integer within the bounds of ${Bounded.bottom} and ${Bounded.top}`
    )
  }
  return n
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
export function toNumber(n: UInt8): number {
  return UInt16.toNonNegativeNumber(n)
}

/**
 * @category Type Guard
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is UInt8 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(Bounded.top) &&
    x >= toNumber(Bounded.bottom)
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
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export const bottom: UInt8 = of(0)
/**
 * @since 1.0.0
 */
export const top: UInt8 = unsafeCoerce<number, UInt8>(Math.pow(2, 8) - 1)

/**
 * @since 1.0.0
 */
export function next(a: UInt8): Option<UInt8> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: UInt8): Option<UInt8> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: UInt8): Rational {
  return Ratio.of(Int)(Integral.toInt(a), Int.of(1))
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
export function fromInt(int: Int): Option<UInt8> {
  return pipe(Int.toNumber(int), option.map(fromNumberLossy))
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
export function toInt(n: UInt8): Int {
  return Int.of(n)
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Eq: Eq<UInt8> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ord: Ord<UInt8> = {
  equals,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Bounded: Bounded<UInt8> = {
  equals,
  compare,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Enum: Enum<UInt8> = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToRational: HasToRational<UInt8> = {
  toRational,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToInt: HasToInt<UInt8> = {
  toInt,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Integral: Integral<UInt8> = {
  toInt,
  toRational,
  quot,
  rem,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Numeric: Numeric<UInt8> = {
  fromNumber,
  toNumber,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<UInt8> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<UInt8> = {
  add,
  mul,
  one,
  zero,
  sub,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const CommutativeRing: CommutativeRing<UInt8> = Ring

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<UInt8> = {
  ...CommutativeRing,
  degree,
  div,
  mod,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Show: Show<UInt8> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasPow: HasPow<UInt8> = { pow }

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
  Show<UInt8> & {
    add: typeof add
    bottom: typeof bottom
    compare: typeof compare
    div: typeof div
    equals: typeof equals
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    next: typeof next
    of: typeof of
    one: typeof one
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    sub: typeof sub
    toInt: typeof toInt
    toNonNegativeNumber: typeof toNumber
    top: typeof top
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: typeof zero
  } = {
  add,
  bottom,
  compare,
  degree,
  div,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  isTypeOf,
  mod,
  mul,
  next,
  of,
  one,
  pow,
  prev,
  quot,
  rem,
  show: Show.show,
  sub,
  toInt,
  toNonNegativeNumber: toNumber,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}
