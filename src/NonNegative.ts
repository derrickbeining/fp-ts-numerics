/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { option, ord } from 'fp-ts'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

import { HasSub } from './HasSub'
import { HasZero } from './HasZero'
import { negate } from './Ring.Extra'

import Ord = ord.Ord

declare const NON_NEGATIVE: unique symbol

/**
 * The type of values including `zero` and those greater than `zero`
 * @since 1.0.0
 */
export type NonNegative<A> = A & { readonly [NON_NEGATIVE]: typeof NON_NEGATIVE }

/**
 * @since 1.0.0
 */
export function isNonNegative<A>(T: Ord<A> & HasZero<A>) {
  return (a: A): a is NonNegative<A> => ord.geq(T)(a, T.zero)
}

/**
 * @since 1.0.0
 */
export function toNonNegative<A>(
  T: Ord<A> & HasZero<A> & HasSub<A>
): (a: A) => Option<NonNegative<A>> {
  return (a: A) => {
    return isNonNegative<A>(T)(a)
      ? option.some(a)
      : pipe(negate(T)(a), option.fromPredicate(isNonNegative<A>(T)))
  }
}

/**
 * @since 1.0.0
 */
export function arbitraryNonNegative<A>(
  T: Ord<A> & HasZero<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonNegative<A>> {
  return (arb) => arb.filter(isNonNegative(T))
}
