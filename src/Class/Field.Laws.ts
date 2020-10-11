/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Ord } from 'fp-ts/lib/Ord'

import { NonZero } from '../Data/NonZero'
import { getDivisionRingLaws } from './DivisionRing.Laws'
import { getEuclideanRingLaws } from './EuclideanRing.Laws'
import { Field } from './Field'

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
