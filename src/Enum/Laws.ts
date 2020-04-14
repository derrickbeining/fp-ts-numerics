import * as fc from 'fast-check'
import { option, ord } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'

import { Enum } from '../Enum'

export const getEnumLaws = <A>(
  E: Enum<A>,
  arb: fc.Arbitrary<A>
): Record<string, fc.IProperty<unknown>> => ({
  // each successor should be greater than its predecessor
  'next is greater than previous': fc.property(arb, (a) =>
    pipe(
      E.next(a),
      option.map((b) => ord.gt(E)(b, a)),
      option.getOrElse<boolean>(() => true)
    )
  ),
  // each predecessor should be less than its successor
  'previous is less than next': fc.property(arb, (a) =>
    pipe(
      E.prev(a),
      option.map((b) => ord.lt(E)(b, a)),
      option.getOrElse<boolean>(() => true)
    )
  ),
  // next retracts prev
  'next retracts prev': fc.property(arb, (a) =>
    pipe(
      E.prev(a),
      option.chain(E.next),
      option.map((b) => E.equals(a, b)),
      option.getOrElse<boolean>(() => true)
    )
  ),
  // prev retracts next
  'prev retracts next': fc.property(arb, (a) =>
    pipe(
      E.next(a),
      option.chain(E.prev),
      option.map((b) => E.equals(a, b)),
      option.getOrElse<boolean>(() => true)
    )
  ),
  // non-skipping next; TODO: is there a way to test these?

  // non-skipping prev
})
