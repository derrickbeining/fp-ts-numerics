import * as fc from 'fast-check'

import { Int } from '../Int'

/**
 *  `fast-check` Arbitrary instance
 *
 * @since 1.0.0
 */
export const arbitraryInt: fc.Arbitrary<Int> = fc
  .maxSafeInteger()
  .map((n) => Int.unsafeFromNumber(n))
