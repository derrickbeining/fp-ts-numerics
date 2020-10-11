/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

declare const HAS_POW: unique symbol
const hasPowBrand = unsafeCoerce<{}, { [HAS_POW]: typeof HAS_POW }>({})
/**
 * The class of values which support exponentiation
 *
 * @since 1.0.0
 */
export interface HasPow<A> {
  /**
   * @internal
   */
  readonly [HAS_POW]: typeof HAS_POW
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

type Methods<A> = Omit<HasPow<A>, typeof HAS_POW>

/**
 * Instance constructor for HasPow typeclass
 *
 * @since 1.0.0
 */
export function instanceHasPow<A>(hasPow: Methods<A>): HasPow<A> {
  return {
    ...hasPowBrand,
    ...hasPow,
  }
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
