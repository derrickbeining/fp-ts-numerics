import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { Semiring } from '../Semiring'

export const getSemiringLaws = <A>(
  S: Eq<A> & Semiring<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  addAssociativity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) =>
    S.equals(S.add(S.add(a, b), c), S.add(a, S.add(b, c)))
  ),

  addIdentity: fc.property(arb, (a) =>
    [S.add(a, S.zero), S.add(S.zero, a)].every((x) => S.equals(a, x))
  ),

  commutativity: fc.property(fc.tuple(arb, arb), ([a, b]) => S.equals(S.add(a, b), S.add(b, a))),

  mulAssociativity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) =>
    S.equals(S.mul(S.mul(a, b), c), S.mul(a, S.mul(b, c)))
  ),

  mulIdentity: fc.property(arb, (a) =>
    [S.mul(a, S.one), S.mul(S.one, a)].every((x) => S.equals(a, x))
  ),

  leftDistributivity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) =>
    S.equals(S.mul(a, S.add(b, c)), S.add(S.mul(a, b), S.mul(a, c)))
  ),

  rightDistributivity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) =>
    S.equals(S.mul(S.add(a, b), c), S.add(S.mul(a, c), S.mul(b, c)))
  ),

  annihilation: fc.property(arb, (a) =>
    [S.mul(a, S.zero), S.mul(S.zero, a)].every((x) => S.equals(S.zero, x))
  ),
})
