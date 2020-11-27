/**
 * @since 1.0.0
 */
import Big, { BigInteger } from 'big-integer'
import { eq, option, ord, show } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/function'
import { Ordering } from 'fp-ts/lib/Ordering'
import { pipe } from 'fp-ts/lib/pipeable'
import { Option } from 'fp-ts/Option'

import * as enum_ from './Enum.Internal'
import * as hasAdd from './HasAdd'
import * as hasMul from './HasMul'
import * as hasOne from './HasOne'
import * as hasPow from './HasPow'
import * as hasToInt from './HasToInt'
import * as hasToRational from './HasToRational'
import * as hasZero from './HasZero'
import { Int } from './Int'
import * as integral from './Integral'
import { isNonNegative, NonNegative } from './NonNegative'
import { NonZero } from './NonZero'
import { Ratio } from './Ratio'
import { Rational } from './Rational'
import * as semiring from './Semiring'

type Enum<T> = enum_.Enum<T>
type Eq<T> = eq.Eq<T>
type HasAdd<T> = hasAdd.HasAdd<T>
type HasMul<T> = hasMul.HasMul<T>
type HasOne<T> = hasOne.HasOne<T>
type HasPow<T> = hasPow.HasPow<T>
type HasToInt<T> = hasToInt.HasToInt<T>
type HasToRational<T> = hasToRational.HasToRational<T>
type HasZero<T> = hasZero.HasZero<T>
type Integral<T> = integral.Integral<T>
type Ord<T> = ord.Ord<T>
type Semiring<T> = semiring.Semiring<T>
type Show<T> = show.Show<T>

/**
 * Arbitrary-precision non-negative integers
 *
 * @since 1.0.0
 */
export interface Natural extends NonNegative<Int> {}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type LeadingDigit = Exclude<Digit, 0>

/**
 * @since 1.0.0
 */
export type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]

/**
 * @since 1.0.0
 */
export function of(zero: 0): Natural
export function of(...digits: Digits): NonZero<Natural>
export function of(...digits: Digits): Natural | NonZero<Natural> {
  return unsafeFromBigInt(Big(digits.join('')))
}

/**
 * Attempts to construct a [[Natural]] from a `number`, computing `none` if
 * not a safe non-negative integer, otherwise `some(n)`.
 *
 * ```ts
 * import { Natural } from 'fp-ts-numerics'
import {Branded} from './Internal/Branded'
 *
 * Natural.fromNumber(100)
 * // > option.some(Natural.of(1,0,0))
 * Natural.fromNumber(Number.MAX_VALUE)
 * // > option.nothing
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function fromNumber(n: number): Option<Natural> {
  return numberIsNatural(n) ? option.some(unsafeFromBigInt(Big(n))) : option.none
}

/**
 * Unsafely attempts to construct an [[Natural]] from a `number`, throwing an error
 * if not a safe, non-negative integer.
 *
 * ```ts
 * import { Natural } from 'fp-ts-numerics'
 *
 * Natural.unsafeFromNumber(100)
 * // > Natural.of(1,0,0)
 * Natural.unsafeFromNumber(Number.MAX_VALUE)
 * // > uncaught error
 * ```
 *
 * @category Constructor
 * @since 1.0.0
 */
export function unsafeFromNumber(n: number): Natural {
  if (!numberIsNatural(n)) {
    throw new Error(
      `Cannot convert number ${show.showNumber.show(
        n
      )} to Natural because it is not an integer between 0 and Number.MAX_SAFE_INTEGER.`
    )
  }
  return unsafeFromBigInt(Big(n))
}

/**
 * @internal
 */
function unsafeFromBigInt(n: BigInteger): Natural {
  if (!isTypeOf(n)) {
    throw new Error(`${n.toJSON()} cannot be converted to a \`Natural\`.`)
  }
  return n
}

/**
 * @since 1.0.0
 */
export function fromInt(n: Int): Option<Natural> {
  return isTypeOf(n) ? option.some(n) : option.none
}

/**
 * @since 1.0.0
 */
export function equals(a: Natural, b: Natural): boolean {
  return Int.equals(a, b)
}

/**
 * @since 1.0.0
 */
