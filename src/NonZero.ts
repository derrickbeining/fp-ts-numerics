/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { Eq } from 'fp-ts/lib/Eq'

import { HasZero } from './HasZero'

declare const NON_ZERO: unique symbol

/**
 * The type of values not equal to `zero`
 * @since 1.0.0
 */
export type NonZero<A> = A & { readonly [NON_ZERO]: typeof NON_ZERO }

/**
 * @since 1.0.0
 */
export function isNonZero<A>(T: Eq<A> & HasZero<A>): (a: A) => a is NonZero<A> {
  return (a: A): a is NonZero<A> => !T.equals(T.zero, a)
}

/**
 * @since 1.0.0
 */
export function arbitraryNonZero<A>(
  T: Eq<A> & HasZero<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonZero<A>> {
  return (arb) => arb.filter(isNonZero(T))
}
