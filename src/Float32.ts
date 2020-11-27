/**
 * This module provides a way to construct and work with signed, 32-bit
 * integers. They are just JavaScript`number`s under the hood, so they should
 * be comparable in performance.
 *
 * Since they are limited to 32 bits, `Float32`s are subject to overflowing if
 * the result of any operation should exceed the range of -2^31 and 2^31 - 1.
 *
 * To avoid integer overflow, see [[Int]] for arbitrary precision integers.
 *
 * Like the rest of `fp-ts-numerics`, this module exposes the `Float32` type
 * and namespace as a single declaration. It is intended to be consumed like so:
 *
 * ```ts
 * import { Float32 } from 'fp-ts-numerics'
 *
 * function isEven(n: Float32): boolean {
 *   return Float32.equals(Float32.zero, Float32.mod(n, Float32.of(2)))
 * }
 * ```
 *
 * @packageDocumentation
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { bounded, eq, option, ord, show as fptsShow } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'

import * as commutativeRing from './CommutativeRing'
import * as divisionRing from './DivisionRing'
import * as enum_ from './Enum'
import * as euclideanRing from './EuclideanRing'
import * as field from './Field'
import { Float64 } from './Float64'
import * as hasAdd from './HasAdd'
import * as hasMul from './HasMul'
import * as hasOne from './HasOne'
import * as hasPow from './HasPow'
import * as hasSub from './HasSub'
import * as hasZero from './HasZero'
import { Int } from './Int'
import { instanceIsNewtype, Newtype } from './Internal/Newtype'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import * as numeric from './Numeric'
import * as ring from './Ring'
import * as semiring from './Semiring'

type HasAdd<T> = hasAdd.HasAdd<T>
type HasMul<T> = hasMul.HasMul<T>
type HasOne<T> = hasOne.HasOne<T>
type HasSub<T> = hasSub.HasSub<T>
type HasZero<T> = hasZero.HasZero<T>
type Bounded<T> = bounded.Bounded<T>
type CommutativeRing<T> = commutativeRing.CommutativeRing<T>
type DivisionRing<T> = divisionRing.DivisionRing<T>
type Enum<T> = enum_.Enum<T>
type Eq<T> = eq.Eq<T>
type EuclideanRing<T> = euclideanRing.EuclideanRing<T>
type Field<T> = field.Field<T>
type HasPow<T> = hasPow.HasPow<T>
type Numeric<T> = numeric.Numeric<T>
type Option<T> = option.Option<T>
type Ord<T> = ord.Ord<T>
type Ring<T> = ring.Ring<T>
type Semiring<T> = semiring.Semiring<T>
type Show<T> = fptsShow.Show<T>

declare const FLOAT: unique symbol

/**
 * @since 1.0.0
 */
export interface Float32 extends Newtype<typeof FLOAT, Float64> {}

const { wrap, unwrap } = instanceIsNewtype<Float32>()

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[Float32]]
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

const fround =
  Math.fround !== undefined
    ? Math.fround
    : Float32Array !== undefined
    ? (function () {
        const temp = new Float32Array(1)
        return function fround(x: number): number {
          temp[0] = x
          return temp[0]
        }
      })()
    : function fround(n: number): number {
        if (n === 0 || Number.isNaN(n)) return n
        const sign = n < 0 ? -1 : 1
        const m = Math.abs(n)
        // compute exponent (8 bits, signed)
        const exp = Math.floor(Math.log(m) / Math.LN2)
        const powexp = Math.pow(2, Math.max(-126, Math.min(exp, 127)))
        // handle subnormals
        const leading = exp < -127 ? 0 : 1
        // compute 23 bits of mantissa, inverted to round toward zero
        const mantissa = Math.round((leading - m / powexp) * 0x800000)
        if (mantissa <= -0x800000) return sign * Infinity
        return sign * powexp * (leading - mantissa / 0x800000)
      }

/**
 * Constructs a 32-bit, signed floating-point number.
 * Math.pow(2, 127) * (2 - 1 / Math.pow(2, 23))
 *   - Min value: -2^127 * (2 - (1/2^23))
 *   - Max value: 2^127 * (2 - (1/2^23))
 *
 * @since 1.0.0
 *
 * @example
 * import * as Float32 from 'fp-ts-numerics/Float32'
 *
 * const f = Float32.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
 *
 */
export function of(zero: 0): Float32
export function of(...digits: Digits): NonZero<Float32>
export function of(...digits: Digits): Float32 | NonZero<Float32> {
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
export function isTypeOf(x: unknown): x is Float32 {
  return (
    typeof x === 'number' &&
    (Number.isNaN(x) ||
      !Number.isFinite(x) ||
      // avoiding equals becuase can't rely on float equality
      (x < toNumber(top) && x > toNumber(bottom)))
  )
}

/**
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Float32 {
  if (!isTypeOf(n)) {
    throw new Error(`${n} cannot be losslessly coerced to Float32.`)
  }
  return fromNumberLossy(n)
}

/**
 * Coerces a Float64 to Float32, using `Math.fround` internally.
 * If the input exceeds the range of `Float32`, it evaluates to
 * `Infinity` or `-Infinity`.
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): Float32 {
  return wrap(fround(n))
}

/**
 * @since 1.0.0
 */
export const bottom: Float32 = fromNumberLossy(-Math.pow(2, 127) * (2 - 1 / Math.pow(2, 23)))
/**
 * @since 1.0.0
 */
export const top: Float32 = fromNumberLossy(Math.pow(2, 127) * (2 - 1 / Math.pow(2, 23)))

// ### Transformations

/**
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<Float32> {
  // const frounded = fround(n)

  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Float32): number {
  return unwrap(i)
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: Float32 = of(1)
/**
 * @since 1.0.0
 */
export const zero: Float32 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: Float32, b: Float32): Float32 {
  return fromNumberLossy(toNumber(a) + toNumber(b))
}

