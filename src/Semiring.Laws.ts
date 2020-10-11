/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { Semiring } from './Semiring'

/**
 * @since 1.0.0
 */
export const getSemiringLaws = <A>(
  S: Eq<A> & Semiring<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  addAssociativity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) => {
    const first = S.add(S.add(a, b), c)
    const second = S.add(a, S.add(b, c))
    const result = S.equals(first, second)
    // !result && console.log({ a, b, c, first, second, result })
    return result
  }),

  addIdentity: fc.property(arb, (a) => {
    return [S.add(a, S.zero), S.add(S.zero, a)].every((x) => S.equals(a, x))
  }),

  commutativity: fc.property(fc.tuple(arb, arb), ([a, b]) => {
    return S.equals(S.add(a, b), S.add(b, a))
  }),

  mulAssociativity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) => {
    const first = S.mul(S.mul(a, b), c)
    const second = S.mul(a, S.mul(b, c))
    const result = S.equals(first, second)
    // !result && console.log({ a, b, c, first, second, result })
    return result
  }),

  mulIdentity: fc.property(arb, (a) => {
    return [S.mul(a, S.one), S.mul(S.one, a)].every((x) => S.equals(a, x))
  }),

  leftDistributivity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) => {
    return S.equals(S.mul(a, S.add(b, c)), S.add(S.mul(a, b), S.mul(a, c)))
  }),

  rightDistributivity: fc.property(fc.tuple(arb, arb, arb), ([a, b, c]) => {
    return S.equals(S.mul(S.add(a, b), c), S.add(S.mul(a, c), S.mul(b, c)))
  }),

  annihilation: fc.property(arb, (a) => {
    return [S.mul(a, S.zero), S.mul(S.zero, a)].every((x) => S.equals(S.zero, x))
  }),
})
