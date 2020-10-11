/**
 * @since 1.0.0
 */
import { Int } from '../Data/Int'
import { Ratio } from '../Data/Ratio'

/**
 * Arbitrary-precision rational numbers, represented as a ratio of two Integer
 * values. A rational number may be constructed using the `of` constructor.
 *
 * @since 1.0.0
 */
export type Rational = Ratio<Int>
