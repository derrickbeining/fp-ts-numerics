/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'

import { Rational } from './Rational'

declare const HAS_FROM_RATIONAL: unique symbol
const brand = unsafeCoerce<{}, { readonly [HAS_FROM_RATIONAL]: typeof HAS_FROM_RATIONAL }>({})

/**
 * The dual of [[HasToRational]]. Should satisfy
 *
 * ```ts
 * fromRational(toRational(a)) = a
 * ```
 *
 * @since 1.0.0
 */
export interface HasFromRational<A> extends Ord<A> {
  /**
   * @internal
   */
  readonly [HAS_FROM_RATIONAL]: typeof HAS_FROM_RATIONAL
  /**
   * @since 1.0.0
   */
  fromRational(r: Rational): A
}

interface Methods<A> extends Omit<HasFromRational<A>, typeof HAS_FROM_RATIONAL> {}

/**
 * Instance constructor for the HasFromRational typeclass
 *
 * @since 1.0.0
 */
export function instanceHasFromRational<A>(e: Methods<A>): HasFromRational<A> {
  return {
    ...brand,
    ...e,
  }
}
