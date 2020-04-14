import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Show } from 'fp-ts/lib/Show'

import * as Enum from './Enum.Internal'
import { Int } from './Int'
import { instanceIntegral, Integral } from './Integral'
import { NonZero } from './NonZero'
import { instanceNumeric, Numeric } from './Numeric'
import { Ratio } from './Ratio'
import { instanceReal } from './Real'

export function getModule<T>(N: { name: string; bottom: T; top: T; fromNumber: (n: number) => T }) {
  // ## Functions

  // ## Guards
  function isTypeOf(x: unknown): x is T {
    return (
      typeof x === 'number' &&
      Number.isInteger(x) &&
      x <= toNumber(GInt.top) &&
      x >= toNumber(GInt.bottom)
    )
  }

  // ### Transformations

  function unsafeFromNumber(n: number): T {
    if (!isTypeOf(n)) {
      throw new Error(
        `${n} cannot be coerced to ${N.name} since it is not an integer within the bounds of ${GInt.bottom} and ${GInt.top}`
      )
    }
    return unsafeCoerce(n)
  }

  function fromNumber(n: number): option.Option<T> {
    return isTypeOf(n) ? option.some(n) : option.none
  }

  function toNumber(i: T): number {
    return unsafeCoerce(i)
  }

  // ## Math Operations

  const one: T = unsafeCoerce(1)
  const zero: T = unsafeCoerce(0)

  function add(a: T, b: T): T {
    const res = toNumber(a) + toNumber(b)
    return N.fromNumber(res)
  }

  function mul(a: T, b: T): T {
    const res = toNumber(a) * toNumber(b)
    return N.fromNumber(res)
  }

  function sub(a: T, b: T): T {
    const res = toNumber(a) - toNumber(b)
    return N.fromNumber(res)
  }

  function div(n: T, d: NonZero<T>): T {
    const _n = toNumber(n)
    const _d = toNumber(d)
    return _n < 0 ? unsafeFromNumber(Math.ceil(_n / _d)) : unsafeFromNumber(Math.floor(_n / _d))
  }

  function mod(n: T, d: NonZero<T>): T {
    const _n = toNumber(n)
    const _d = Math.abs(toNumber(d))
    return unsafeFromNumber(((_n % _d) + _d) % _d)
  }

  /**
   * ## Typeclasses
   */
  const ordGInt = ord.contramap((b: T) => toNumber(b))(ord.ordNumber)

  // const numGInt = Num.def<T>({
  //   ...ordGInt,
  //   abs: (a) => N.fromNumber(Math.abs(toNumber(a))),
  //   fromInteger: (i) => N.fromNumber(Int.toNumberLossy(i)),
  //   signum: (a) => N.fromNumber(ordGInt.compare(a, N.fromNumber(0))),
  // })

  const boundedGInt: Bounded<T> = {
    ...ordGInt,
    bottom: N.bottom,
    top: N.top,
  }

  const enumGInt = Enum.instanceEnum<T>({
    ...ordGInt,
    next: (a) => (ord.geq(GInt)(a, boundedGInt.top) ? option.none : option.some(add(a, one))),
    prev: (a) => (ord.leq(GInt)(a, boundedGInt.bottom) ? option.none : option.some(sub(a, one))),
  })

  const realGInt = instanceReal({
    ...ordGInt,
    toRational: (a) => Ratio.of(Int)(GInt.toInteger(a), Int.of(1)),
  })

  const integralGInt = instanceIntegral<T>({
    ...realGInt,
    quot(a: T, b: NonZero<T>): T {
      const q = toNumber(a) / toNumber(b)
      return q < 0
        ? N.fromNumber(Math.ceil(q))
        : q > 0
        ? N.fromNumber(Math.floor(q))
        : N.fromNumber(q)
    },
    rem(a: T, b: NonZero<T>): T {
      return N.fromNumber(toNumber(a) % toNumber(b))
    },
    toInteger(a: T): Int {
      return Int.unsafeFromNumber(toNumber(a))
    },
  })

  const showGInt: Show<T> = {
    show: (a) => JSON.stringify(toNumber(a)),
  }

  const numericGInt: Numeric<T> = instanceNumeric({
    ...integralGInt,
    ...ordGInt,
    abs: (a) => unsafeFromNumber(Math.abs(toNumber(a))),
    add,
    div,
    fromInt: (int) => pipe(Int.toNumber(int), option.map(unsafeFromNumber)),
    fromNumber,
    mod,
    mul,
    negate: (a) => N.fromNumber(toNumber(a) * -1),
    one,
    pow: (n, exp) => unsafeFromNumber(Math.pow(toNumber(n), toNumber(exp))),
    signum: (a) => (toNumber(a) < 0 ? N.fromNumber(-1) : one),
    sub,
    toInt: (a) => Int.unsafeFromNumber(toNumber(a)),
    toNumber,
    zero,
  })

  const GInt: Bounded<T> & Enum.Enum<T> & Integral<T> & Numeric<T> & Show<T> = {
    ...boundedGInt,
    ...enumGInt,
    ...integralGInt,
    ...numericGInt,
    ...ordGInt,
    ...realGInt,
    ...showGInt,
  }

  const utils = {
    fromNumber,
    unsafeFromNumber,
    isTypeOf,
    toNumber,
    // Semiring-ish
    add,
    mul,
    one,
    zero,
    // Ring-ish
    sub,
  }

  return {
    ...GInt,
    ...utils,
  } as typeof GInt & typeof utils
}
