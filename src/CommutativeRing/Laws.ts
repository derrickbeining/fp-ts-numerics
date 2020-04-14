import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { CommutativeRing } from '../CommutativeRing'
import { getRingLaws } from '../Ring/Laws'

export const getCommutativeRingLaws = <A>(
  CR: Eq<A> & CommutativeRing<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  ...getRingLaws(CR, arb),
  'Commutative multiplication: `a * b = b * a`': fc.property(
    fc.tuple(arb, arb),
    ([a, b]) => CR.equals(CR.mul(a, b), CR.mul(b, a))
  ),
})
