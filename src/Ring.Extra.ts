/**
 * @since 1.0.0
 */
import { option, ord } from 'fp-ts'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'

import { HasOne } from './HasOne'
import { HasSub } from './HasSub'
import { HasZero } from './HasZero'
import { toNonNegative } from './NonNegative'

/**
 * `negate(x)` can be used as a shorthand for `sub(zero, x)`
 *
 * @since 1.0.0
 */
export function negate<A>(R: HasSub<A> & HasZero<A>): (a: A) => A {
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
export function abs<A>(OR: Ord<A> & HasSub<A> & HasZero<A>): (a: A) => A {
  return (a) =>
    pipe(
      toNonNegative(OR)(a),
      option.getOrElse(() => a)
    )
}

/**
 * The sign function; always evaluates to either `1` or `-1`. For
 * any `x`, we should have `signum(x) * abs(x) == x`
 *
 * @since 1.0.0
 */
export function signum<A>(T: Ord<A> & HasSub<A> & HasZero<A> & HasOne<A>): (a: A) => A {
  return (a) => (ord.lt(T)(a, T.zero) ? negate(T)(T.one) : T.one)
}
