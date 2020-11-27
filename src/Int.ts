/**
 * Arbitrary precision integers.
 *
 * Internally, `Int` uses native `BigInt` if globally available, otherwise
 * falls back to custom implementation.
 *
 * Like all numeric data types in `fp-ts-numerics`, this module exposes the
 * `Int` type and namespace as a single declaration. It is intended to be
 * consumed like so:
 *
 * ```ts
 * import { Int } from 'fp-ts-numerics'
 *
 * function isEven(n: Int): boolean {
 *   return Int.equals(Int.zero, Int.mod(n, Int.of(2)))
 * }
 * ```
 *
 * @since 1.0.0
 */
import Big, { BigInteger } from 'big-integer'
import * as fc from 'fast-check'
import { eq, option, ord, show } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/function'
import { Ordering } from 'fp-ts/lib/Ordering'
import { Option } from 'fp-ts/Option'

import * as commutativeRing from './CommutativeRing'
import { Digit, NegDigit } from './Digit'
import * as enum_ from './Enum.Internal'
import * as euclideanRing from './EuclideanRing'
import * as hasAdd from './HasAdd'
import * as hasMul from './HasMul'
import * as hasOne from './HasOne'
import * as hasPow from './HasPow'
import * as hasSub from './HasSub'
import * as hasToInt from './HasToInt'
import * as hasToRational from './HasToRational'
import * as hasZero from './HasZero'
import { Int8 } from './Int8'
import { Int16 } from './Int16'
import { Int32 } from './Int32'
import * as integral from './Integral'
import { instanceIsNewtype, Newtype } from './Internal/Newtype'
import { Natural } from './Natural'
import { NonNegative } from './NonNegative'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'
import * as ring from './Ring'
import * as semiring from './Semiring'
import { UInt8 } from './UInt8'
import { UInt16 } from './UInt16'
import { UInt32 } from './UInt32'

type CommutativeRing<T> = commutativeRing.CommutativeRing<T>
type Enum<T> = enum_.Enum<T>
type Eq<T> = eq.Eq<T>
type EuclideanRing<T> = euclideanRing.EuclideanRing<T>
type HasPow<T> = hasPow.HasPow<T>
type HasToInt<T> = hasToInt.HasToInt<T>
type HasToRational<T> = hasToRational.HasToRational<T>
type HasZero<T> = hasZero.HasZero<T>
type HasOne<T> = hasOne.HasOne<T>
type HasAdd<T> = hasAdd.HasAdd<T>
type HasSub<T> = hasSub.HasSub<T>
type HasMul<T> = hasMul.HasMul<T>
type Integral<T> = integral.Integral<T>
type Ord<T> = ord.Ord<T>
type Ring<T> = ring.Ring<T>
type Semiring<T> = semiring.Semiring<T>
type Show<T> = show.Show<T>

declare const INT: unique symbol

/**
 *
 * Arbitrary precision integer type
 *
 * ## Usage
 * ```ts
 * import { Int } from 'fp-ts-numerics'
 *
 * const foo: Int = Int(1,2,3,4,5)
 * ```
 *
 * @category Int
 * @since 1.0.0
 */
export interface Int extends Newtype<typeof INT, BigInteger> {}

const { wrap, unwrap } = instanceIsNewtype<Int>()

/**
 * @internal
 */
export const MAX_SAFE_INTEGER = wrap(Big(Number.MAX_SAFE_INTEGER))
/**
 * @internal
 */
export const MIN_SAFE_INTEGER = wrap(Big(Number.MIN_SAFE_INTEGER))

/**
 * A tuple of digits which can be used to construct an `Int`
 *
 * @since 1.0.0
 */
export type Digits = [0] | [NegDigit, ...Array<Digit>] | [Exclude<Digit, 0>, ...Array<Digit>]

/**
 *
 * Constructs a signed, arbitrary precision integer from `Digits`.
 *
 * @example
 * import { Int } from 'fp-ts-numerics/Int'
import {HasAdd} from '../dist/lib/HasAdd'
 *
 * Int(9,2,2,3,3,7,2,0,3,6,8,5,4,7,7,6,0,0,0)
 *
 * @category Constructor
 * @since 1.0.0
 */
