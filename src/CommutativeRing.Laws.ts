/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { CommutativeRing } from './CommutativeRing'

/**
 * Derive fast-check property tests for your CommutativeRing instances
 * @since 1.0.0
 */
export const getCommutativeRingLaws = <A>(
  CR: Eq<A> & CommutativeRing<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  'Commutative multiplication: `a * b = b * a`': fc.property(fc.tuple(arb, arb), ([a, b]) =>
    CR.equals(CR.mul(a, b), CR.mul(b, a))
  ),
})
