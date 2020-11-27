/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Int } from './Int'

/**
 * The class of values which can be converted to Int losslessly
 *
 * @since 1.0.0
 */
export interface HasToInt<A> {
  /**
   * Converts a value to an Int
   *
   * @since 1.0.0
   */
  readonly toInt: (a: A) => Int
}
