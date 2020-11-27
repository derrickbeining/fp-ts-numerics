/**
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
import { Branded } from './Internal/Branded'
import { Natural } from './Natural'
import { NonNegative } from './NonNegative'
import { NonZero } from './NonZero'
import * as numeric from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import * as ring from './Ring'
import * as semiring from './Semiring'
import { UInt32 } from './UInt32'

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

declare const U_INT_16: unique symbol

/**
 * @category Data Type
 * @since 1.0.0
 */
export interface UInt16 extends Branded<UInt32, typeof U_INT_16> {}

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
      `${n} cannot be coerced to UInt16 since it is not an integer within the bounds of ${Bounded.bottom} and ${Bounded.top}`
    )
  }

  return n
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
export function toNumber(i: UInt16): NonNegative<number> {
  return UInt32.toNonNegativeNumber(i)
}

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is UInt16 {
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
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export const bottom: UInt16 = of(0)
/**
 * @since 1.0.0
 */
export const top: UInt16 = unsafeCoerce<number, UInt16>((Math.pow(2, 16) - 1) & 65535)

/**
 * @since 1.0.0
 */
export function next(a: UInt16): Option<UInt16> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: UInt16): Option<UInt16> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: UInt16): Rational {
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
export function toInt(n: UInt16): Int {
  return Int.of(n)
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Eq: Eq<UInt16> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Ord: Ord<UInt16> = {
  equals,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Bounded: Bounded<UInt16> = {
  equals,
  compare,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Enum = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToRational: HasToRational<UInt16> = {
  toRational,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToInt: HasToInt<UInt16> = {
  toInt,
}
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Integral: Integral<UInt16> = {
  toInt,
  toRational,
  quot,
  rem,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Numeric: Numeric<UInt16> = {
  fromNumber,
  toNumber,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<UInt16> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<UInt16> = {
  // semiring
  add,
  mul,
  one,
  zero,
  // ring
  sub,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const CommutativeRing: CommutativeRing<UInt16> = Ring

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<UInt16> = {
  // commutative ring
  add,
  mul,
  one,
  zero,
  sub,
  // euclidean ring
  degree,
  div,
  mod,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const Show: Show<UInt16> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasPow: HasPow<UInt16> = { pow }

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
  Show<UInt16> & {
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
    negate: typeof negate
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
    toNumber: typeof toNumber
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
  negate,
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
