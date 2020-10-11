/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'

import { Ring } from './Ring'
import { Semiring } from './Semiring'

declare const NON_NEGATIVE: unique symbol

/**
 * @since 1.0.0
 */
export type NonNegative<A> = A & { readonly [NON_NEGATIVE]: typeof NON_NEGATIVE }

/**
 * @since 1.0.0
 */
export function isNonNegative<A>(T: Ord<A> & Semiring<A>) {
  return <A2>(a: A & A2): a is NonNegative<A & A2> => ord.geq(T)(a, T.zero)
}

/**
 * @since 1.0.0
 */
export function nonNegative<A>(T: Ord<A> & Ring<A> & Bounded<A>): <A2>(a: A & A2) => Option<NonNegative<A & A2>> //prettier-ignore
export function nonNegative<A>(T: Ord<A> & Ring<A>): <A2>(a: A & A2) => NonNegative<A & A2>
export function nonNegative<A>(
  T: Ord<A> & Semiring<A>
): <A2>(a: A & A2) => Option<NonNegative<A & A2>>
export function nonNegative<A>(
  T: (Ord<A> & Ring<A> & Bounded<A>) | (Ord<A> & Ring<A>) | (Ord<A> & Semiring<A>)
): <A2>(a: A & A2) => Option<NonNegative<A & A2>> | (A & A2) {
  return <A2>(a: A) => {
    const U = T
    return 'bottom' in U && 'top' in U && ord.geq(U)(a, U.zero) // Bounded Ring
      ? option.some(unsafeCoerce<A, NonNegative<A & A2>>(a))
      : 'sub' in T // Unbounded Ring
      ? unsafeCoerce<A, NonNegative<A & A2>>(ord.geq(T)(a, T.zero) ? a : T.sub(T.zero, a))
      : ord.geq(T)(a, T.zero) // Semiring
      ? option.some(unsafeCoerce<A, NonNegative<A & A2>>(a))
      : option.none
  }
}

/**
 * @since 1.0.0
 */
export function arbitraryNonNegative<A>(
  T: Ord<A> & Semiring<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonNegative<A>> {
  return (arb) => arb.filter(isNonNegative(T))
}
