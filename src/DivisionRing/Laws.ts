import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { DivisionRing } from '../DivisionRing'

export const getDivisionRingLaws = <A>(
  DR: Eq<A> & DivisionRing<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  'Non-zero ring: one !== zero': fc.property(
    arb,
    (_) => !DR.equals(DR.zero, DR.one)
  ),
  'Non-zero multiplicative inverse:': fc.property(
    arb,
    (a) =>
      DR.equals(a, DR.zero) ||
      Array.of(DR.mul(DR.recip(a), a), DR.mul(a, DR.recip(a))).every((x) =>
        DR.equals(DR.one, x)
      )
  ),
})
