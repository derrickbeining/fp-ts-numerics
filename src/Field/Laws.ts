import * as fc from 'fast-check'
import { Ord } from 'fp-ts/lib/Ord'

import { getDivisionRingLaws } from '../DivisionRing/Laws'
import { getEuclideanRingLaws } from '../EuclideanRing/Laws'
import { Field } from '../Field'

export const getFieldLaws = <A>(
  F: Ord<A> & Field<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  ...getDivisionRingLaws(F, arb),
  ...getEuclideanRingLaws(F, arb),
})
