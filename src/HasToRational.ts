/**
 * @since 1.0.0
 */

import { Rational } from './Rational'

/**
 * This class allows lossless conversion from any representation of a rational
 * to the fixed [[Rational]] type. Lossless means don't do any rounding. For
 * rounding see Algebra.RealRing. With the instances for Float and Double we
 * acknowledge that these types actually represent rationals rather than
 * (approximated) real numbers.
 *
 * @since 1.0.0
 */
export interface HasToRational<A> {
  /**
   * The rational equivalent of its real argument with full precision
   */
  toRational(a: A): Rational
}
