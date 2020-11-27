/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { option, ord } from 'fp-ts'
import { pipe } from 'fp-ts/lib/pipeable'

import { HasSub } from './HasSub'
import { HasZero } from './HasZero'
import { NonNegative } from './NonNegative'
import { NonZero } from './NonZero'

import Option = option.Option
import Ord = ord.Ord

/**
 * The type of values greater than `zero`
 * @since 1.0.0
 */
export type Positive<A> = A & NonNegative<A> & NonZero<A>

/**
 * @since 1.0.0
 */
export function isPositive<A>(T: Ord<A> & HasZero<A>) {
  return (a: A): a is Positive<A> => ord.gt(T)(a, T.zero)
}

/**
 * Either validates that a value is positive or attempts to flip its sign
 * to positive by subtracting it from `zero`. Since flipping the sign of some
 * numbers can cause overflow/wrapping back to negative, we can't always
 * produce a positive number, hence the `Option`.
 * @since 1.0.0
 */
export function toPositive<A>(T: Ord<A> & HasZero<A> & HasSub<A>): (a: A) => Option<Positive<A>> {
  return (a: A) => {
    return isPositive(T)(a)
      ? option.some(a)
      : pipe(T.sub(T.zero, a), option.fromPredicate(isPositive(T)))
  }
}

/**
 * @since 1.0.0
 */
export function arbitraryPositive<A>(
  T: Ord<A> & HasZero<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<Positive<A>> {
  return (arb) => arb.filter(isPositive(T))
}
