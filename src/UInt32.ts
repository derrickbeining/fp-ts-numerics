import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord, ordNumber } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'
import { Show } from 'fp-ts/lib/Show'
import { Rational } from 'Rational'

import { Enum, instanceEnum } from './Enum'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { instanceReal, Real } from './Real'

declare const u_int_32: unique symbol

export namespace UInt32 {
  export interface UInt32 extends Readonly<{ readonly [u_int_32]: unique symbol }> {}
  type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  type LeadingDigit = Exclude<Digit, 0>

  type Digits =
    | [0]
    | [LeadingDigit]
    | [LeadingDigit, Digit]
    | [LeadingDigit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [4, 0 | 1, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [4, 2, Exclude<Digit, 9>, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [4, 2, 9, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit]
    | [4, 2, 9, 4, Exclude<Digit, 9>, Digit, Digit, Digit, Digit, Digit]
    | [4, 2, 9, 4, 9, 0 | 1 | 2 | 3 | 4 | 5, Digit, Digit, Digit, Digit]
    | [4, 2, 9, 4, 9, 6, Exclude<Digit, 7 | 8 | 9>, Digit, Digit, Digit]
    | [4, 2, 9, 4, 9, 6, 7, 0 | 1, Digit, Digit]
    | [4, 2, 9, 4, 9, 6, 7, 2, Exclude<Digit, 9>, Digit]
    | [4, 2, 9, 4, 9, 6, 7, 2, 9, Exclude<Digit, 6 | 7 | 8 | 9>]

  /** Constructs an UInt32 from digits */
  export function of(zero: 0): UInt32
  export function of(...digits: Digits): NonZero<UInt32>
  export function of(...digits: Digits): UInt32 | NonZero<UInt32> {
    return pipe(
      digits
        .filter((x): x is Digits[number] => Number.isInteger(x))
        .map((j) => j.toString())
        .join(''),
      (str) => unsafeCoerce(+str >>> 0)
    )
  }

  export function isTypeOf(x: unknown): x is UInt32 {
    return (
      typeof x === 'number' &&
      Number.isInteger(x) &&
      x <= toNumber(boundedUInt32.top) &&
      x >= toNumber(boundedUInt32.bottom)
    )
  }

  export function unsafeFromNumber(n: number): UInt32 {
    if (!isTypeOf(n)) {
      throw new Error(
        `${n} cannot be coerced to UInt32 since it is not an integer within the bounds of ${boundedUInt32.bottom} and ${boundedUInt32.top}`
      )
    }
    return unsafeCoerce(n)
  }

  export function fromNumberLossy(n: number): UInt32 {
    return unsafeCoerce(n >>> 0)
  }

  // ### Transformations

  export function fromNumber(n: number): option.Option<UInt32> {
    return isTypeOf(n) ? option.some(n) : option.none
  }

  export function toNumber(i: UInt32): number {
    return unsafeCoerce(i)
  }

  // ## Math Operations

  export const one: UInt32 = of(1)
  export const zero: UInt32 = of(0)

  export function add(a: UInt32, b: UInt32): UInt32 {
    const res = toNumber(a) + toNumber(b)
    return fromNumberLossy(res)
  }

  export function mul(a: UInt32, b: UInt32): UInt32 {
    const res = toNumber(a) * toNumber(b)
    return fromNumberLossy(res)
  }

  export function sub(a: UInt32, b: UInt32): UInt32 {
    const res = toNumber(a) - toNumber(b)
    return fromNumberLossy(res)
  }

  export function div(n: UInt32, d: NonZero<UInt32>): UInt32 {
    const _n = toNumber(n)
    const _d = toNumber(d)
    return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
  }

  export function mod(n: UInt32, d: NonZero<UInt32>): UInt32 {
    const _n = toNumber(n)
    const _d = Math.abs(toNumber(d))
    return fromNumberLossy(((_n % _d) + _d) % _d)
  }

  export function equals(a: UInt32, b: UInt32): boolean {
    return a === b
  }

  export function compare(a: UInt32, b: UInt32): -1 | 0 | 1 {
    return ordNumber.compare(toNumber(a), toNumber(b))
  }

  export const bottom = of(0)
  export const top: UInt32 = unsafeCoerce<number, UInt32>((Math.pow(2, 32) - 1) >>> 0)

  export function next(a: UInt32): Option<UInt32> {
    return ord.geq(ordUInt32)(a, boundedUInt32.top) ? option.none : option.some(add(a, one))
  }

  export function prev(a: UInt32): Option<UInt32> {
    return ord.leq(ordUInt32)(a, boundedUInt32.bottom) ? option.none : option.some(sub(a, one))
  }

  export function toRational(a: UInt32): Rational {
    return Ratio.of(Int)(integralUInt32.toInteger(a), Int.of(1))
  }

  export function quot(a: UInt32, b: NonZero<UInt32>): UInt32 {
    const q = toNumber(a) / toNumber(b)
    return q < 0
      ? fromNumberLossy(Math.ceil(q))
      : q > 0
      ? fromNumberLossy(Math.floor(q))
      : fromNumberLossy(q)
  }

  export function rem(a: UInt32, b: NonZero<UInt32>): UInt32 {
    return fromNumberLossy(toNumber(a) % toNumber(b))
  }

  export function toInteger(a: UInt32): Int {
    return Int.unsafeFromNumber(toNumber(a))
  }

  export function abs(a: UInt32): UInt32 {
    return fromNumberLossy(Math.abs(toNumber(a)))
  }

  export function fromInt(int: Int): Option<UInt32> {
    return pipe(Int.toNumber(int), option.map(fromNumberLossy))
  }

  export function negate(a: UInt32): UInt32 {
    return a
  }

  export function pow(n: UInt32, exp: UInt32): UInt32 {
    return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
  }

  export function signum(_a: UInt32): UInt32 {
    return one
  }

  export function toInt(a: UInt32): Int {
    return Int.unsafeFromNumber(toNumber(a))
  }

  /**
   * Typeclasses
   */

  const eqUInt32: Eq<UInt32> = {
    equals,
  }

  const ordUInt32: Ord<UInt32> = {
    ...eqUInt32,
    compare,
  }

  const boundedUInt32: Bounded<UInt32> = {
    ...ordUInt32,
    bottom,
    top,
  }

  const enumUInt32 = instanceEnum<UInt32>({
    ...ordUInt32,
    next,
    prev,
  })

  const realUInt32: Real<UInt32> = instanceReal<UInt32>({
    ...ordUInt32,
    toRational,
  })

  const integralUInt32 = instanceIntegral<UInt32>({
    ...realUInt32,
    quot,
    rem,
    toInteger,
  })

  const numericUInt32: Numeric<UInt32> = instanceNumeric({
    ...integralUInt32,
    ...ordUInt32,
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

  const showUInt32: Show<UInt32> = {
    show: (a) => JSON.stringify(toNumber(a)),
  }

  export const typeclasses: Bounded<UInt32> &
    Enum<UInt32> &
    Integral<UInt32> &
    Numeric<UInt32> &
    Show<UInt32> = {
    ...boundedUInt32,
    ...enumUInt32,
    ...integralUInt32,
    ...numericUInt32,
    ...ordUInt32,
    ...realUInt32,
    ...showUInt32,
  }
}

export type UInt32 = UInt32.UInt32
export const uInt32 = UInt32.typeclasses
