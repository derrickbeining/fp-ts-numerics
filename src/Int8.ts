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

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import { Enum, instanceEnum } from './Enum'
import { EuclideanRing, instanceEuclideanRing } from './EuclideanRing'
import { HasPow, instanceHasPow } from './HasPow'
import { HasToInt, instanceHasToInt } from './HasToInt'
import { HasToRational, instanceHasToRational } from './HasToRational'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceRing, Ring } from './Ring'
import { abs } from './Ring.Extra'
import { instanceSemiring, Semiring } from './Semiring'

declare const INT_8: unique symbol

/**
 * @since 1.0.0
 */
export interface Int8 {
  /**
   * @internal
   */
  readonly [INT_8]: unique symbol
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
    x <= toNumber(boundedInt8.top) &&
    x >= toNumber(boundedInt8.bottom)
  )
}

/**
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Int8 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int8 since it is not an integer within the bounds of ${boundedInt8.bottom} and ${boundedInt8.top}`
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
export function compare(a: Int8, b: Int8): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

/**
 * @since 1.0.0
 */
export function next(a: Int8): Option<Int8> {
  return ord.geq(ordInt8)(a, boundedInt8.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Int8): Option<Int8> {
  return ord.leq(ordInt8)(a, boundedInt8.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Int8): Rational {
  return Ratio.of(Int)(integralInt8.toInt(a), Int(1))
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
export const hasToRationalInt8: HasToRational<Int8> = instanceHasToRational<Int8>({
  ...ordInt8,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntInt8 = instanceHasToInt<Int8>({
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralInt8 = instanceIntegral<Int8>({
  ...hasToIntInt8,
  ...hasToRationalInt8,
  quot,
  rem,
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericInt8: Numeric<Int8> = instanceNumeric({
  fromNumber,
  toNumber,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringInt8: Semiring<Int8> = instanceSemiring({
  add,
  mul,
  one,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringInt8: Ring<Int8> = instanceRing<Int8>({
  ...semiringInt8,
  sub,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingInt8 = instanceCommutativeRing({
  ...ringInt8,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingInt8: EuclideanRing<Int8> = instanceEuclideanRing({
  ...commutativeRingInt8,
  degree,
  div,
  mod,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const showInt8: Show<Int8> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasPowInt8 = instanceHasPow({
  pow,
})

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
  Show<Int8> &
  typeof exported = {
  ...boundedInt8,
  ...commutativeRingInt8,
  ...enumInt8,
  ...euclideanRingInt8,
  ...hasPowInt8,
  ...integralInt8,
  ...numericInt8,
  ...ordInt8,
  ...hasToRationalInt8,
  ...ringInt8,
  ...semiringInt8,
  ...showInt8,
  ...exported,
}
