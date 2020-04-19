import * as fc from 'fast-check'
import { ord } from 'fp-ts'
import { Ord } from 'fp-ts/lib/Ord'

import { EuclideanRing } from '../EuclideanRing'
import { Natural } from '../Natural'
import { getArbitraryNonZero } from '../NonZero'
import { getRingLaws } from '../Ring/Laws'

export const getEuclideanRingLaws = <A>(
  T: Ord<A> & EuclideanRing<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  ...getRingLaws(T, arb),

  'Integral domain: one !== zero, and if a and b are both nonzero then so is their product a * b': fc.property(
    fc.tuple(arb, arb),
    ([a, b]) => T.equals(a, T.zero) || T.equals(b, T.zero) || !T.equals(T.mul(a, b), T.zero)
  ),

  'For all nonzero a, degree a >= 0': fc.property(
    fc.tuple(arb, arb),
    ([a, b]) =>
      T.equals(a, T.zero) || T.equals(b, T.zero) || ord.geq(Natural)(T.degree(a), Natural.zero)
  ),

  /**
   * For all a and b,
   * where b is nonzero,
   *    let q = a / b
   *    and r = a `mod` b;
   *    then a = q*b + r,
   *    and also either r = zero
   *        or degree r < degree b
   */
  'Quotient and Remainder': fc.property(fc.tuple(arb, getArbitraryNonZero(T)(arb)), ([a, b]) => {
    const q = T.div(a, b)
    const r = T.mod(a, b)
    return (
      T.equals(a, T.add(T.mul(q, b), r)) &&
      (T.equals(r, T.zero) || ord.lt(Natural)(T.degree(r), T.degree(b)))
    )
  }),

  'Submultiplicative: For all nonzero a and b, degree a <= degree (a * b)': fc.property(
    fc.tuple(arb, arb),
    ([a, b]) => T.equals(a, T.zero) || T.equals(b, T.zero) || T.degree(a) <= T.degree(T.mul(a, b))
  ),
})