function of(zero: 0): NonNegative<Int>
function of(...digits: [NegDigit, ...Array<Digit>]): NonZero<Int>
function of(...digits: [Exclude<Digit, 0>, ...Array<Digit>]): NonNegative<NonZero<Int>>
function of(...digits: [NonNegative<FixedPrecisionInt>]): NonNegative<Int>
function of(...digits: [NonZero<FixedPrecisionInt>]): NonZero<Int>
function of(...digits: [NonNegative<NonZero<FixedPrecisionInt>>]): NonNegative<NonZero<Int>>
function of(...digits: [FixedPrecisionInt]): Int
function of(
  ...digits: Digits | [FixedPrecisionInt]
): Int | NonNegative<Int> | NonZero<Int> | NonNegative<NonZero<Int>> {
  return wrap(Big(digits.join(''), 10))
}

/**
 * @since 1.0.0
 */
export type FixedPrecisionInt = Int8 | Int16 | Int32 | UInt8 | UInt16 | UInt32

/**
 *
 * Attempts to construct an `Int` from a `number`, returning `nothing` if
 * not an safe integer, otherwise `some(n)`.
 *
 * ```ts
 * Int.fromNumber(100)
 * // > some(100)
 * Int.fromNumber(Number.MAX_VALUE)
 * // > nothing
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): Option<Int> {
  return Number.isInteger(n) && n <= (2 ^ (53 - 1)) && n >= -(2 ^ (53 - 1))
    ? option.some(wrap(Big(n)))
    : option.none
}

/**
 * Unsafely attempts to construct an `Int` from a `number`, throwing an error
 * if not a safe integer.
 *
 * ```ts
 * Int.unsafeFromNumber(100)
 * // > 100
 * Int.unsafeFromNumber(Number.MAX_VALUE)
 * // > uncaught error
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Int {
  if (!Number.isSafeInteger(n)) {
    throw new Error(
      `Cannot coerce number ${n} to Int because it is not an integer between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`
    )
  }
  return wrap(Big(n))
}

/**
 *
 * Attempts to construct an `Int` from a `string`. Configuration is available
 * for numeric base (default 10), alphabet (default '0123456789abcdefghijklmnopqrstuvwxyz'),
 * and case sensitivity (default `false`).
 *
 * ```ts
 * Int.fromString("100")
 * // > some(100n)
 * Int.fromString("100n")
 * // > some(100n)
 * Int.fromString('woops')
 * // > nothing
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromString(
  str: string,
  config: { base?: NonZero<Int>; alphabet?: string; caseSensitive?: boolean } = {}
): Option<Int> {
  const {
    base = of(1, 0),
    alphabet = '0123456789abcdefghijklmnopqrstuvwxyz',
    caseSensitive = false,
  } = config
  try {
    const n = Big(str, unwrap(base), alphabet, caseSensitive)
    return option.some(wrap(n))
  } catch {
    return option.none
  }
}

/**
 * A type guard to test if a value is an `Int`
 *
 * @category Guards
 * @since 1.0.0
 */
export function isTypeOf(n: unknown): n is Int {
  return Big.isInstance(n)
}

/**
 * @since 1.0.0
 */
export function toNativeBigInt(n: Int): bigint {
  return BigInt(unwrap(n).toString())
}

/**
 * Attempts to convert an `Int` to a `number`, computing `none` if outside
 * JavaScript's safe integer range, else `some(number)`.
 *
 * ```ts
 * import { option } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * expect(Int.toNumber(Int(1))).toBe(option.some(1))
 * ```
 *
 * @category Transformation
 * @since 1.0.0
 */
export function toNumber(i: Int): Option<number> {
  return unwrap(i).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    unwrap(i).lesser(Big(Number.MIN_SAFE_INTEGER))
    ? option.none
    : option.some(unsafeToNumber(i))
}

/**
 * Converts an `Int` to a `number` but loses precision if it's outside
 * JavaScript's safe integer range.
 *
 * ```ts
 * import { option } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * expect(Int.toNumberLossy(Int(1))).toBe(1)
 * ```
 *
 * @category Transformation
 * @since 1.0.0
 */
export function toNumberLossy(i: Int): number {
  return unwrap(i).toJSNumber()
}

