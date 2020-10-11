/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Ord } from 'fp-ts/lib/Ord'

import { getDivisionRingLaws } from './DivisionRing.Laws'
import { getEuclideanRingLaws } from './EuclideanRing.Laws'
import { Field } from './Field'
import { NonZero } from './NonZero'

/**
 * @since 1.0.0
 */
export const getFieldLaws = <A>(
  F: Ord<A> & Field<A>,
  arb: fc.Arbitrary<NonZero<A>>
): Record<string, fc.IProperty<unknown>> => ({
  ...getDivisionRingLaws(F, arb),
  ...getEuclideanRingLaws(F, fc.tuple(arb, arb)),
})
