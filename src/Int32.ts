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
import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { Show } from 'fp-ts/lib/Show'

import { Enum, instanceEnum } from './Enum.Internal'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceReal, Real } from './Real'

declare const INT_32: unique symbol

export interface Int32 {
  /**
   * @internal
   */
  readonly [INT_32]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[Int32]]
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
 * Int32.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
 * // > 21474883647
 */
export function of(zero: 0): Int32
export function of(...digits: Digits): NonZero<Int32>
export function of(...digits: Digits): Int32 | NonZero<Int32> {
  return pipe(
    digits
      .filter((x): x is Digits[number] => Number.isInteger(x))
      .map((j) => j.toString())
      .join(''),
    (str) => fromNumberLossy(+str)
  )
}

export function isTypeOf(x: unknown): x is Int32 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedInt32.top) &&
    x >= toNumber(boundedInt32.bottom)
  )
}

export function unsafeFromNumber(n: number): Int32 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int32 since it is not an integer within the bounds of ${boundedInt32.bottom} and ${boundedInt32.top}`
    )
  }
  return fromNumberLossy(n)
}

export function fromNumberLossy(n: number): Int32 {
  return unsafeCoerce(n | 0)
}

export const bottom: Int32 = fromNumberLossy(Math.pow(-2, 31))
export const top: Int32 = fromNumberLossy(Math.pow(2, 31) - 1)

// ### Transformations

export function fromNumber(n: number): option.Option<Int32> {
  return isTypeOf(n) ? option.some(n) : option.none
}

export function toNumber(i: Int32): number {
  return unsafeCoerce(i)
}

// ## Math Operations

export const one: Int32 = of(1)
export const zero: Int32 = of(0)

export function add(a: Int32, b: Int32): Int32 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

export function mul(a: Int32, b: Int32): Int32 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

export function sub(a: Int32, b: Int32): Int32 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

export function div(n: Int32, d: NonZero<Int32>): Int32 {
  const _n = toNumber(n)
  const _d = toNumber(d)
  return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
}

export function mod(n: Int32, d: NonZero<Int32>): Int32 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

export function equals(a: Int32, b: Int32): boolean {
  return a === b
}

export function compare(a: Int32, b: Int32): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

export function next(a: Int32): Option<Int32> {
  return ord.geq(ordInt32)(a, boundedInt32.top) ? option.none : option.some(add(a, one))
}

export function prev(a: Int32): Option<Int32> {
  return ord.leq(ordInt32)(a, boundedInt32.bottom) ? option.none : option.some(sub(a, one))
}

export function toRational(a: Int32): Rational {
  return Ratio.of(Int)(integralInt32.toInteger(a), Int.of(1))
}

export function quot(a: Int32, b: NonZero<Int32>): Int32 {
  const q = toNumber(a) / toNumber(b)
  return q < 0
    ? fromNumberLossy(Math.ceil(q))
    : q > 0
    ? fromNumberLossy(Math.floor(q))
    : fromNumberLossy(q)
}

export function rem(a: Int32, b: NonZero<Int32>): Int32 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

export function toInteger(a: Int32): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

export function abs(a: Int32): Int32 {
  return fromNumberLossy(Math.abs(toNumber(a)))
}

export function fromInt(int: Int): Option<Int32> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

export function negate(a: Int32): Int32 {
  return sub(zero, a)
}

export function pow(n: Int32, exp: Int32): Int32 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

export function signum(a: Int32): Int32 {
  return fromNumberLossy(compare(a, zero))
}

export function toInt(a: Int32): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * Typeclasses
 */

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const eqInt32: Eq<Int32> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordInt32: Ord<Int32> = {
  ...eqInt32,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const boundedInt32: Bounded<Int32> = {
  ...ordInt32,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumInt32 = instanceEnum<Int32>({
  ...ordInt32,
  next,
  prev,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const realInt32: Real<Int32> = instanceReal<Int32>({
  ...ordInt32,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralInt32 = instanceIntegral<Int32>({
  ...realInt32,
  quot,
  rem,
  toInteger,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericInt32: Numeric<Int32> = instanceNumeric({
  ...integralInt32,
  ...ordInt32,
  abs,
  add,
  div,
  fromInt,
  fromNumber,
  mod,
  mul,
  negate,
  one,
  pow,
  signum,
  sub,
  toInt,
  toNumber,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const showInt32: Show<Int32> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

const exported = {
  abs,
  add,
  bottom,
  boundedInt32,
  compare,
  div,
  enumInt32,
  eqInt32,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  integralInt32,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  numericInt32,
  of,
  one,
  ordInt32,
  pow,
  prev,
  quot,
  realInt32,
  rem,
  showInt32,
  signum,
  sub,
  toInt,
  toInteger,
  toNumber,
  top,
  toRational,
  unsafeFromNumber,
  zero,
}

export const Int32: Bounded<Int32> &
  Enum<Int32> &
  Integral<Int32> &
  Numeric<Int32> &
  Show<Int32> &
  typeof exported = {
  ...boundedInt32,
  ...enumInt32,
  ...integralInt32,
  ...numericInt32,
  ...ordInt32,
  ...realInt32,
  ...showInt32,
  ...exported,
}
