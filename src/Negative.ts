/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { ord } from 'fp-ts'
import { Ord } from 'fp-ts/lib/Ord'

import { HasSub } from './HasSub'
import { HasZero } from './HasZero'
import { Semiring } from './Semiring'

declare const NEGATIVE: unique symbol

/**
 * The type of values less than `zero`
 * @since 1.0.0
 */
export type Negative<A> = A & { readonly [NEGATIVE]: typeof NEGATIVE }

/**
 * @since 1.0.0
 */
export function isNegative<A>(T: Ord<A> & HasZero<A>) {
  return (a: A): a is Negative<A> => ord.lt(T)(a, T.zero)
}

/**
 * @since 1.0.0
 */
export function toNegative<A>(T: Ord<A> & HasZero<A> & HasSub<A>): (a: A) => Negative<A> {
  return (a: A) => {
    return isNegative(T)(a) ? a : (T.sub(T.zero, a) as Negative<A>)
  }
}

/**
 * @since 1.0.0
 */
export function arbitraryNegative<A>(
  T: Ord<A> & Semiring<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<Negative<A>> {
  return (arb) => arb.filter(isNegative(T))
}
