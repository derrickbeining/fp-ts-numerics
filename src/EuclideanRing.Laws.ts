/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { option as O, ord } from 'fp-ts'
import { sequenceT } from 'fp-ts/lib/Apply'
import { tuple } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'

import { EuclideanRing } from './EuclideanRing'
import { Natural } from './Natural'
import { isNonZero } from './NonZero'

/**
 * @since 1.0.0
 */
export const getEuclideanRingLaws = <A>(
  T: Ord<A> & EuclideanRing<A>,
  arbs: fc.Arbitrary<[A, A]>
): Record<string, fc.IProperty<unknown>> => ({
  'Integral domain: one !== zero, and if a and b are both nonzero then so is their product a * b': fc.property(
    arbs,
    ([a, b]) => {
      return T.equals(a, T.zero) || T.equals(b, T.zero) || !T.equals(T.mul(a, b), T.zero)
    }
  ),

  'For all nonzero a, degree a >= 0': fc.property(
    arbs,
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
  'Quotient with Remainder': fc.property(
    arbs
      .map(([a, b]) =>
        pipe(
          b,
          O.fromPredicate(isNonZero(T)),
          O.map((nzb) => tuple(a, nzb))
        )
      )
      .filter(O.isSome)
      .map((x) => x.value),
    ([a, b]) => {
      const q = T.div(a, b)
      const r = T.mod(a, b)
      return (
        T.equals(a, T.add(T.mul(q, b), r)) &&
        (T.equals(r, T.zero) || ord.lt(Natural)(T.degree(r), T.degree(b)))
      )
    }
  ),

  'Submultiplicative: For all nonzero a and b, degree a <= degree (a * b)': fc.property(
    arbs
      .map(([a, b]) =>
        sequenceT(O.option)(
          pipe(a, O.fromPredicate(isNonZero(T))),
          pipe(b, O.fromPredicate(isNonZero(T)))
        )
      )
      .filter(O.isSome)
      .map((x) => x.value),
    ([a, b]) => {
      const degreeA = T.degree(a)
      const degreeAB = T.degree(T.mul(a, b))
      // console.log({ a, b, degreeA, degreeAB })
      return ord.leq(Natural)(degreeA, degreeAB)
    }
  ),
})
