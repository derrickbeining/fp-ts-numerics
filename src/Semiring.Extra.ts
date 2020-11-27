/**
 * @since 1.0.0
 */
import { option } from 'fp-ts'
import { Ord } from 'fp-ts/lib/Ord'
import { pipe } from 'fp-ts/lib/pipeable'

import { EuclideanRing } from './EuclideanRing'
import { div, isEven } from './EuclideanRing.Extra'
import { HasToInt } from './HasToInt'
import { NonNegative, toNonNegative } from './NonNegative'
import { isNonZero, NonZero } from './NonZero'
import { isPositive, Positive } from './Positive'
import { Semiring } from './Semiring'

/**
 * Raises a Semiring to a non-negative integral power
 *
 * ```ts
 * expect(pow(UInt32, ))
 * ```
 *
 * @since 1.0.0
 */
export function semiringPow<B, E>(
  B: Semiring<B>,
  E: Ord<E> & EuclideanRing<E> & HasToInt<E>
): (base: B, exponent: NonNegative<E>) => B {
  const two: Positive<E> = pipe(
    E.add(E.one, E.one),
    option.fromPredicate(isPositive(E)),
    (twoOpt) => option.toUndefined(twoOpt)! // <-- nothing case is expected to be impossible
  )

  return (base, exponent) => {
    return isNonZero(E)(exponent) ? toNonZeroPow(base, exponent) : B.one
  }

  // where
  function toNonZeroPow(base: B, exponent: NonNegative<E>): B {
    return isEven(E)(exponent)
      ? toNonZeroPow(B.mul(base, base), div(E)(exponent, two))
      : E.equals(E.one, exponent)
      ? base
      : toOddPowerGtOne(B.mul(base, base), div(E)(exponent, two), base)
  }

  function toOddPowerGtOne(base: B, exponent: NonNegative<E>, multiple: B): B {
    return isEven(E)(exponent)
      ? toOddPowerGtOne(B.mul(base, base), div(E)(exponent, two), multiple)
      : E.equals(E.one, exponent)
      ? B.mul(base, multiple)
      : toOddPowerGtOne(B.mul(base, base), div(E)(exponent, two), B.mul(base, multiple))
  }
}
