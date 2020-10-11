/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Int } from './Int'

declare const HAS_TO_INT: unique symbol
const brand = unsafeCoerce<{}, { [HAS_TO_INT]: typeof HAS_TO_INT }>({})
/**
 * The class of values which can be converted to Int losslessly
 *
 * @since 1.0.0
 */
export interface HasToInt<A> {
  /**
   * @internal
   */
  readonly [HAS_TO_INT]: typeof HAS_TO_INT
  /**
   * Converts a value to an Int
   *
   * @since 1.0.0
   */
  readonly toInt: (a: A) => Int
}

type Methods<A> = Omit<HasToInt<A>, typeof HAS_TO_INT>

/**
 * Instance constructor for HasToInt typeclass
 *
 * @since 1.0.0
 */
export function instanceHasToInt<A>(members: Methods<A>): HasToInt<A> {
  return {
    ...brand,
    ...members,
  }
}
