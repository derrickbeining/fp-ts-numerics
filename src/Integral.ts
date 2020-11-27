/**
 * @since 1.0.0
 */

import { HasToInt } from './HasToInt'
import { HasToRational } from './HasToRational'
import { NonZero } from './NonZero'

/**
 * Integral numbers supporting truncating integer division
 *
 * @since 1.0.0
 */
export interface Integral<A> extends HasToRational<A>, HasToInt<A> {
  /**
   * Truncating integer division rounding toward zero
   */
  readonly quot: (dividend: A, divisor: NonZero<A>) => A
  /**
   * Remainder of truncating integer division. Always takes the sign of the
   * dividend.
   */
  readonly rem: (dividend: A, divisor: NonZero<A>) => A
}

/**
 * General conversion between Integral values
 *
 * @since 1.0.0
 */
// export function fromIntegral<A, B>(A: Integral<A>, B: Integral<B>): (a: A) => B {
//   return (a) => A.toInt(a)
// }
