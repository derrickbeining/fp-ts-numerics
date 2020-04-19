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
import { Int32 } from './Int32'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceReal, Real } from './Real'

declare const int_16: unique symbol

/**
 * The `Int16` namespace. Its declaration is merged with the `Int16` type so
 * you only have to import one thing. All functions on `Int16`s are available
 * here.
 *
 * ```ts
 * import { Int16 } from 'fp-ts-numerics'
 * //         type
 * // ----------     namespace
 * //          |-------
 * //          |      |
 * //          v      v
 * const sum: Int = Int16.add(Int16.of(1), Int16.of(2))
 * ```
 *
 * @since 1.0.0
 */
export namespace Int16 {
  /**
   * The type of signed, 16-bit integers. Subject to integer overflow.
   *
   * ```ts
   * const myInt: Int = Int.of(1,0,0)
   * ```
   *
   * @category Data Type
   * @since 1.0.0
   */
  export interface Int16 extends Readonly<Int32 & { readonly [int_16]: unique symbol }> {}

  type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

  type Digits =
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
   * ```ts
   * Int16.of(3,2,7,6,7)
   * // > 32767
   * ```
   * @category Constructor
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

  export function isTypeOf(x: unknown): x is Int16 {
    return (
      typeof x === 'number' &&
      Number.isInteger(x) &&
      x <= toNumber(boundedInt16.top) &&
      x >= toNumber(boundedInt16.bottom)
    )
  }

  export function unsafeFromNumber(n: number): Int16 {
    if (!isTypeOf(n)) {
      throw new Error(
        `${n} cannot be coerced to Int16 since it is not an integer within the bounds of ${boundedInt16.bottom} and ${boundedInt16.top}`
      )
    }
    return fromNumberLossy(n)
  }

  export function fromNumberLossy(n: number): Int16 {
    return unsafeCoerce((n << 16) >> 16)
  }

  export const bottom: Int16 = fromNumberLossy(-Math.pow(2, 15))
  export const top: Int16 = fromNumberLossy(Math.pow(2, 15) - 1)

  // ### Transformations

  export function fromNumber(n: number): option.Option<Int16> {
    return isTypeOf(n) ? option.some(n) : option.none
  }

  export function toNumber(i: Int16): number {
    return unsafeCoerce(i)
  }

  // ## Math Operations

  export const one: Int16 = of(1)
  export const zero: Int16 = of(0)

  export function add(a: Int16, b: Int16): Int16 {
    const res = toNumber(a) + toNumber(b)
    return fromNumberLossy(res)
  }

  export function mul(a: Int16, b: Int16): Int16 {
    const res = toNumber(a) * toNumber(b)
    return fromNumberLossy(res)
  }

  export function sub(a: Int16, b: Int16): Int16 {
    const res = toNumber(a) - toNumber(b)
    return fromNumberLossy(res)
  }

  export function div(n: Int16, d: NonZero<Int16>): Int16 {
    const _n = toNumber(n)
    const _d = toNumber(d)
    return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
  }

  export function mod(n: Int16, d: NonZero<Int16>): Int16 {
    const _n = toNumber(n)
    const _d = Math.abs(toNumber(d))
    return fromNumberLossy(((_n % _d) + _d) % _d)
  }

  export function equals(a: Int16, b: Int16): boolean {
    return a === b
  }

  export function compare(a: Int16, b: Int16): -1 | 0 | 1 {
    return ordNumber.compare(toNumber(a), toNumber(b))
  }

  export function next(a: Int16): Option<Int16> {
    return ord.geq(ordInt16)(a, boundedInt16.top) ? option.none : option.some(add(a, one))
  }

  export function prev(a: Int16): Option<Int16> {
    return ord.leq(ordInt16)(a, boundedInt16.bottom) ? option.none : option.some(sub(a, one))
  }

  export function toRational(a: Int16): Rational {
    return Ratio.of(Int)(integralInt16.toInteger(a), Int.of(1))
  }

  export function quot(a: Int16, b: NonZero<Int16>): Int16 {
    const q = toNumber(a) / toNumber(b)
    return q < 0
      ? fromNumberLossy(Math.ceil(q))
      : q > 0
      ? fromNumberLossy(Math.floor(q))
      : fromNumberLossy(q)
  }

  export function rem(a: Int16, b: NonZero<Int16>): Int16 {
    return fromNumberLossy(toNumber(a) % toNumber(b))
  }

  export function toInteger(a: Int16): Int {
    return Int.unsafeFromNumber(toNumber(a))
  }

  export function abs(a: Int16): Int16 {
    return fromNumberLossy(Math.abs(toNumber(a)))
  }

  export function fromInt(int: Int): Option<Int16> {
    return pipe(Int.toNumber(int), option.chain(fromNumber))
  }

  export function negate(a: Int16): Int16 {
    return sub(zero, a)
  }

  export function pow(n: Int16, exp: Int16): Int16 {
    return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
  }

  export function signum(a: Int16): Int16 {
    return fromNumberLossy(compare(a, zero))
  }

  export function toInt(a: Int16): Int {
    return Int.unsafeFromNumber(toNumber(a))
  }

  /**
   * @category fp-ts Typeclass Instance
   */
  const eqInt16: Eq<Int16> = {
    equals,
  }
  /**
   * @category fp-ts Typeclass Instance
   */
  export const ordInt16: Ord<Int16> = {
    ...eqInt16,
    compare,
  }
  /**
   * @category fp-ts Typeclass Instance
   */
  export const boundedInt16: Bounded<Int16> = {
    ...ordInt16,
    bottom,
    top,
  }
  /**
   * @category fp-ts Typeclass Instance
   */
  export const enumInt16 = instanceEnum<Int16>({
    ...ordInt16,
    next,
    prev,
  })
  /**
   * @category fp-ts Typeclass Instance
   */
  export const realInt16: Real<Int16> = instanceReal<Int16>({
    ...ordInt16,
    toRational,
  })
  /**
   * @category fp-ts Typeclass Instance
   */
  export const integralInt16 = instanceIntegral<Int16>({
    ...realInt16,
    quot,
    rem,
    toInteger,
  })
  /**
   * @category fp-ts Typeclass Instance
   */
  export const numericInt16: Numeric<Int16> = instanceNumeric({
    ...integralInt16,
    ...ordInt16,
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
   * @category fp-ts Typeclass Instance
   */
  export const showInt16: Show<Int16> = {
    show: (a) => JSON.stringify(toNumber(a)),
  }

  /**
   * @internal
   */
  export const typeclasses: Bounded<Int16> &
    Enum<Int16> &
    Integral<Int16> &
    Numeric<Int16> &
    Show<Int16> = {
    ...boundedInt16,
    ...enumInt16,
    ...integralInt16,
    ...numericInt16,
    ...ordInt16,
    ...realInt16,
    ...showInt16,
  }
}

export type Int16 = Int16.Int16
export const int16 = Int16.typeclasses
