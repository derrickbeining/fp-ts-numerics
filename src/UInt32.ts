/**
 * @since 1.0.0
 */
import { bounded, eq, option, ord, show } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import * as commutativeRing from '../src/CommutativeRing'
import { Natural } from '../src/Natural'
import * as enum_ from './Enum'
import * as euclideanRing from './EuclideanRing'
import * as hasPow from './HasPow'
import * as hasToInt from './HasToInt'
import * as hasToRational from './HasToRational'
import { Int } from './Int'
import * as integral from './Integral'
import { instanceIsNewtype, Newtype } from './Internal/Newtype'
import { NonNegative } from './NonNegative'
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

/**
 * @internal
 */
declare const U_INT_32: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */

export interface UInt32 extends Newtype<typeof U_INT_32, NonNegative<number>> {}

const {
  /**
   * @internal
   */
  wrap,
  /**
   * @internal
   */
  unwrap,
} = instanceIsNewtype<UInt32>()

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
      `${n} cannot be coerced to UInt32 since it is not an integer within the bounds of ${Bounded.bottom} and ${Bounded.top}`
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
export function toNumber(i: UInt32): NonNegative<number> {
  return unwrap(i)
}

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is UInt32 {
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
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export const bottom: UInt32 = of(0)
/**
 * @since 1.0.0
 */
export const top: UInt32 = fromNumberLossy(Math.pow(2, 32) - 1)

/**
 * @since 1.0.0
 */
export function next(a: UInt32): Option<UInt32> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: UInt32): Option<UInt32> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: UInt32): Rational {
  const intMethods = { ...Int.EuclideanRing, ...Int.Ord, ...Int.HasToRational }
  return Ratio.of(intMethods)(Integral.toInt(a), Int.of(1))
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
  return Int.of(a)
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Eq: Eq<UInt32> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Ord: Ord<UInt32> = {
  ...Eq,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Bounded: Bounded<UInt32> = {
  ...Ord,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Enum: Enum<UInt32> = {
  ...Ord,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const HasToRational: HasToRational<UInt32> = {
  ...Ord,
  toRational,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToInt = {
  toInt,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Integral: Integral<UInt32> = {
  ...HasToInt,
  ...HasToRational,
  quot,
  rem,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Numeric: Numeric<UInt32> = {
  fromNumber,
  toNumber,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<UInt32> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<UInt32> = {
  ...Semiring,
  sub,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const CommutativeRing: CommutativeRing<UInt32> = Ring

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<UInt32> = {
  ...CommutativeRing,
  degree,
  div,
  mod,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Show: Show<UInt32> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasPow: HasPow<UInt32> = { pow }

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
  Show<UInt32> & {
    add: typeof add
    bottom: typeof bottom
    Bounded: typeof Bounded
    compare: typeof compare
    div: typeof div
    Enum: typeof Enum
    Eq: typeof Eq
    equals: typeof equals
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
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
    HasToRational: typeof HasToRational
    rem: typeof rem
    Show: typeof Show
    sub: typeof sub
    toInt: typeof toInt
    toInteger: typeof toInteger
    toNonNegativeNumber: typeof toNumber
    top: typeof top
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: typeof zero
  } = {
  add,
  bottom,
  Bounded,
  compare,
  degree,
  div,
  Enum,
  Eq,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
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
  HasToRational,
  rem,
  show: Show.show,
  Show,
  sub,
  toInt,
  toInteger,
  toNonNegativeNumber: toNumber,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}
