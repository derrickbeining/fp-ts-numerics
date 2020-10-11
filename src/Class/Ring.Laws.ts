/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { Ring } from './Ring'

/**
 * @since 1.0.0
 */
export const getRingLaws = <A>(
  R: Eq<A> & Ring<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  additiveInverse: fc.property(arb, (a) =>
    [R.add(R.sub(R.zero, a), a), R.zero].every((x) => R.equals(R.sub(a, a), x))
  ),
})
