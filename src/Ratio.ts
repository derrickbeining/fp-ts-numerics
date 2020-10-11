/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'

import { EuclideanRing } from './EuclideanRing'
import { gcd } from './EuclideanRing.Extra'
import { HasToRational } from './HasToRational'
import { NonZero } from './NonZero'
import { abs, signum } from './Ring.Extra'

declare const RATIO: unique symbol

/**
 * Rational numbers, with numerator and denominator of some Integral type.
 *
 * @since 1.0.0
 */
export interface Ratio<A>
  extends Readonly<{ readonly [RATIO]: { numerator: A; denominator: A } }> {}

const _fromRatio = <A>(r: Ratio<A>): { numerator: A; denominator: A } => {
  return unsafeCoerce(r)
}

const _toRatio = <A>(r: { numerator: A; denominator: A }): Ratio<A> => unsafeCoerce(r)

/**
 * @since 1.0.0
 */
export const Ratio = {
  of: <A>(T: Ord<A> & HasToRational<A> & EuclideanRing<A>) => (n: A, d: NonZero<A>): Ratio<A> => {
    const g = gcd(T)(n, d)
    const _d = T.div(d, g)

    return _toRatio({
      numerator: T.mul(T.div(n, g), signum(T)(_d)),
      denominator: abs(T)(_d),
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
