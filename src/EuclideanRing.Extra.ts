/**
 * @since 1.0.0
 */
import { option, ord } from 'fp-ts'
import { Eq } from 'fp-ts/lib/Eq'
import { constFalse } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'

import { EuclideanRing } from './EuclideanRing'
import { NonNegative, nonNegative } from './NonNegative'
import { isNonZero, NonZero, nonZero } from './NonZero'

/**
 * @since 1.0.0
 */
export function div<A>(E: EuclideanRing<A>) {
  function _smartDiv<A2>(
    dvd: NonNegative<A & A2>,
    dvr: NonNegative<NonZero<A & A2>>
  ): NonNegative<A & A2>
  function _smartDiv(dvd: A, dvr: NonZero<A>): A {
    return E.div(dvd, dvr)
  }

  return _smartDiv
}

/**
 * Calculates the *greatest common divisor* of two values using the Euclidean
 * algorithm. The result is always non-negative.
 *
 * This function is overloaded such that, when `a` or `b` is `NonZero<A>`, the
 * result of `gcd(a, b)` is `NonNegative<NonZero<A>>`, otherwise it is just
 * `NonZero<A>`.
 *
 * @complexity O(n^2)
 * @since 1.0.0
 */
export function gcd<A>(T: Ord<A> & EuclideanRing<A>) {
  /**
   * Calculates the *greatest common divisor*. Since `b` is known to be
   * `NonZero`, the result is guaranteed to be `NonNegative<NonZero<A>>`.
   */
  function _gcd(a: A, b: NonZero<A>): NonNegative<NonZero<A>>
  /**
   * Calculates the *greatest common divisor*. Since `a` is known to be
   * `NonZero`, the result is guaranteed to be `NonNegative<NonZero<A>>`.
   */
  function _gcd(a: NonZero<A>, b: A): NonNegative<NonZero<A>>
  /**
   * Calculates the *greatest common divisor*. The result is always
   * non-negative.
   */
  function _gcd(a: A, b: A): NonNegative<A>
  function _gcd(a: A, b: A): NonNegative<A> {
    return isNonZero(T)(b) ? _gcd(b, T.mod(a, b)) : nonNegative(T)(a)
  }

  return _gcd
}

/**
 * Calculates the *least common multiple* of two values. The result is always
 * non-negative. It's implemented using {@link gcd} internally.
 *
 * This function is overloaded such that, when `a` or `b` is `NonZero<A>`, the
 * result of `lcm(a, b)` is `NonNegative<NonZero<A>>`, otherwise it is just
 * `NonZero<A>`.
 *
 * @complexity O(n^2)
 * @since 1.0.0
 */
export function lcm<A>(T: Ord<A> & EuclideanRing<A>): (a: A, b: A) => NonNegative<A> {
  const { div, mul, zero } = T
  /**
   * Calculates the *least common multiple*. Since `a` and `b` are known to be
   * `NonZero`, the result is guaranteed to be `NonNegative<NonZero<A>>`.
   */
  function _lcm(a: NonZero<A>, b: NonZero<A>): NonNegative<NonZero<A>>
  function _lcm(a: A, b: A): NonNegative<A>
  function _lcm(a: A, b: A): NonNegative<A> {
    if (!isNonZero(T)(a)) return nonNegative(T)(zero)
    if (!isNonZero(T)(b)) return nonNegative(T)(zero)
    const GCD = gcd(T)(a, b)

    return pipe(
      // divide the larger by gcd before multiplying to avoid excessively large
      // numbers that might occur in multiply a * b
      ord.gt(T)(a, b) ? mul(div(a, GCD), b) : T.mul(div(b, GCD), a),
      nonNegative(T)
    )
  }
  return _lcm
}
/**
 * @since 1.0.0
 */
export function isEven<A>(E: Eq<A> & EuclideanRing<A>): (a: A) => boolean {
  return (a) => {
    return pipe(
      nonZero(E)(E.add(E.one, E.one)),
      option.fold(constFalse, (two) => E.equals(E.zero, E.mod(a, two)))
    )
  }
}
/**
 * @since 1.0.0
 */
export function isOdd<A>(E: Eq<A> & EuclideanRing<A>): (a: A) => boolean {
  return (a) => !isEven(E)(a)
}
