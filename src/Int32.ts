/**
 * This module provides a way to construct and work with signed, 32-bit
 * integers. They are just JavaScript`number`s under the hood, so they should
 * be comparable in performance.
 *
 * Since they are limited to 32 bits, `Int32`s are subject to overflowing if
 * the result of any operation should exceed the range of -2^31 and 2^31 - 1.
 *
 * To avoid integer overflow, see [[Int]] for arbitrary precision integers.
 *
 * Like the rest of `fp-ts-numerics`, this module exposes the `Int32` type
 * and namespace as a single declaration. It is intended to be consumed like so:
 *
 * ```ts
 * import { Int32 } from 'fp-ts-numerics'
 *
 * function isEven(n: Int32): boolean {
 *   return Int32.equals(Int32.zero, Int32.mod(n, Int32.of(2)))
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

import * as commutativeRing from '../src/CommutativeRing'
import * as enum_ from './Enum'
import * as euclideanRing from './EuclideanRing'
import * as hasPow from './HasPow'
import * as hasToInt from './HasToInt'
import * as hasToRational from './HasToRational'
import { Int } from './Int'
import * as integral from './Integral'
import { instanceIsNewtype, Newtype } from './Internal/Newtype'
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

declare const INT_32: unique symbol

/**
 * @since 1.0.0
 */
export interface Int32 extends Newtype<typeof INT_32, number> {}

const { wrap, unwrap } = instanceIsNewtype<Int32>()

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * `Int32`
 *
 * @since 1.0.0
 */
export type Digits =
    | [-1 | 0 | 1]
    | [LeadingDigit]
    | [LeadingDigit, Digit]
    | [LeadingDigit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [-1 | 1, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [-2 | 2, 0, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [-2 | 2, 1, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [-2 | 2, 1, 4, Exclude<Digit, 7 | 8 | 9>, Digit, Digit, Digit, Digit, Digit, Digit ]
    | [-2 | 2, 1, 4, 7, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit]
    | [-2 | 2, 1, 4, 7, 4, Exclude<Digit, 8 | 9>, Digit, Digit, Digit, Digit]
    | [-2 | 2, 1, 4, 7, 4, 8, 0 | 1 | 2, Digit, Digit, Digit]
    | [-2 | 2, 1, 4, 7, 4, 8, 3, 0 | 1 | 2 | 3 | 4 | 5, Digit, Digit]
    | [-2 | 2, 1, 4, 7, 4, 8, 3, 6, 0 | 1 | 2 | 3, Digit]
    | [-2 | 2, 1, 4, 7, 4, 8, 3, 6, 4, Exclude<Digit, 8 | 9>]
    | [-2, 1, 4, 7, 4, 8, 3, 6, 4, 8] // prettier-ignore

/**
 * Constructs a 32-bit, signed, two's complement integer.
 *
 *   - Min value: -2^31
 *   - Max value: 2^31 - 1
 *
 * @example
 * import { Int32 } from 'fp-ts-numerics/Int32'
 *
 * Int32.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
 * // > 21474883647
 *
 * @since 1.0.0
 */
export function of(zero: 0): Int32
export function of(...digits: Digits): NonZero<Int32>
export function of(...digits: Digits): Int32 | NonZero<Int32> {
  return pipe(digits.join(''), (str) => fromNumberLossy(+str))
}

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is Int32 {
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
export function unsafeFromNumber(n: number): Int32 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int32 since it is not an integer within the bounds of ${Bounded.bottom} and ${Bounded.top}`
    )
  }
  return fromNumberLossy(n)
}

/**
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): Int32 {
  return wrap(n | 0)
}

/**
 * @since 1.0.0
 */
export const bottom: Int32 = fromNumberLossy(Math.pow(-2, 31))
/**
 * @since 1.0.0
 */
export const top: Int32 = fromNumberLossy(Math.pow(2, 31) - 1)

// ### Transformations

/**
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<Int32> {
  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Int32): number {
  return unwrap(i)
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: Int32 = of(1)

/**
 * @since 1.0.0
 */
export const zero: Int32 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: Int32, b: Int32): Int32 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function mul(a: Int32, b: Int32): Int32 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function sub(a: Int32, b: Int32): Int32 {
  return fromNumberLossy(toNumber(a) - toNumber(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Int32): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: Int32, d: NonZero<Int32>): Int32 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: Int32, d: NonZero<Int32>): Int32 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: Int32, b: Int32): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export function next(a: Int32): Option<Int32> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Int32): Option<Int32> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Int32): Rational {
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
export function quot(a: Int32, b: NonZero<Int32>): Int32 {
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
export function rem(a: Int32, b: NonZero<Int32>): Int32 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<Int32> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

/**
 * @since 1.0.0
 */
export function negate(a: Int32): Int32 {
  return sub(zero, a)
}

/**
 * @since 1.0.0
 */
export function pow(n: Int32, exp: Int32): Int32 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: Int32): Int {
  return Int.of(a)
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Eq: Eq<Int32> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ord: Ord<Int32> = {
  equals,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Bounded: Bounded<Int32> = {
  equals,
  compare,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Enum: Enum<Int32> = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToRational: HasToRational<Int32> = {
  toRational,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToInt: HasToInt<Int32> = {
  toInt,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Integral: Integral<Int32> = {
  toInt,
  toRational,
  quot,
  rem,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Numeric: Numeric<Int32> = {
  fromNumber,
  toNumber,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<Int32> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<Int32> = {
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
export const CommutativeRing: CommutativeRing<Int32> = Ring

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<Int32> = {
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
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Show: Show<Int32> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */

export const HasPow: HasPow<Int32> = { pow }

/**
 * @since 1.0.0
 */
export const Int32: Bounded<Int32> &
  CommutativeRing<Int32> &
  Enum<Int32> &
  Eq<Int32> &
  EuclideanRing<Int32> &
  HasPow<Int32> &
  HasToInt<Int32> &
  HasToRational<Int32> &
  Integral<Int32> &
  Numeric<Int32> &
  Ord<Int32> &
  Ring<Int32> &
  Semiring<Int32> &
  Show<Int32> & {
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
