/**
 * @since 1.0.0
 */
import * as fc from 'fast-check'

import { Natural } from './Natural'

/**
 *  `fast-check` Arbitrary instance
 *
 * @since 1.0.0
 */
export const arbitraryNatural: fc.Arbitrary<Natural> = fc
  .maxSafeInteger()
  .filter((n) => n >= 0)
  .map((n) => Natural.unsafeFromNumber(n))