/**
 * Unsafely converts an `Int` to a `number` throwing RangeError if it's outside
 * JavaScript's range between `Number.MIN_VALUE` and `Number.MAX_VALUE`.
 *
 * ```ts
 * import { option } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics'
 *
 * expect(Int.unsafeToNumber(Int(1))).toBe(1)
 * expect(() => Int.unsafeToNumber(Int(...MAX_SAFE_INTEGER))).toBe(1)
 * ```
 *
 * @category Transformation
 * @since 1.0.0
 */
export function unsafeToNumber(n: Int): number {
  if (
    unwrap(n).greater(Big(Number.MAX_SAFE_INTEGER)) ||
    unwrap(n).lesser(Big(Number.MIN_SAFE_INTEGER))
  ) {
    /* istanbul ignore next */
    throw new RangeError(
      `Int ${n} cannot be coerced to number because it falls outside the range of Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`
    )
  }
  return unsafeCoerce(unwrap(n).toJSNumber())
}

/**
 * @since 1.0.0
 */
export function add(a: Int, b: Int) {
  return wrap(unwrap(a).add(unwrap(b)))
}

/**
 * @since 1.0.0
 */
export function mul(a: Int, b: Int) {
  return wrap(unwrap(a).multiply(unwrap(b)))
}

/**
 * @since 1.0.0
 */
export function sub(a: Int, b: Int) {
  return wrap(unwrap(a).subtract(unwrap(b)))
}

/**
 * @since 1.0.0
 */
export const one = of(1)

/**
 * @since 1.0.0
 */
export const zero = of(0)

/**
 * @since 1.0.0
 */
export function abs(n: Int): NonNegative<Int> {
  return wrap(unwrap(n).abs()) as NonNegative<Int>
}

/**
 * @since 1.0.0
 */
export function compare(a: Int, b: Int): Ordering {
  return unwrap(a).compare(unwrap(b)) as Ordering
}

/**
 * @since 1.0.0
 */
export function equals(a: Int, b: Int): boolean {
  return unwrap(a).equals(unwrap(b))
}

/**
 * @since 1.0.0
 */
export function degree(i: Int): Natural {
  return abs(i)
}

/**
 * @since 1.0.0
 */
export function div(n: Int, d: NonZero<Int>): Int {
  return wrap(unwrap(Ring.sub(n, EuclideanRing.mod(n, d))).divide(unwrap(d)))
}

/**
 * @since 1.0.0
 */
export function mod(n: Int, d: NonZero<Int>): Int {
  const a = unwrap(n)
  const b = unwrap(abs(d))
  return wrap(a.mod(b).add(b).mod(b))
}

/**
 * @since 1.0.0
 */
export function next(n: Int): Option<Int> {
  return option.some(Semiring.add(n, Semiring.one))
}

/**
 * @since 1.0.0
 */
export function prev(n: Int): Option<Int> {
  return option.some(Ring.sub(n, Semiring.one))
}

/**
 * @since 1.0.0
 */
export function toRational(n: Int): Ratio<Int> {
  return Ratio.of(Int)(n, of(1))
}

/**
 * @since 1.0.0
 */
export function toInt(int: Int): Int {
  return int
}

/**
 * @since 1.0.0
 */
export function quot(a: Int, b: Int): Int {
  return wrap(unwrap(a).divide(unwrap(b)))
}

/**
 * @since 1.0.0
 */
export function rem(a: Int, b: Int): Int {
  return wrap(unwrap(a).remainder(unwrap(b)))
}

/**
 * @since 1.0.0
 */
export function pow(n: Int, exp: Int): Int {
  return wrap(unwrap(n).pow(unwrap(exp)))
}

/**
 * @since 1.0.0
 */
