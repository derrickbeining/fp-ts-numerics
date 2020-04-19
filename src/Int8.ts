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
import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { Show } from 'fp-ts/lib/Show'

import { Enum, instanceEnum } from './Enum'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceReal, Real } from './Real'

declare const int_8: unique symbol

export interface Int8 {
  /**
   * @internal
   */
  readonly [int_8]: unique symbol
}

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

export function isTypeOf(x: unknown): x is Int8 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedInt8.top) &&
    x >= toNumber(boundedInt8.bottom)
  )
}

export function unsafeFromNumber(n: number): Int8 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int8 since it is not an integer within the bounds of ${boundedInt8.bottom} and ${boundedInt8.top}`
    )
  }
  return fromNumberLossy(n)
}

export function fromNumberLossy(n: number): Int8 {
  return unsafeCoerce((n << 24) >> 24)
}

export const bottom: Int8 = fromNumberLossy(Math.pow(-2, 7))
export const top: Int8 = fromNumberLossy(Math.pow(2, 7) - 1)

// ### Transformations

export function fromNumber(n: number): option.Option<Int8> {
  return isTypeOf(n) ? option.some(n) : option.none
}

export function toNumber(i: Int8): number {
  return unsafeCoerce(i)
}

// ## Math Operations

export const one: Int8 = of(1)
export const zero: Int8 = of(0)

export function add(a: Int8, b: Int8): Int8 {
  const res = toNumber(a) + toNumber(b)
  return fromNumberLossy(res)
}

export function mul(a: Int8, b: Int8): Int8 {
  const res = toNumber(a) * toNumber(b)
  return fromNumberLossy(res)
}

export function sub(a: Int8, b: Int8): Int8 {
  const res = toNumber(a) - toNumber(b)
  return fromNumberLossy(res)
}

export function div(n: Int8, d: NonZero<Int8>): Int8 {
  const _n = toNumber(n)
  const _d = toNumber(d)
  return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
}

export function mod(n: Int8, d: NonZero<Int8>): Int8 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

export function equals(a: Int8, b: Int8): boolean {
  return a === b
}

export function compare(a: Int8, b: Int8): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

export function next(a: Int8): Option<Int8> {
  return ord.geq(ordInt8)(a, boundedInt8.top) ? option.none : option.some(add(a, one))
}

export function prev(a: Int8): Option<Int8> {
  return ord.leq(ordInt8)(a, boundedInt8.bottom) ? option.none : option.some(sub(a, one))
}

export function toRational(a: Int8): Rational {
  return Ratio.of(Int)(integralInt8.toInteger(a), Int.of(1))
}

export function quot(a: Int8, b: NonZero<Int8>): Int8 {
  const q = toNumber(a) / toNumber(b)
  return q < 0
    ? fromNumberLossy(Math.ceil(q))
    : q > 0
    ? fromNumberLossy(Math.floor(q))
    : fromNumberLossy(q)
}

export function rem(a: Int8, b: NonZero<Int8>): Int8 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

export function toInteger(a: Int8): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

export function abs(a: Int8): Int8 {
  return fromNumberLossy(Math.abs(toNumber(a)))
}

export function fromInt(int: Int): Option<Int8> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

export function negate(a: Int8): Int8 {
  return sub(zero, a)
}

export function pow(n: Int8, exp: Int8): Int8 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

export function signum(a: Int8): Int8 {
  return fromNumberLossy(compare(a, zero))
}

export function toInt(a: Int8): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const eqInt8: Eq<Int8> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordInt8: Ord<Int8> = {
  ...eqInt8,
  compare,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const boundedInt8: Bounded<Int8> = {
  ...ordInt8,
  bottom,
  top,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumInt8 = instanceEnum<Int8>({
  ...ordInt8,
  next,
  prev,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const realInt8: Real<Int8> = instanceReal<Int8>({
  ...ordInt8,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralInt8 = instanceIntegral<Int8>({
  ...realInt8,
  quot,
  rem,
  toInteger,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericInt8: Numeric<Int8> = instanceNumeric({
  ...integralInt8,
  ...ordInt8,
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
export const showInt8: Show<Int8> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

const exported = {
  abs,
  add,
  bottom,
  boundedInt8,
  compare,
  div,
  enumInt8,
  eqInt8,
  equals,
  fromInt,
  fromNumber,
  fromNumberLossy,
  integralInt8,
  isTypeOf,
  mod,
  mul,
  negate,
  next,
  numericInt8,
  of,
  one,
  ordInt8,
  pow,
  prev,
  quot,
  realInt8,
  rem,
  showInt8,
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

export const Int8: Bounded<Int8> &
  Enum<Int8> &
  Integral<Int8> &
  Numeric<Int8> &
  Show<Int8> &
  typeof exported = {
  ...boundedInt8,
  ...enumInt8,
  ...integralInt8,
  ...numericInt8,
  ...ordInt8,
  ...realInt8,
  ...showInt8,
  ...exported,
}
