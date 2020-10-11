/**
 * @since 1.0.0
 */
import { ord } from 'fp-ts'
import { Ord } from 'fp-ts/lib/Ord'

import { NonNegative, nonNegative } from '../Data/NonNegative'
import { Ring } from './Ring'

/**
 * `negate x` can be used as a shorthand for `zero - x`
 *
 * @since 1.0.0
 */
export function negate<A>(R: Ring<A>): (a: A) => A {
  return (a) => R.sub(R.zero, a)
}

/**
 *
 * The absolute value function, defined as...
 *
 * ```ts
 * if (x < zero) return negate(x)
 * else return x
 * ```
 *
 * @since 1.0.0
 */
export function abs<A>(OR: Ord<A> & Ring<A>): (a: A) => NonNegative<A> {
  return (a) => nonNegative(OR)(a)
}

/**
 * The sign function; always evaluates to either `1` or `-1`. For
 * any `x`, we should have `signum(x) * abs(x) == x`
 *
 * @since 1.0.0
 */
export function signum<A>(T: Ord<A> & Ring<A>): (a: A) => A {
  return (a) => (ord.lt(T)(a, T.zero) ? negate(T)(T.one) : T.one)
}
