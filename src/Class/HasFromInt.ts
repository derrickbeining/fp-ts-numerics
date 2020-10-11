/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Int } from '../Data/Int'

declare const HAS_FROM_INT: unique symbol
const hasFromIntBrand = unsafeCoerce<{}, { [HAS_FROM_INT]: typeof HAS_FROM_INT }>({})
/**
 * The class of values mapped to an [[Int]]
 *
 * @since 1.0.0
 */
export interface HasFromInt<A> {
  /**
   * @internal
   */
  readonly [HAS_FROM_INT]: typeof HAS_FROM_INT
  /**
   * Maps an Int to a value
   *
   * @since 1.0.0
   */
  readonly fromInt: (int: Int) => A
}

type Methods<A> = Omit<HasFromInt<A>, typeof HAS_FROM_INT>

/**
 * Instance constructor for HasFromInt typeclass
 *
 * @since 1.0.0
 */
export function instanceHasFromInt<A>(members: Methods<A>): HasFromInt<A> {
  return {
    ...hasFromIntBrand,
    ...members,
  }
}
