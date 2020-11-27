/**
 * @since 1.0.0
 */

import { Int } from './Int'

/**
 * The class of values mapped to an [[Int]]
 *
 * @since 1.0.0
 */
export interface HasFromInt<A> {
  /**
   * Maps an Int to a value
   *
   * @since 1.0.0
   */
  readonly fromInt: (int: Int) => A
}