export function compare(a: Natural, b: Natural): Ordering {
  const _a = toBigInt(a)
  const _b = toBigInt(b)
  return _a.greater(_b) ? 1 : _a.lesser(_b) ? -1 : 0
}

// function fromInt(i: Int): Natural {
//   return fromBigInt(bigint(unsafeCoerce(i)))
// }

// function fromInt32(i: Int32): Natural {
//   return fromBigInt(bigint(Int32.toNumber(i)))
// }

// function fromUInt16(i: UInt16): Natural {
//   return fromBigInt(bigint(UInt16.toNumber(i)))
// }

// function fromUInt32(i: UInt32): Natural {
//   return fromBigInt(bigint(UInt32.toNumber(i)))
// }

/**
 * Subtract the second `Natural` from the first. Evaluates to `zero`
 * when the result would be less than zero, since `Natural` cannot obey
 * `Ring` laws or wrap on overflow. See `unsafeMinus` if you desire a
 * runtime error to be thrown on underflow.
 * @since 1.0.0
 */
export function minus(a: Natural, b: Natural): Natural {
  return pipe(
    Int.sub(a, b),
    option.fromPredicate(isNonNegative({ ...Int.Ord, ...Int.HasZero })),
    option.getOrElse(() => zero)
  )
}

/**
 * Subtract the second `Natural` from the first. Throws an error
 * if underflow occurs.
 * @since 1.0.0
 */
export function unsafeMinus(a: Natural, b: Natural): Natural {
  const r = Int.sub(a, b)
  if (isTypeOf(r)) return r
  else {
    throw new Error(`Underflow Error: \`Natural.unsafeMinus(${a}, ${b}\``)
  }
}

/**
 * @since 1.0.0
 */
export function degree(i: Natural): Natural {
  return i
}

/**
 * @since 1.0.0
 */
export function div(n: Natural, d: NonZero<Natural>): Natural {
  if (Ord.equals(d, Semiring.zero)) return Semiring.zero
  return unsafeFromBigInt(toBigInt(minus(n, mod(n, d))).divide(toBigInt(d)))
}

/**
 * @since 1.0.0
 */
export function mod(n: Natural, d: Natural): Natural {
  if (Ord.equals(d, of(0))) return of(0)
  const a = toBigInt(n)
  const b = toBigInt(d)

  return unsafeFromBigInt(a.mod(b).add(b).mod(b))
}

/**
 * @since 1.0.0
 */
export function toRational(a: Natural): Rational {
  const intMethods = {
    ...Int.HasToRational,
    ...Int.Ord,
    ...Int.EuclideanRing,
  }
  return Ratio.of(intMethods)(Integral.toInt(a), Int.of(1))
}

/**
 * @since: 1.0.0
 */
export function toInt(n: Natural): NonNegative<Int> {
  return n
}

/**
 * @since: 1.0.0
 */
export function quot(a: Natural, b: Natural): Natural {
  return unsafeFromBigInt(toBigInt(a).divide(toBigInt(b)))
}

/**
 * @since: 1.0.0
 */
export function rem(a: Natural, b: Natural): Natural {
  return unsafeFromBigInt(toBigInt(a).remainder(toBigInt(b)))
}
/**
 * @since: 1.0.0
 */
export function add(a: Natural, b: Natural): Natural {
  return unsafeFromBigInt(toBigInt(a).add(toBigInt(b)))
}

/**
 * @since: 1.0.0
 */
export function mul(a: Natural, b: Natural): Natural {
  return unsafeFromBigInt(toBigInt(a).multiply(toBigInt(b)))
}

/**
 * @since: 1.0.0
 */
export function pow(n: Natural, exponent: Natural): Natural {
  return unsafeFromBigInt(toBigInt(n).pow(toBigInt(exponent)))
}

/**
 * @since: 1.0.0
 */
export const one = of(1)

/**
 * @since: 1.0.0
 */
export const zero = of(0)

/**
 * @since: 1.0.0
 */
export function next(prev: Natural): Option<Natural> {
  return option.some(add(prev, Natural.one))
}

/**
 * @since: 1.0.0
 */
