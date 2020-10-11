/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Rational } from './Rational'

declare const HAS_TO_RATIONAL: unique symbol
const brand = unsafeCoerce<{}, { readonly [HAS_TO_RATIONAL]: typeof HAS_TO_RATIONAL }>({})

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
   * @internal
   */
  readonly [HAS_TO_RATIONAL]: typeof HAS_TO_RATIONAL
  /**
   * The rational equivalent of its real argument with full precision
   */
  toRational(a: A): Rational
}

interface Methods<A> extends Omit<HasToRational<A>, typeof HAS_TO_RATIONAL> {}

/**
 * Instance constructor for the HasToRational typeclass
 *
 * @since 1.0.0
 */
export function instanceHasToRational<A>(e: Methods<A>): HasToRational<A> {
  return {
    ...brand,
    ...e,
  }
}
