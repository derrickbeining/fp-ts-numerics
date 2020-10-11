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

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import { Enum, instanceEnum } from './Enum'
import { EuclideanRing, instanceEuclideanRing } from './EuclideanRing'
import { HasPow, instanceHasPow } from './HasPow'
import { HasToInt, instanceHasToInt } from './HasToInt'
import { HasToRational, instanceHasToRational } from './HasToRational'
import { Int } from './Int'
import { Int32 } from './Int32'
import { instanceIntegral, Integral } from './Integral'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import { instanceRing, Ring } from './Ring'
import { instanceSemiring, Semiring } from './Semiring'

declare const INT_16: unique symbol

/**
 * The type of signed, 16-bit integers. Subject to integer overflow.
 *
 * ```ts
 * const myInt: Int = Int(1,0,0)
 * ```
 *
 * @category Data Type
 * @since 1.0.0
 */
export interface Int16 extends Int32 {
  /**
   * @internal
   */
  readonly [INT_16]: unique symbol
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9, 0>

/**
 * A tuple of literal integers representing every valid sequence of digits for
 * [[Int16]]
 *
 * @since 1.0.0
 */
export type Digits =
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
 * import { Int16 } from 'fp-ts-numerics/Int16'
 *
 * Int16.of(3,2,7,6,7)
 * // > 32767
 *
 * @category Constructor
 * @since 1.0.0
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

/**
 * @since 1.0.0
 */
export function isTypeOf(x: unknown): x is Int16 {
  return (
    typeof x === 'number' &&
    Number.isInteger(x) &&
    x <= toNumber(boundedInt16.top) &&
    x >= toNumber(boundedInt16.bottom)
  )
}

/**
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Int16 {
  if (!isTypeOf(n)) {
    throw new Error(
      `${n} cannot be coerced to Int16 since it is not an integer within the bounds of ${boundedInt16.bottom} and ${boundedInt16.top}`
    )
  }
  return fromNumberLossy(n)
}

/**
 * @since 1.0.0
 */
export function fromNumberLossy(n: number): Int16 {
  return unsafeCoerce((n << 16) >> 16)
}

/**
 * @since 1.0.0
 */
export const bottom: Int16 = fromNumberLossy(-Math.pow(2, 15))

/**
 * @since 1.0.0
 */
export const top: Int16 = fromNumberLossy(Math.pow(2, 15) - 1)

// ### Transformations

/**
 * @since 1.0.0
 */
export function fromNumber(n: number): option.Option<Int16> {
  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Int16): number {
  return unsafeCoerce(i)
}

// ## Math Operations

/**
 * @since 1.0.0
 */
export const one: Int16 = of(1)

/**
 * @since 1.0.0
 */
export const zero: Int16 = of(0)

/**
 * @since 1.0.0
 */
export function add(a: Int16, b: Int16): Int16 {
  return fromNumberLossy(toNumber(a) + toNumber(b))
}

/**
 * @since 1.0.0
 */
export function mul(a: Int16, b: Int16): Int16 {
  return fromNumberLossy(toNumber(a) * toNumber(b))
}

/**
 * @since 1.0.0
 */
export function sub(a: Int16, b: Int16): Int16 {
  return fromNumberLossy(toNumber(a) - toNumber(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Int16): Natural {
  return unsafeCoerce(toInt(fromNumberLossy(Math.min(toNumber(top), Math.abs(toNumber(i))))))
}

/**
 * @since 1.0.0
 */
export function div(n: Int16, d: NonZero<Int16>): Int16 {
  const a = toNumber(n)
  const b = toNumber(d)
  return fromNumberLossy(b > 0 ? Math.floor(a / b) : -Math.floor(a / -b))
}

/**
 * @since 1.0.0
 */
export function mod(n: Int16, d: NonZero<Int16>): Int16 {
  const _n = toNumber(n)
  const _d = Math.abs(toNumber(d))
  return fromNumberLossy(((_n % _d) + _d) % _d)
}

/**
 * @since 1.0.0
 */
export function equals(a: Int16, b: Int16): boolean {
  return a === b
}

/**
 * @since 1.0.0
 */
export function compare(a: Int16, b: Int16): -1 | 0 | 1 {
  return ordNumber.compare(toNumber(a), toNumber(b))
}

/**
 * @since 1.0.0
 */
export function next(a: Int16): Option<Int16> {
  return ord.geq(ordInt16)(a, boundedInt16.top) ? option.none : option.some(add(a, one))
}

/**
 * @since 1.0.0
 */
export function prev(a: Int16): Option<Int16> {
  return ord.leq(ordInt16)(a, boundedInt16.bottom) ? option.none : option.some(sub(a, one))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Int16): Rational {
  return Ratio.of(Int)(integralInt16.toInt(a), Int(1))
}

/**
 * @since 1.0.0
 */
export function quot(a: Int16, b: NonZero<Int16>): Int16 {
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
export function rem(a: Int16, b: NonZero<Int16>): Int16 {
  return fromNumberLossy(toNumber(a) % toNumber(b))
}

/**
 * @since 1.0.0
 */
export function fromInt(int: Int): Option<Int16> {
  return pipe(Int.toNumber(int), option.chain(fromNumber))
}

/**
 * @since 1.0.0
 */
export function negate(a: Int16): Int16 {
  return sub(zero, a)
}

/**
 * @since 1.0.0
 */
export function pow(n: Int16, exp: Int16): Int16 {
  return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
}

/**
 * @since 1.0.0
 */
export function toInt(a: Int16): Int {
  return Int.unsafeFromNumber(toNumber(a))
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
const eqInt16: Eq<Int16> = {
  equals,
}
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordInt16: Ord<Int16> = {
  ...eqInt16,
  compare,
}
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const boundedInt16: Bounded<Int16> = {
  ...ordInt16,
  bottom,
  top,
}
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const enumInt16 = instanceEnum<Int16>({
  ...ordInt16,
  next,
  prev,
})
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToRationalInt16: HasToRational<Int16> = instanceHasToRational<Int16>({
  ...ordInt16,
  toRational,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasToIntInt16 = instanceHasToInt<Int16>({
  toInt,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const integralInt16 = instanceIntegral<Int16>({
  ...hasToRationalInt16,
  ...hasToIntInt16,
  quot,
  rem,
  toInt,
})
/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const numericInt16: Numeric<Int16> = instanceNumeric({
  fromNumber,
  toNumber,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringInt16: Semiring<Int16> = instanceSemiring({
  add,
  mul,
  one,
  zero,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringInt16: Ring<Int16> = instanceRing<Int16>({
  ...semiringInt16,
  sub,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingInt16 = instanceCommutativeRing({
  ...ringInt16,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingInt16: EuclideanRing<Int16> = instanceEuclideanRing({
  ...commutativeRingInt16,
  degree,
  div,
  mod,
})

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const showInt16: Show<Int16> = {
  show: (a) => JSON.stringify(toNumber(a)),
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const hasPowInt16 = instanceHasPow({ pow })

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
export const Int16: Bounded<Int16> &
  CommutativeRing<Int16> &
  Enum<Int16> &
  Eq<Int16> &
  EuclideanRing<Int16> &
  HasPow<Int16> &
  HasToInt<Int16> &
  HasToRational<Int16> &
  Integral<Int16> &
  Numeric<Int16> &
  Ord<Int16> &
  Ring<Int16> &
  Semiring<Int16> &
  Show<Int16> &
  typeof exported = {
  ...boundedInt16,
  ...commutativeRingInt16,
  ...enumInt16,
  ...euclideanRingInt16,
  ...hasPowInt16,
  ...integralInt16,
  ...numericInt16,
  ...ordInt16,
  ...hasToRationalInt16,
  ...ringInt16,
  ...semiringInt16,
  ...showInt16,
  ...exported,
}
