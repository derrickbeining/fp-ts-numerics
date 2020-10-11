/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { DivisionRing } from './DivisionRing'
import { NonZero } from './NonZero'

/**
 * @since 1.0.0
 */
export const getDivisionRingLaws = <A>(
  DR: Eq<A> & DivisionRing<A>,
  arb: fc.Arbitrary<NonZero<A>>
): Record<string, fc.IProperty<unknown>> => ({
  'Non-zero ring: one !== zero': fc.property(arb, (_) => !DR.equals(DR.zero, DR.one)),
  'Non-zero multiplicative inverse:': fc.property(arb, (a) => {
    const x = DR.mul(DR.recip(a), a)
    const y = DR.mul(a, DR.recip(a))

    const result = DR.equals(DR.one, x) && DR.equals(DR.one, y)
    !result && console.log({ a, x, y })
    return result
  }),
})
