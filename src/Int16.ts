/**
 * This module provides a way to construct and work with signed, 16-bit
 * integers. They are just JavaScript`number`s under the hood, so they should
 * be comparable in performance.
 *
 * Since they are limited to 16 bits, `Int16`s are subject to overflowing if
 * the result of any operation should exceed the range of -2^15 and 2^15 - 1.
 *
 * To avoid integer overflow, see [[Int]] for arbitrary precision integers.
 *
 * Like the rest of `fp-ts-numerics`, this module exposes the `Int16` type
 * and namespace as a single declaration. It is intended to be consumed like so:
 *
 * ```ts
 * import { Int16 } from 'fp-ts-numerics'
 *
 * function isEven(n: Int16): boolean {
 *   return Int16.equals(Int16.zero, Int16.mod(n, Int16.of(2)))
 * }
 * ```
 *
 * @packageDocumentation
 * @since 1.0.0
 */
import { bounded, eq, option, ord, show } from 'fp-ts'
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
import { Int32 } from './Int32'
import * as integral from './Integral'
import { Branded } from './Internal/Branded'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import * as numeric from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import * as ring from './Ring'
import * as semiring from './Semiring'

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

declare const INT_16: unique symbol

/**
 * The type of signed, 16-bit integers. Subject to integer overflow.
 *
 * ```ts
 * const myInt: Int = Int(1,0,0)
 * ```
 *
 * @category Data Type
 * @since 1.0.0
 */
export interface Int16 extends Branded<Int32, typeof INT_16> {}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[Int16]]
 *
 * @since 1.0.0
 */
export type Digits =
  | [-1 | 0 | 1]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [-2 | -1 | 1 | 2, Digit, Digit, Digit, Digit]
  | [-3 | 3, 0 | 1, Digit, Digit, Digit]
  | [-3 | 3, 2, Exclude<Digit, 7 | 8 | 9>, Digit, Digit]
  | [-3 | 3, 2, 7, 0 | 1 | 2 | 3 | 4 | 5, Digit]
  | [-3 | 3, 2, 7, 6, Exclude<Digit, 8 | 9>]
  | [-3, 2, 7, 6, 8]

/**
 * Constructs a signed 16-bit integer.
 *
 *   - Min value: -2^15
 *   - Max value: 2^15 - 1
 *
 * @example
 * import { Int16 } from 'fp-ts-numerics/Int16'
 *
 * Int16.of(3,2,7,6,7)
 * // > 32767
 *
 * @category Constructor
 * @since 1.0.0
 */
export function of(zero: 0): Int16
export function of(...digits: Digits): NonZero<Int16>
export function of(...digits: Digits): Int16 | NonZero<Int16> {
  return pipe(
    digits
      .filter((x): x is Digits[number] => Number.isInteger(x))
      .map((j) => j.toString())
      .join(''),
    (str) => fromNumberLossy(+str)
  )
}

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is Int16 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(Bounded.top) &&
    x >= toNumber(Bounded.bottom)
  )
}

/**
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Int16 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int16 since it is not an integer within the bounds of ${Bounded.bottom} and ${Bounded.top}`
    )
  }
  return fromNumberLossy(n)
}

/**
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): Int16 {
  return unsafeCoerce((n << 16) >> 16)
}

/**
 * @since 1.0.0
 */
export const bottom: Int16 = fromNumberLossy(-Math.pow(2, 15))

/**
 * @since 1.0.0
 */
export const top: Int16 = fromNumberLossy(Math.pow(2, 15) - 1)

// ### Transformations

/**
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<Int16> {
  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Int16): number {
  return unsafeCoerce(i)
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: Int16 = of(1)

/**
 * @since 1.0.0
 */
export const zero: Int16 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: Int16, b: Int16): Int16 {
  return fromNumberLossy(toNumber(a) + toNumber(b))
}

/**
 * @since 1.0.0
 */
export function mul(a: Int16, b: Int16): Int16 {
  return fromNumberLossy(toNumber(a) * toNumber(b))
}

