/**
 * @since 1.0.0
 */
import { option } from 'fp-ts'
import { Eq } from 'fp-ts/lib/Eq'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'

import { DivisionRing } from './DivisionRing'
import { EuclideanRing } from './EuclideanRing'
import { HasToInt } from './HasToInt'
import { isNonNegative, nonNegative } from './NonNegative'
import { NonZero, nonZero } from './NonZero'
import { semiringPow } from './Semiring.Extra'

/**
 * Left division, defined as `divL(a, b) = recip(b * a)`. Left and right
 * division are distinct in this module because a `DivisionRing` is not
 * necessarily commutative.
 *
 * If the type `a` is also a `EuclideanRing`, then this function is
 * equivalent to `div` from the `EuclideanRing` class. When working
 * abstractly, `div` should generally be preferred, unless you know that you
 * need your code to work with noncommutative rings.
 * @since 1.0.0
 */
export function divL<A>(DR: DivisionRing<A>): (a1: A, a2: NonZero<A>) => A {
  return (a1, a2) => DR.mul(DR.recip(a2), a1)
}

/**
 * Right division, defined as `rightDiv a b = a * recip b`. Left and right
 * division are distinct in this module because a `DivisionRing` is not
 * necessarily commutative.
 *
 * If the type `a` is also a `EuclideanRing`, then this function is
 * equivalent to `div` from the `EuclideanRing` class. When working
 * abstractly, `div` should generally be preferred, unless you know that you
 * need your code to work with noncommutative rings.
 * @since 1.0.0
 */
export function divR<A>(DR: DivisionRing<A>): (a1: A, a2: NonZero<A>) => A {
  return (a1, a2) => DR.mul(a1, DR.recip(a2))
}

/**
 * Raises a floating-point base to an integral power
 *
 * ```ts
 * import { number, Int32 } from 'fp-ts-numerics'
 *
 * expect(divisionRingPow(number, Int32)(2.5, Int32.of(-3)))
 *   .toBe(0.064)
 * ```
 *
 * @since 1.0.0
 */
export function divisionRingPow<B, E>(
  B: Eq<B> & DivisionRing<B>,
  E: Ord<E> & EuclideanRing<E> & HasToInt<E>
): (base: B, exponent: E) => B {
  return (base, exponent) => {
    return isNonNegative(E)(exponent)
      ? semiringPow(B, E)(base, exponent)
      : pipe(
          semiringPow(B, E)(base, nonNegative(E)(exponent)),
          nonZero(B),
          option.fold(
            () => B.zero, // <-- this case is expected to be impossible
            (nzB) => B.recip(nzB)
          )
        )
  }
}