export function prev(next: Natural): Option<Natural> {
  return Ord.equals(next, Natural.zero) ? option.none : option.some(minus(next, Natural.one))
}

/**
 * @since: 1.0.0
 */
export function stringify(n: Natural): string {
  return Int.stringify(toInt(n))
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
export const HasMul: HasMul<Int> = {
  mul,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Eq: Eq<Natural> = {
  equals,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ord = ord.fromCompare<Natural>(compare)

/**
 * @since 1.0.0
 */
export const Show: Show<Natural> = {
  show: (n) => `Natural.of(${stringify(n).split(',')})`,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToRational: HasToRational<Natural> = {
  toRational,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasToInt: HasToInt<Natural> = {
  toInt,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Integral: Integral<Natural> = {
  toInt,
  toRational,
  /**
   * truncating integer division (rounds toward zero)
   */
  quot,
  /**
   * Remainder of truncating integer division. Always takes the sign of the divisor.
   */
  rem,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<Natural> = {
  add,
  mul,
  one,
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Enum: Enum<Natural> = {
  equals,
  compare,
  next,
  prev,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasPow: HasPow<Natural> = {
  pow,
}

// ## Functions

/**
 * @internal
 */
function toBigInt(i: Natural): BigInteger {
  return unsafeCoerce(i)
}

/**
 * @since 1.0.0
 */
export function toNumber(i: Natural): Option<number> {
  return Int.toNumber(i)
}

/**
 * @since 1.0.0
 */
export function isTypeOf(n: unknown): n is Natural {
  return Int.isTypeOf(n) && isNonNegative({ ...Int.Ord, ...Int.Semiring })(n)
}

/**
 * @since 1.0.0
 */
export function numberIsNatural(n: number): boolean {
  return Number.isInteger(n) && n >= 0 && n <= Number.MAX_SAFE_INTEGER
}

// function toInt(i: Natural): Option<Int> {
//   return pipe(toNumber(i), option.chain(Int.fromNumber))
// }

// function toInt32(i: Natural): Option<Int32> {
//   return pipe(toNumber(i), option.chain(Int32.fromNumber))
// }

// function toUInt16(i: Natural): option.Option<UInt16> {
//   return pipe(toInt(i), option.chain(UInt16.fromInt))
// }

// function toUInt32(i: Natural): option.Option<UInt32> {
//   return pipe(toInt(i), option.chain(UInt32.fromInt))
// }

/**
 * @since 1.0.0
 */
export const Natural: Eq<Natural> &
  Enum<Natural> &
  HasAdd<Natural> &
  HasMul<Natural> &
  HasOne<Natural> &
  HasPow<Natural> &
  HasToInt<Natural> &
  HasToRational<Natural> &
  HasZero<Natural> &
  Integral<Natural> &
  Ord<Natural> &
  Show<Natural> &
  Semiring<Natural> & {
    degree: typeof degree
    div: typeof div
    Enum: typeof Enum
    Eq: typeof Eq
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    HasAdd: typeof HasAdd
    HasMul: typeof HasMul
    HasOne: typeof HasOne
    HasPow: typeof HasPow
    HasToInt: typeof HasToInt
    HasToRational: typeof HasToRational
    HasZero: typeof HasZero
    Integral: typeof Integral
    isTypeOf: typeof isTypeOf
    minus: typeof minus
    mod: typeof mod
    of: typeof of
    Ord: typeof Ord
    Semiring: typeof Semiring
    Show: typeof Show
    toBigInt: typeof toBigInt
    unsafeFromNumber: typeof unsafeFromNumber
    toNumber: typeof toNumber
    unsafeMinus: typeof unsafeMinus
  } = {
  add,
  compare,
  degree,
  div,
  Enum,
  Eq,
  equals,
  fromInt,
  fromNumber,
  HasAdd,
  HasMul,
  HasOne,
  HasPow,
  HasToInt,
  HasToRational,
  HasZero,
  Integral,
  isTypeOf,
  minus,
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
  Semiring,
  Show,
  show: Show.show,
  toBigInt,
  toInt,
  toNumber,
  toRational,
  unsafeFromNumber,
  unsafeMinus,
  zero,
}
