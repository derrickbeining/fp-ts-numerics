/**
 * Test
 *
 * @since 1.0.0
 */
import * as fc from 'fast-check'

import { Float } from './Float'

/**
 *  `Arbitrary<Float>` from `fast-check`
 *
 * @since 1.0.0
 */
export const arbitraryFloat: fc.Arbitrary<Float> = fc
  .float(-1, 1)
  .map((n) => Float.unsafeFromNumber(Math.fround(n)))
