/**
 * @since 1.0.0
 */

/**
 * The class of values which support exponentiation
 *
 * @since 1.0.0
 */
export interface HasPow<A> {
  /**
   * Exponentiates a value
   *
   * ```ts
   * import { Int } from 'fp-ts'
   *
   * const actual = Int.pow(Int(3), Int(3))
   * const expected = Int(2,7)
   *
   * expect(actual).toBe(expected)
   *
   * ```
   */
  readonly pow: (n: A, exponent: A) => A
}

/**
 * Pipeable version of [[HasPow.pow]]. Exponentiates a value.
 *
 * ```ts
 * import { Int } from 'fp-ts'
 *
 * const actual = pipe(Int(3), toPowOf(Int)(3))
 * const expected = Int(2,7)
 *
 * expect(actual).toBe(expected)
 *
 * ```
 *
 * @since 1.0.0
 */
export function toPowOf<A>(T: HasPow<A>): (exponent: A) => (n: A) => A {
  return (exponent) => (n) => T.pow(n, exponent)
}
