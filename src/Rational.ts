/**
 * @since 1.0.0
 */
import { Int } from './Int'
import { Ratio } from './Ratio'

/**
 * Arbitrary-precision rational numbers, represented as a ratio of two Integer
 * values. A rational number may be constructed using the `of` constructor.
 *
 * @since 1.0.0
 */
export type Rational = Ratio<Int>