export function stringify(n: Int): string {
  return unwrap(n).toString()
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const HasZero: HasZero<Int> = {
  zero,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const HasOne: HasOne<Int> = {
  one,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const HasAdd: HasAdd<Int> = {
  add,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const HasSub: HasSub<Int> = {
  sub,
}
/**
 * @category Instances
 * @since 1.0.0
 */
export const HasMul: HasMul<Int> = {
  mul,
}

/**
 *  `fast-check` Arbitrary instance
 * @category Instances
 * @since 1.0.0
 */
export const Arbitrary: fc.Arbitrary<Int> = fc
  .bigInt()
  .map((n) => Int.fromString(n.toString()))
  .filter(option.isSome)
  .map((n) => n.value)

/**
 * @category Instances
 * @since 1.0.0
 */
export const Eq: Eq<Int> = {
  equals,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Ord: Ord<Int> = ord.fromCompare(compare)

/**
 * @category Instances
 * @since 1.0.0
 */
export const Show: Show<Int> = {
  show: (n) => `Int.of(${unwrap(n).toString().split('').join(',')})`,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Semiring: Semiring<Int> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Ring: Ring<Int> = {
  add,
  mul,
  one,
  zero,
  sub,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const CommutativeRing: CommutativeRing<Int> = Ring

/**
 * @category Instances
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<Int> = {
  // semiring
  add,
  mul,
  one,
  zero,
  // ring
  sub,
  // euclidean ring
  degree,
  div,
  mod,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Enum: Enum<Int> = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const HasToRational: HasToRational<Int> = {
  toRational,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const HasToInt: HasToInt<Int> = {
  toInt,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const Integral: Integral<Int> = {
  toInt,
  toRational,
  /**
   * truncating integer division (rounds toward zero)
   */
  quot,
  /**
   * Remainder of truncating integer division. Always takes the sign of the dividend.
   */
  rem,
}

/**
 * @category Instances
 * @since 1.0.0
 */
export const HasPow: HasPow<Int> = {
  pow,
}

/**
 * The `Int` identifier serves as the type and a namespace for constants,
 * functions, and type classess
 *
 * This is generally the only identifier you'll need to import to work with
 * `Int`s. It holds all typeclass instances as well as all other exports of the
 * `Int` module.
 *
 * ```ts
 * import { ord } from 'fp-ts'
 * import { Int } from 'fp-ts-numerics/Int'
 *
 * const ten: Int = Int(1, 0)
 * const is0LT10: boolean = ord.lt(Int)(Int.zero, ten)
 * const twoDivThree = Int.div(Int(2), Int(3))
 * const zeroTo9000: Array<Int> = Enum.fromTo(Int)(Int.zero, Int(9,0,0,0))
 * ```
 * @category Int
 * @since 1.0.0
 */
export const Int: CommutativeRing<Int> &
  Enum<Int> &
  Eq<Int> &
  EuclideanRing<Int> &
  HasAdd<Int> &
  HasMul<Int> &
  HasOne<Int> &
  HasPow<Int> &
  HasSub<Int> &
  HasToInt<Int> &
  HasToRational<Int> &
  HasZero<Int> &
  Integral<Int> &
  Ord<Int> &
  Ring<Int> &
  Semiring<Int> &
  Show<Int> & {
    abs: typeof abs
    Arbitrary: typeof Arbitrary
    CommutativeRing: typeof CommutativeRing
    Enum: typeof Enum
    Eq: typeof Eq
    EuclideanRing: typeof EuclideanRing
    fromNumber: typeof fromNumber
    fromString: typeof fromString
    HasAdd: typeof HasAdd
    HasMul: typeof HasMul
    HasOne: typeof HasOne
    HasSub: typeof HasSub
    HasToInt: typeof HasToInt
    HasToRational: typeof HasToRational
    HasZero: typeof HasZero
    Integral: typeof Integral
    isTypeOf: typeof isTypeOf
    of: typeof of
    Ord: typeof Ord
    Ring: typeof Ring
    Semiring: typeof Semiring
    Show: typeof Show
    stringify: typeof stringify
    toNativeBigInt: typeof toNativeBigInt
    toNumber: typeof toNumber
    toNumberLossy: typeof toNumberLossy
    unsafeFromNumber: typeof unsafeFromNumber
    unsafeToNumber: typeof unsafeToNumber
  } = {
  abs,
  add,
  Arbitrary,
  CommutativeRing,
  compare,
  degree,
  div,
  Enum,
  Eq,
  equals,
  EuclideanRing,
  fromNumber,
  fromString,
  HasAdd,
  HasMul,
  HasOne,
  HasSub,
  HasToInt,
  HasToRational,
  HasZero,
  Integral,
  isTypeOf,
  mod,
  mul,
  next,
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
  stringify,
  sub,
  toInt,
  toNativeBigInt,
  toNumber,
  toNumberLossy,
  toRational,
  unsafeFromNumber,
  unsafeToNumber,
  zero,
}
