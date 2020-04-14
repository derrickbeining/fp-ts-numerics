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
import { UInt32 } from './UInt32'

declare const u_int_16: unique symbol

export namespace UInt16 {
  export interface UInt16
    extends Readonly<Int32 & UInt32 & { readonly [u_int_16]: unique symbol }> {}
  type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  type LeadingDigit = Exclude<Digit, 0>

  type Digits =
    | [0]
    | [LeadingDigit]
    | [LeadingDigit, Digit]
    | [LeadingDigit, Digit, Digit]
    | [LeadingDigit, Digit, Digit, Digit]
    | [0 | 1 | 2 | 3 | 4 | 5, Digit, Digit, Digit, Digit]
    | [6, 0 | 1 | 2 | 3 | 4, Digit, Digit, Digit]
    | [6, 5, 0 | 1 | 2 | 3 | 4, Digit, Digit]
    | [6, 5, 5, 0 | 1 | 2, Digit]
    | [6, 5, 5, 3, 0 | 1 | 2 | 3 | 4 | 5]

  /** Constructs an UInt16 from digits */
  export function of(zero: 0): UInt16
  export function of(...digits: Digits): NonZero<UInt16>
  export function of(...digits: Digits): UInt16 | NonZero<UInt16> {
    return pipe(
      digits
        .filter((x): x is Digits[number] => Number.isInteger(x))
        .map((j) => j.toString())
        .join(''),
      (str) => unsafeCoerce(+str & 65535)
    )
  }

  export function isTypeOf(x: unknown): x is UInt16 {
    return (
      typeof x === 'number' &&
      Number.isInteger(x) &&
      x <= toNumber(boundedUInt16.top) &&
      x >= toNumber(boundedUInt16.bottom)
    )
  }

  export function unsafeFromNumber(n: number): UInt16 {
    if (!isTypeOf(n)) {
      throw new Error(
        `${n} cannot be coerced to UInt16 since it is not an integer within the bounds of ${boundedUInt16.bottom} and ${boundedUInt16.top}`
      )
    }
    return unsafeCoerce(n)
  }

  export function fromNumberLossy(n: number): UInt16 {
    return unsafeCoerce(n & 65535)
  }

  // ### Transformations

  export function fromNumber(n: number): option.Option<UInt16> {
    return isTypeOf(n) ? option.some(n) : option.none
  }

  export function toNumber(i: UInt16): number {
    return unsafeCoerce(i)
  }

  // ## Math Operations

  export const one: UInt16 = of(1)
  export const zero: UInt16 = of(0)

  export function add(a: UInt16, b: UInt16): UInt16 {
    const res = toNumber(a) + toNumber(b)
    return fromNumberLossy(res)
  }

  export function mul(a: UInt16, b: UInt16): UInt16 {
    const res = toNumber(a) * toNumber(b)
    return fromNumberLossy(res)
  }

  export function sub(a: UInt16, b: UInt16): UInt16 {
    const res = toNumber(a) - toNumber(b)
    return fromNumberLossy(res)
  }

  export function div(n: UInt16, d: NonZero<UInt16>): UInt16 {
    const _n = toNumber(n)
    const _d = toNumber(d)
    return _n < 0 ? fromNumberLossy(Math.ceil(_n / _d)) : fromNumberLossy(Math.floor(_n / _d))
  }

  export function mod(n: UInt16, d: NonZero<UInt16>): UInt16 {
    const _n = toNumber(n)
    const _d = Math.abs(toNumber(d))
    return fromNumberLossy(((_n % _d) + _d) % _d)
  }

  export function equals(a: UInt16, b: UInt16): boolean {
    return a === b
  }

  export function compare(a: UInt16, b: UInt16): -1 | 0 | 1 {
    return ordNumber.compare(toNumber(a), toNumber(b))
  }

  export const bottom = of(0)
  export const top: UInt16 = unsafeCoerce<number, UInt16>((Math.pow(2, 16) - 1) & 65535)

  export function next(a: UInt16): Option<UInt16> {
    return ord.geq(ordUInt16)(a, boundedUInt16.top) ? option.none : option.some(add(a, one))
  }

  export function prev(a: UInt16): Option<UInt16> {
    return ord.leq(ordUInt16)(a, boundedUInt16.bottom) ? option.none : option.some(sub(a, one))
  }

  export function toRational(a: UInt16): Rational {
    return Ratio.of(Int)(integralUInt16.toInteger(a), Int.of(1))
  }

  export function quot(a: UInt16, b: NonZero<UInt16>): UInt16 {
    const q = toNumber(a) / toNumber(b)
    return q < 0
      ? fromNumberLossy(Math.ceil(q))
      : q > 0
      ? fromNumberLossy(Math.floor(q))
      : fromNumberLossy(q)
  }

  export function rem(a: UInt16, b: NonZero<UInt16>): UInt16 {
    return fromNumberLossy(toNumber(a) % toNumber(b))
  }

  export function toInteger(a: UInt16): Int {
    return Int.unsafeFromNumber(toNumber(a))
  }

  export function abs(a: UInt16): UInt16 {
    return fromNumberLossy(Math.abs(toNumber(a)))
  }

  export function fromInt(int: Int): Option<UInt16> {
    return pipe(Int.toNumber(int), option.map(fromNumberLossy))
  }

  export function negate(a: UInt16): UInt16 {
    return a
  }

  export function pow(n: UInt16, exp: UInt16): UInt16 {
    return fromNumberLossy(Math.pow(toNumber(n), toNumber(exp)))
  }

  export function signum(_a: UInt16): UInt16 {
    return one
  }

  export function toInt(a: UInt16): Int {
    return Int.unsafeFromNumber(toNumber(a))
  }

  /**
   * Typeclasses
   */

  const eqUInt16: Eq<UInt16> = {
    equals,
  }

  const ordUInt16: Ord<UInt16> = {
    ...eqUInt16,
    compare,
  }

  const boundedUInt16: Bounded<UInt16> = {
    ...ordUInt16,
    bottom,
    top,
  }

  const enumUInt16 = instanceEnum<UInt16>({
    ...ordUInt16,
    next,
    prev,
  })

  const realUInt16: Real<UInt16> = instanceReal<UInt16>({
    ...ordUInt16,
    toRational,
  })

  const integralUInt16 = instanceIntegral<UInt16>({
    ...realUInt16,
    quot,
    rem,
    toInteger,
  })

  const numericUInt16: Numeric<UInt16> = instanceNumeric({
    ...integralUInt16,
    ...ordUInt16,
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

  const showUInt16: Show<UInt16> = {
    show: (a) => JSON.stringify(toNumber(a)),
  }

  export const typeclasses: Bounded<UInt16> &
    Enum<UInt16> &
    Integral<UInt16> &
    Numeric<UInt16> &
    Show<UInt16> = {
    ...boundedUInt16,
    ...enumUInt16,
    ...integralUInt16,
    ...numericUInt16,
    ...ordUInt16,
    ...realUInt16,
    ...showUInt16,
  }
}

export type UInt16 = UInt16.UInt16
export const uInt16 = UInt16.typeclasses
