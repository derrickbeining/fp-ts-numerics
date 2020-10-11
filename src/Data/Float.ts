/**
 * This module provides a way to construct and work with signed, 32-bit
 * integers. They are just JavaScript`number`s under the hood, so they should
 * be comparable in performance.
 *
 * Since they are limited to 32 bits, `Float`s are subject to overflowing if
 * the result of any operation should exceed the range of -2^31 and 2^31 - 1.
 *
 * To avoid integer overflow, see [[Int]] for arbitrary precision integers.
 *
 * Like the rest of `fp-ts-numerics`, this module exposes the `Float` type
 * and namespace as a single declaration. It is intended to be consumed like so:
 *
 * ```ts
 * import { Float } from 'fp-ts-numerics'
 *
 * function isEven(n: Float): boolean {
 *   return Float.equals(Float.zero, Float.mod(n, Float.of(2)))
 * }
 * ```
 *
 * @packageDocumentation
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
import { Enum, instanceEnum } from '../Class/Enum.Internal'
import { EuclideanRing, instanceEuclideanRing } from '../Class/EuclideanRing'
import { HasPow, instanceHasPow } from '../Class/HasPow'
import { HasToInt, instanceHasToInt } from '../Class/HasToInt'
import { HasToRational, instanceHasToRational } from '../Class/HasToRational'
import { instanceIntegral, Integral } from '../Class/Integral'
import { instanceNumeric, Numeric } from '../Class/Numeric'
import { Rational } from '../Class/Rational'
import { instanceRing, Ring } from '../Class/Ring'
import { instanceSemiring, Semiring } from '../Class/Semiring'
import { Int } from './Int'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'

declare const FLOAT: unique symbol

/**
 * @since 1.0.0
 */
export interface Float {
  /**
   * @internal
   */
  readonly [FLOAT]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[Float]]
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
    : (a: number) => a

/**
 * Constructs a 32-bit, signed floating-point number.
 * Math.pow(2, 127) * (2 - 1 / Math.pow(2, 23))
 *   - Min value: -2^127 * (2 - (1/2^23))
 *   - Max value: 2^127 * (2 - (1/2^23))
 *
 * @since 1.0.0
 *
 * @example
 * import * as Float from 'fp-ts-numerics/Data/Float'
 *
 * const f = Float.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
 *
 */
export function of(zero: 0): Float
export function of(...digits: Digits): NonZero<Float>
export function of(...digits: Digits): Float | NonZero<Float> {
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
export function isTypeOf(x: unknown): x is Float {
  return typeof x === 'number' && !Number.isNaN(x) && Number.isFinite(x) && fround(x) === x
}

/**
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Float {
  if (!isTypeOf(n)) {
    throw new Error(`${n} cannot be losslessly coerced to Float.`)
  }
  return fromNumberLossy(n)
}

/**
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): Float {
  return unsafeCoerce(fround(n))
}

/**
 * @since 1.0.0
 */
export const bottom: Float = fromNumberLossy(-Math.pow(2, 127) * (2 - 1 / Math.pow(2, 23)))
/**
 * @since 1.0.0
 */
export const top: Float = fromNumberLossy(Math.pow(2, 127) * (2 - 1 / Math.pow(2, 23)))

// ### Transformations

/**
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<Float> {
  // const frounded = fround(n)

  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Float): number {
  return unsafeCoerce(i)
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: Float = of(1)
/**
 * @since 1.0.0
 */
export const zero: Float = of(0)

/**
 * @since 1.0.0
 */
export function add(a: Float, b: Float): Float {
  const res = toNumber(a) + toNumber(b)
  // !Number.isFinite(res) && console.log({ a, b, res })

  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function mul(a: Float, b: Float): Float {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

/**
 * @since 1.0.0
 */
export function sub(a: Float, b: Float): Float {
  return fromNumberLossy(toNumber(a) - toNumber(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Float): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: Float, d: NonZero<Float>): Float {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: Float, d: NonZero<Float>): Float {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: Float, b: Float): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export function compare(a: Float, b: Float): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

/**
 * @since 1.0.0
 */
export function next(a: Float): Option<Float> {
  return ord.geq(ordFloat)(a, boundedFloat.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Float): Option<Float> {
  return ord.leq(ordFloat)(a, boundedFloat.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Float): Rational {
  return Ratio.of(Int)(integralFloat.toInt(a), Int(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: Float, b: NonZero<Float>): Float {
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
export function rem(a: Float, b: NonZero<Float>): Float {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function toInteger(a: Float): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<Float> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

/**
 * @since 1.0.0
 */
export function negate(a: Float): Float {
  return sub(zero, a)
}

/**
 * @since 1.0.0
 */
export function pow(n: Float, exp: Float): Float {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: Float): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const eqFloat: Eq<Float> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordFloat: Ord<Float> = {
  ...eqFloat,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const boundedFloat: Bounded<Float> = {
  ...ordFloat,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumFloat = instanceEnum<Float>({
  ...ordFloat,
  next,
  prev,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToRationalFloat: HasToRational<Float> = instanceHasToRational<Float>({
  ...ordFloat,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntFloat = instanceHasToInt<Float>({
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralFloat = instanceIntegral<Float>({
  ...hasToIntFloat,
  ...hasToRationalFloat,
  quot,
  rem,
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericFloat: Numeric<Float> = instanceNumeric({
  fromNumber,
  toNumber,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringFloat: Semiring<Float> = instanceSemiring({
  add,
  mul,
  one,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringFloat: Ring<Float> = instanceRing<Float>({
  ...semiringFloat,
  sub,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingFloat = instanceCommutativeRing({
  ...ringFloat,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingFloat: EuclideanRing<Float> = instanceEuclideanRing({
  ...commutativeRingFloat,
  degree,
  div,
  mod,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const showFloat: Show<Float> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasPowFloat = instanceHasPow({ pow })

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
export const Float: Bounded<Float> &
  CommutativeRing<Float> &
  Enum<Float> &
  Eq<Float> &
  EuclideanRing<Float> &
  HasPow<Float> &
  HasToInt<Float> &
  HasToRational<Float> &
  Integral<Float> &
  Numeric<Float> &
  Ord<Float> &
  Ring<Float> &
  Semiring<Float> &
  Show<Float> &
  typeof exported = {
  ...boundedFloat,
  ...commutativeRingFloat,
  ...enumFloat,
  ...euclideanRingFloat,
  ...hasPowFloat,
  ...integralFloat,
  ...numericFloat,
  ...ordFloat,
  ...hasToRationalFloat,
  ...ringFloat,
  ...semiringFloat,
  ...showFloat,
  ...exported,
}
