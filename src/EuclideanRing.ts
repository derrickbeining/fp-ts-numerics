/**
 * The `EuclideanRing` class is for commutative rings that support division.
 * The mathematical structure this class is based on is sometimes also called
 * a *Euclidean domain*.
 *
 * See {@link EuclideanRing} for laws and more info
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/v4.1.1/src/Data/EuclideanRing.purs
 *
 * @packageDocumentation
 * @since 1.0.0
 */

import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'

import { CommutativeRing } from './CommutativeRing'
import { Natural } from './Natural'
import { isNonZero, NonZero } from './NonZero'

const EUCLIDEAN_RING: unique symbol = unsafeCoerce('fp-ts-numerics/EUCLIDEAN_RING')

/**
 *
 * Instances must satisfy the following laws in addition to the `Ring`
 * laws:
 *
 * - Integral domain: `one /= zero`, and if `a` and `b` are both nonzero then
 *   so is their product `a * b`
 * - Euclidean function `degree`:
 *   - Nonnegativity: For all nonzero `a`, `degree a >= 0`
 *   - Quotient/remainder: For all `a` and `b`, where `b` is nonzero,
 *     let `q = a / b` and ``r = a `mod` b``; then `a = q*b + r`, and also
 *     either `r = zero` or `degree r < degree b`
 * - Submultiplicative euclidean function:
 *   - For all nonzero `a` and `b`, `degree a <= degree (a * b)`
 *
 * The behaviour of division by `zero` is unconstrained by these laws,
 * meaning that individual instances are free to choose how to behave in this
 * case. Similarly, there are no restrictions on what the result of
 * `degree zero` is; it doesn't make sense to ask for `degree zero` in the
 * same way that it doesn't make sense to divide by `zero`, so again,
 * individual instances may choose how to handle this case.
 *
 * For any `EuclideanRing` which is also a `Field`, one valid choice
 * for `degree` is simply `const 1`. In fact, unless there's a specific
 * reason not to, `Field` types should normally use this definition of
 * `degree`.
 *
 * The `EuclideanRing<Int>` instance is one of the most commonly used
 * `EuclideanRing` instances and deserves a little more discussion. In
 * particular, there are a few different sensible law-abiding implementations
 * to choose from, with slightly different behaviour in the presence of
 * negative dividends or divisors. The most common definitions are "truncating"
 * division, where the result of `a / b` is rounded towards 0, and "Knuthian"
 * or "flooring" division, where the result of `a / b` is rounded towards
 * negative infinity. A slightly less common, but arguably more useful, option
 * is "Euclidean" division, which is defined so as to ensure that ``a `mod` b``
 * is always nonnegative. With Euclidean division, `a / b` rounds towards
 * negative infinity if the divisor is positive, and towards positive infinity
 * if the divisor is negative. Note that all three definitions are identical if
 * we restrict our attention to nonnegative dividends and divisors.
 *
 * The EuclideanRing<Int> instance uses Euclidean division.
 *
 * Additional functions `quot` and `rem` are often supplied for data types
 * if truncating division is desired or if a lawful instance is not possible
 * for a given type (like non-arbitrary precision number types).
 *
 * @since 1.0.0
 */
export interface EuclideanRing<A> extends CommutativeRing<A> {
  /**
   * @internal
   */
  readonly [EUCLIDEAN_RING]: typeof EUCLIDEAN_RING
  /**
   * Euclidean function `degree` is required to obey the following laws:
   *   - Nonnegativity:
   *      - For all nonzero `a`, `degree a >= 0`
   *   - Quotient/remainder:
   *      - For all `a` and `b`, where `b` is nonzero, let `q = div(a,b)` and
   *        `r = mod(a,b)`; then `a = q*b + r`, and also either `r = zero` or
   *        `degree(r) < degree(b)`
   *   - Submultiplicative euclidean function:
   *      - For all nonzero `a` and `b`, `degree(a) <= degree(a * b)
   */
  degree(a: A): Natural
  /**
   * Euclidean division.
   *
   * Given `div(a,b)`, if `b > 0`, result is rounded towards negative infinity. If
   * `b < 0`, result is rounded towards positive infinity.
   */
  div(dividend: A, divisor: NonZero<A>): A
  /**
   * Remainder of Euclidean division.
   *
   * `mod(a,b)` should always be >= 0
   */
  mod(dividend: A, divisor: NonZero<A>): A
}

interface EuclideanRingMembers<A> extends Omit<EuclideanRing<A>, typeof EUCLIDEAN_RING> {}

/**
 * EuclideanRing instance constructor
 *
 * @example
 * export const MyType: EuclideanRing<MyType> = {
 *   ...EuclideanRing.instance({
 *     ...
 *   })
 * }
 *
 * @since 1.0.0
 */
export function instanceEuclideanRing<A>(e: EuclideanRingMembers<A>): EuclideanRing<A> {
  return {
    [EUCLIDEAN_RING]: EUCLIDEAN_RING,
    ...e,
  }
}

/**
 * Calculates the *greatest common divisor* of two values using the Euclidean
 * algorithm.
 *
 * @complexity O(n^2)
 *
 * @since 1.0.0
 */
export function gcd<A>(T: Eq<A> & EuclideanRing<A>): (a: A, b: NonZero<A>) => NonZero<A> {
  return (a, b) => {
    const m = T.mod(a, b)
    return isNonZero(T)(m) ? gcd(T)(b, m) : b
  }
}

/**
 * Calculates the *least common multiple* of two values. It's implemented using
 * {@link gcd} internally. Note that `lcm(0,0)` is `zero` to avoid
 * division-by-zero errors.
 *
 * @since 1.0.0
 */

export function lcm<A>(T: Eq<A> & EuclideanRing<A>): (a: NonZero<A>, b: NonZero<A>) => NonZero<A> {
  const { div, mul } = T
  return (a, b) => unsafeCoerce(div(mul(a, b), gcd(T)(a, b)))
}
