/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'
import { option } from 'fp-ts'

import { Int } from './Int'

/**
 *  `fast-check` Arbitrary instance
 *
 * @since 1.0.0
 */
export const arbitraryInt: fc.Arbitrary<Int> = fc
  .bigInt()
  .map((n) => Int.fromString(n.toString()))
  .filter(option.isSome)
  .map((n) => n.value)