/**
 * @since 1.0.0
 */
export function sub(a: Int16, b: Int16): Int16 {
  return fromNumberLossy(toNumber(a) - toNumber(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Int16): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: Int16, d: NonZero<Int16>): Int16 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: Int16, d: NonZero<Int16>): Int16 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: Int16, b: Int16): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export function next(a: Int16): Option<Int16> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Int16): Option<Int16> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Int16): Rational {
  const intMethods = {
    ...Int.Ord,
    ...Int.EuclideanRing,
    ...Int.HasToRational,
  }
  return Ratio.of(intMethods)(Integral.toInt(a), Int.of(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: Int16, b: NonZero<Int16>): Int16 {
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
export function rem(a: Int16, b: NonZero<Int16>): Int16 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function fromInt(n: Int): Option<Int16> {
  return pipe(Int.toNumber(n), option.chain(fromNumber))
}

/**
 * @since 1.0.0
 */
export function negate(a: Int16): Int16 {
  return sub(zero, a)
}

/**
 * @since 1.0.0
 */
export function pow(n: Int16, exp: Int16): Int16 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: Int16): Int {
  return Int.of(a)
}

/**
 * @category Instances
 * @since 1.0.0
 */
const Eq: Eq<Int16> = {
  equals,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const Ord: Ord<Int16> = {
  equals,
  compare,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const Bounded: Bounded<Int16> = {
  equals,
  compare,
  bottom,
  top,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const Enum: Enum<Int16> = {
  equals,
  compare,
  next,
  prev,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const HasToRational: HasToRational<Int16> = {
  toRational,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const HasToInt: HasToInt<Int16> = {
  toInt,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Integral: Integral<Int16> = {
  toRational,
  toInt,
  quot,
  rem,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const Numeric: Numeric<Int16> = {
  fromNumber,
  toNumber,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Semiring: Semiring<Int16> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Ring: Ring<Int16> = {
  add,
  mul,
  one,
  zero,
  sub,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const CommutativeRing: CommutativeRing<Int16> = Ring

/**
 * @category Instances
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<Int16> = {
  add,
  mul,
  one,
  zero,
  sub,
  degree,
  div,
  mod,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Show: Show<Int16> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const HasPow: HasPow<Int16> = { pow }

/**
 * @since 1.0.0
 */
export const Int16: Bounded<Int16> &
  CommutativeRing<Int16> &
  Enum<Int16> &
  Eq<Int16> &
  EuclideanRing<Int16> &
  HasPow<Int16> &
  HasToInt<Int16> &
  HasToRational<Int16> &
  Integral<Int16> &
  Numeric<Int16> &
  Ord<Int16> &
  Ring<Int16> &
  Semiring<Int16> &
  Show<Int16> & {
    add: typeof add
    bottom: typeof bottom
    Bounded: typeof Bounded
    CommutativeRing: typeof CommutativeRing
    compare: typeof compare
    div: typeof div
    Enum: typeof Enum
    Eq: typeof Eq
    equals: typeof equals
    EuclideanRing: typeof EuclideanRing
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    HasPow: typeof HasPow
    HasToInt: typeof HasToInt
    HasToRational: typeof HasToRational
    Integral: typeof Integral
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    Numeric: typeof Numeric
    of: typeof of
    one: typeof one
    Ord: typeof Ord
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    Ring: typeof Ring
    Semiring: typeof Semiring
    Show: typeof Show
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: typeof top
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: typeof zero
  } = {
  add,
  bottom,
  Bounded,
  CommutativeRing,
  compare,
  degree,
  div,
  Enum,
  Eq,
  equals,
  EuclideanRing,
  fromInt,
  fromNumber,
  fromNumberLossy,
  HasPow,
  HasToInt,
  HasToRational,
  Integral,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  Numeric,
  of,
  one,
  Ord,
  pow,
  prev,
  quot,
  rem,
  Ring,
  Semiring,
  Show,
  show: Show.show,
  sub,
  toInt,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}
