/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { option } from 'fp-ts'
import { Eq } from 'fp-ts/lib/Eq'
import { Option } from 'fp-ts/lib/Option'

import { Semiring } from './Semiring'

declare const NON_ZERO: unique symbol

/**
 * @since 1.0.0
 */
export type NonZero<A> = A & { readonly [NON_ZERO]: typeof NON_ZERO }

/**
 * @since 1.0.0
 */
export function isNonZero<A>(T: Eq<A> & Semiring<A>): <B>(a: A & B) => a is NonZero<A & B> {
  return <B>(a: A): a is NonZero<A & B> => !T.equals(T.zero, a)
}

/**
 * @since 1.0.0
 */
export function nonZero<A>(T: Eq<A> & Semiring<A>) {
  return <B>(a: A & B): Option<A & B & NonZero<A & B>> => {
    return isNonZero(T)(a) ? option.some(a) : option.none
  }
}

/**
 * @since 1.0.0
 */
export function arbitraryNonZero<A>(
  T: Eq<A> & Semiring<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonZero<A>> {
  return (arb) => arb.filter(isNonZero(T))
}
