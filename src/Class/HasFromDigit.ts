/**
 * The class of types which can be constructed by `fromDigit`
 *
 * ```ts
 * import { Int, NonNegative, NonZero } from 'fp-ts-numerics'
 *
 * const myInt: NonNegative<Int> = Int.fromDigit(0)
 * const myInt: NonZero<NonNegative<Int>> = Int.fromDigit(8)
 * ```
 *
 * @packageDocumentation
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Digit } from '../Data/Digit'
import { NonNegative } from '../Data/NonNegative'
import { NonZero } from '../Data/NonZero'

declare const HAS_FROM_DIGIT: unique symbol
const hasFromDigitBrand = unsafeCoerce<{}, { [HAS_FROM_DIGIT]: typeof HAS_FROM_DIGIT }>({})

/**
 * @since 1.0.0
 */
export interface HasFromDigit<A> {
  /** @internal */
  [HAS_FROM_DIGIT]: typeof HAS_FROM_DIGIT
  fromDigit<D extends Digit>(digit: D): D extends 0 ? NonNegative<A> : NonZero<NonNegative<A>>
}

type Methods<A> = Omit<HasFromDigit<A>, typeof HAS_FROM_DIGIT>

/**
 * @since 1.0.0
 */
export function instanceHasFromDigit<A>(members: Methods<A>): HasFromDigit<A> {
  return {
    ...hasFromDigitBrand,
    ...members,
  }
}