/**
 * @since 1.0.0
 */
export function mul(a: Float32, b: Float32): Float32 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function sub(a: Float32, b: Float32): Float32 {
  return fromNumberLossy(toNumber(a) - toNumber(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Float32): Natural {
  return Natural.one
}

/**
 * @since 1.0.0
 */
export function div(n: Float32, d: NonZero<Float32>): Float32 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: Float32, d: NonZero<Float32>): Float32 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function recip(n: NonZero<Float32>): Float32 {
  return div(one, n)
}

/**
 * @since 1.0.0
 */
export function equals(a: Float32, b: Float32): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export const compare = ord.contramap(toNumber)(ord.ordNumber).compare

/**
 * @since 1.0.0
 */
export function next(a: Float32): Option<Float32> {
  return ord.geq(Ord)(a, Bounded.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Float32): Option<Float32> {
  return ord.leq(Ord)(a, Bounded.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function quot(a: Float32, b: NonZero<Float32>): Float32 {
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
export function rem(a: Float32, b: NonZero<Float32>): Float32 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function toInteger(a: Float32): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<Float32> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

/**
 * @since 1.0.0
 */
export function negate(a: Float32): Float32 {
  return sub(zero, a)
}

/**
 * @since 1.0.0
 */
export function pow(n: Float32, exp: Float32): Float32 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: Float32): Option<Int> {
  return Number.isInteger(unwrap(a)) ? option.some(Int.unsafeFromNumber(toNumber(a))) : option.none
}

/**
 * Typeclasses
 */

/**
 *  `Arbitrary<Float32>` from `fast-check`
 *
 * @since 1.0.0
 */
export const Arbitrary: fc.Arbitrary<Float32> = fc
  // .float(-1, 1)
  .float()
  .map(fromNumber)
  .filter(option.isSome)
  .map((n) => n.value)

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Eq: Eq<Float32> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ord: Ord<Float32> = {
  equals,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Bounded: Bounded<Float32> = {
  equals,
  compare,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Enum: Enum<Float32> = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Numeric: Numeric<Float32> = {
  fromNumber,
  toNumber,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<Float32> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<Float32> = {
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
export const CommutativeRing = Ring

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<Float32> = {
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
export const Show: Show<Float32> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasPow: HasPow<Float32> = { pow }

/**
 * Instance of [[DivisionRing]] for `Float32`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const DivisionRing: DivisionRing<Float32> = {
  add,
  mul,
  one,
  zero,
  sub,
  recip,
}

/**
 * Instance of [[Field]] for `Float32`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Field: Field<Float32> = {
  add,
  mul,
  one,
  zero,
  sub,
  degree,
  div,
  mod,
  recip,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasZero: HasZero<Float32> = {
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasOne: HasOne<Float32> = {
  one,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasAdd: HasAdd<Float32> = {
  add,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasSub: HasSub<Float32> = {
  sub,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasMul: HasMul<Float32> = {
  mul,
}

/**
 * @since 1.0.0
 */
export const Float32: Bounded<Float32> &
  CommutativeRing<Float32> &
  Enum<Float32> &
  Eq<Float32> &
  EuclideanRing<Float32> &
  HasPow<Float32> &
  Numeric<Float32> &
  Ord<Float32> &
  Ring<Float32> &
  Semiring<Float32> &
  Show<Float32> & {
    Arbitrary: typeof Arbitrary
    Bounded: typeof Bounded
    CommutativeRing: typeof CommutativeRing
    Enum: typeof Enum
    Eq: typeof Eq
    EuclideanRing: typeof EuclideanRing
    fromInt: typeof fromInt
    fromNumberLossy: typeof fromNumberLossy
    HasAdd: typeof HasAdd
    HasMul: typeof HasMul
    HasOne: typeof HasOne
    HasPow: typeof HasPow
    HasSub: typeof HasSub
    HasZero: typeof HasZero
    isTypeOf: typeof isTypeOf
    negate: typeof negate
    Numeric: typeof Numeric
    of: typeof of
    Ord: typeof Ord
    quot: typeof quot
    rem: typeof rem
    Ring: typeof Ring
    Semiring: typeof Semiring
    Show: typeof Show
    toInt: typeof toInt
    unsafeFromNumber: typeof unsafeFromNumber
  } = {
  add,
  Arbitrary,
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
  HasAdd,
  HasMul,
  HasOne,
  HasPow,
  HasSub,
  HasZero,
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
  unsafeFromNumber,
  zero,
}
