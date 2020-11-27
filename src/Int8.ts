/**
 * This module provides a way to construct and work with signed, 8-bit
 * integers. They are just JavaScript`number`s under the hood, so they should
 * be comparable in performance.
 *
 * Since they are limited to 8 bits, `Int8`s are subject to overflowing if
 * the result of any operation should exceed the range of -2^7 and 2^7 -1.
 *
 * To avoid integer overflow, see [[Int]] for arbitrary precision integers.
 *
 * Like the rest of `fp-ts-numerics`, this module exposes the `Int8` type
 * and namespace as a single declaration. It is intended to be consumed like so:
 *
 * ```ts
 * import { Int8 } from 'fp-ts-numerics'
 *
 * function isEven(n: Int8): boolean {
 *   return Int8.equals(Int8.zero, Int8.mod(n, Int8.of(2)))
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
import { Int16 } from './Int16'
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

declare const INT_8: unique symbol

/**
 * @since 1.0.0
 */
export interface Int8 extends Branded<Int16, typeof INT_8> {}

// ## Functions

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[Int8]]
 *
 * @since 1.0.0
 */
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [-1 | 1, 0 | 1, Digit]
  | [-1 | 1, 2, Exclude<Digit, 8 | 9>]

/**
 * Constructs a 8-bit, signed, two's complement integer.
 *
 *   - Min value: -2^7
 *   - Max value: 2^7 - 1
 *
 * ```ts
 * Int8.of(1,2,7)
 * // > 127
 * ```
 *
 * @since 1.0.0
 */
export function of(zero: 0): Int8
export function of(...digits: Digits): NonZero<Int8>
export function of(...digits: Digits): Int8 | NonZero<Int8> {
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
export function isTypeOf(x: unknown): x is Int8 {
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
export function unsafeFromNumber(n: number): Int8 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int8 since it is not an integer within the bounds of ${Bounded.bottom} and ${Bounded.top}`
    )
  }
  return fromNumberLossy(n)
}

/**
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): Int8 {
  return unsafeCoerce((n << 24) >> 24)
}

/**
 * @since 1.0.0
 */
export const bottom: Int8 = fromNumberLossy(Math.pow(-2, 7))

/**
 * @since 1.0.0
 */
export const top: Int8 = fromNumberLossy(Math.pow(2, 7) - 1)

// ### Transformations

/**
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<Int8> {
  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Int8): number {
  return unsafeCoerce(i)
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: Int8 = of(1)

/**
 * @since 1.0.0
 */
export const zero: Int8 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: Int8, b: Int8): Int8 {
  return fromNumberLossy(toNumber(a) + toNumber(b))
}

/**
 * @since 1.0.0
 */
export function mul(a: Int8, b: Int8): Int8 {
  return fromNumberLossy(toNumber(a) * toNumber(b))
}

/**
 * @since 1.0.0
 */
export function sub(a: Int8, b: Int8): Int8 {
  return fromNumberLossy(toNumber(a) - toNumber(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Int8): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: Int8, d: NonZero<Int8>): Int8 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: Int8, d: NonZero<Int8>): Int8 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: Int8, b: Int8): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export function next(a: Int8): Option<Int8> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Int8): Option<Int8> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Int8): Rational {
  const intMethods = {
    ...Int.HasToRational,
    ...Int.Ord,
    ...Int.EuclideanRing,
  }
  return Ratio.of(intMethods)(Integral.toInt(a), Int.of(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: Int8, b: NonZero<Int8>): Int8 {
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
export function rem(a: Int8, b: NonZero<Int8>): Int8 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<Int8> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

/**
 * @since 1.0.0
 */
export function negate(a: Int8): Int8 {
  return sub(zero, a)
}

/**
 * @since 1.0.0
 */
export function pow(n: Int8, exp: Int8): Int8 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: Int8): Int {
  return Int.of(a)
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Eq: Eq<Int8> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ord: Ord<Int8> = {
  equals,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Bounded: Bounded<Int8> = {
  equals,
  compare,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Enum: Enum<Int8> = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToRational: HasToRational<Int8> = {
  toRational,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToInt: HasToInt<Int8> = {
  toInt,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Integral: Integral<Int8> = {
  toInt,
  toRational,
  quot,
  rem,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Numeric: Numeric<Int8> = {
  fromNumber,
  toNumber,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<Int8> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<Int8> = {
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
export const CommutativeRing: CommutativeRing<Int8> = Ring

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<Int8> = {
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
export const Show: Show<Int8> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasPow: HasPow<Int8> = {
  pow,
}

/**
 * @since 1.0.0
 */
export const Int8: Bounded<Int8> &
  CommutativeRing<Int8> &
  Enum<Int8> &
  Eq<Int8> &
  EuclideanRing<Int8> &
  HasPow<Int8> &
  HasToInt<Int8> &
  HasToRational<Int8> &
  Integral<Int8> &
  Numeric<Int8> &
  Ord<Int8> &
  Ring<Int8> &
  Semiring<Int8> &
  Show<Int8> & {
    add: typeof add
    bottom: typeof bottom
    Bounded: typeof Bounded
    CommutativeRing: typeof CommutativeRing
    compare: typeof compare
    div: typeof div
    Enum: typeof Enum
    equals: typeof equals
    EuclideanRing: typeof EuclideanRing
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    HasPow: typeof HasPow
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
  equals,
  EuclideanRing,
  fromInt,
  fromNumber,
  fromNumberLossy,
  HasPow,
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
