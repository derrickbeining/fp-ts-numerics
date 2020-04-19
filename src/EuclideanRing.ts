/**
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/v4.1.1/src/Data/EuclideanRing.purs
 *
 * The `EuclideanRing` typeclass is for [[CommutativeRing]]s that support division.
 * The mathematical structure this typeclass is based on is sometimes also called
 * a *Euclidean domain*.
 *
 * ## Laws
 * Instances must satisfy the following laws in addition to the
 * [[CommutativeRing]] laws:
 *
 * - **Integral domain**
 *   - `!equals(one, zero)`, and if `a` and `b` are both non-zero then so is
 *     their product `a * b`
 *
 * - **Euclidean function `degree`**:
 *   - *Nonnegativity*:
 *     - For all non-zero `a`, `degree(a) >= 0`
 *   - *Quotient and remainder*:
 *       - For all `a` and `b`, where `b` is non-zero,
 *       - if `q === a / b` and `r === mod(a, b)`
 *       - then `a === q * b + r`,
 *       - and either `r === zero` or `degree(r) < degree(b)`
 *
 * - **Submultiplicative euclidean function**:
 *   - For all non-zero `a` and `b`, `degree(a) <= degree(a * b)`
 *
 * ## Implementing `degree`
 *
 * For any `EuclideanRing` which is also a [[Field]], one valid choice
 * for `degree` is simply `() => 1`. In fact, unless there's a specific
 * reason not to, [[Field]] types should normally use this definition of
 * `degree`.
 *
 * ## Types of division and lawfulness
 * There are a few different sensible law-abiding implementations
 * to choose from, with slightly different behavior in the presence of
 * negative dividends or divisors. The most common definitions are
 *
 * - Truncating division
 *   - `a / b` is rounded towards 0.
 * - Flooring division
 *   - `a / b` is rounded towards negative infinity.
 * - Euclidean division:
 *   - `a / b` rounds towards negative infinity if the divisor is positive, and
 *     towards positive infinity if the divisor is negative.
 *   - The benefit this provides is that `mod(a, b)` is always non-negative.
 *
 * Note that all three definitions are identical if we restrict our attention
 * to non-negative dividends and divisors.
 *
 * The `EuclideanRing` instances provided by `fp-ts-numerics` use
 * Euclidean division. The `div`/`mod` functions that exist for numbers which
 * do not have a `EuclideanRing` instance also use Euclidean division. It would
 * be good follow this pattern as a convention.
 *
 *
 * If truncating division is desired, `fp-ts-numerics` also provides `quot` and
 * `rem` functions for that purpose. These can be found on instances of
 * [[Integral]] as well.
 *
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
 * The `EuclideanRing` typeclass is for [[CommutativeRing]]s that support division.
 * The mathematical structure this typeclass is based on is sometimes also called
 * a *Euclidean domain*.
 *
 * See [["EuclideanRing"]] module docs for more info
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
   *      - For all non-zero `a`, `degree(a) >= 0`
   *   - Quotient/remainder:
   *      - For all `a` and `b`, where `b` is non-zero, let `q = div(a,b)` and
   *        `r = mod(a,b)`; then `a = q*b + r`, and also either `r = zero` or
   *        `degree(r) < degree(b)`
   *   - Submultiplicative euclidean function:
   *      - For all non-zero `a` and `b`, `degree(a) <= degree(a * b)
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
 * ```ts
const euclideanRingMyType: EuclideanRing<MyType> =
 *   instanceEuclideanRing({...})
 * ```
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
 * {@link gcd} internally.
 *
 * @since 1.0.0
 */

export function lcm<A>(T: Eq<A> & EuclideanRing<A>): (a: NonZero<A>, b: NonZero<A>) => NonZero<A> {
  const { div, mul } = T
  return (a, b) => unsafeCoerce(div(mul(a, b), gcd(T)(a, b)))
}
