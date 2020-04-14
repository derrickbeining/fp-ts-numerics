import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { Ring } from '../Ring'
import { getSemiringLaws } from '../Semiring/Laws'

export const getRingLaws = <A>(
  R: Eq<A> & Ring<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  ...getSemiringLaws(R, arb),

  additiveInverse: fc.property(arb, (a) =>
    [R.add(R.sub(R.zero, a), a), R.zero].every((x) => R.equals(R.sub(a, a), x))
  ),
})
