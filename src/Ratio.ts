import { unsafeCoerce } from 'fp-ts/lib/function'

import { EuclideanRing, gcd } from './EuclideanRing'
import { NonZero } from './NonZero'
import { Real } from './Real'
import { abs, signum } from './Ring'

declare const RATIO: unique symbol

/**
 * Rational numbers, with numerator and denominator of some Integral type.
 */
export interface Ratio<A>
  extends Readonly<{ readonly [RATIO]: { numerator: A; denominator: A } }> {}

const _fromRatio = <A>(r: Ratio<A>): { numerator: A; denominator: A } => {
  return unsafeCoerce(r)
}

const _toRatio = <A>(r: { numerator: A; denominator: A }): Ratio<A> => unsafeCoerce(r)

export const Ratio = {
  of: <A>(i: Real<A> & EuclideanRing<A>) => (n: A, d: NonZero<A>): Ratio<A> => {
    const g = gcd(i)(n, d)
    const _d = i.div(d, g)

    return _toRatio({
      numerator: i.mul(i.div(n, g), signum(i)(_d)),
      denominator: abs(i)(_d),
    })
  },

  isTypeOf: <A>(innerGuard: (x: unknown) => x is A) => (y: unknown): y is Ratio<A> => {
    return (
      typeof y === 'object' &&
      y !== null &&
      innerGuard((y as any).numerator) &&
      innerGuard((y as any).denominator)
    )
  },

  numerator: <A>(r: Ratio<A>): A => _fromRatio(r).numerator,

  denominator: <A>(r: Ratio<A>): A => _fromRatio(r).denominator,
}
