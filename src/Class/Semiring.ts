/**
 * The `Semiring` class is for types that support an addition and multiplication operation.
 *
 * Instances must satisfy the following laws:
 *
 * - Commutative monoid under addition:
 *   - Associativity: `(a + b) + c = a + (b + c)`
 *   - Identity: `zero + a = a + zero = a`
 *   - Commutative: `a + b = b + a`
 * - Monoid under multiplication:
 *   - Associativity: `(a * b) * c = a * (b * c)`
 *   - Identity: `one * a = a * one = a`
 * - Multiplication distributes over addition:
 *   - Left distributivity: `a * (b + c) = (a * b) + (a * c)`
 *   - Right distributivity: `(a + b) * c = (a * c) + (b * c)`
 * - Annihilation: `zero * a = a * zero = zero`
 *
 * **Note:** The `number` type is not fully law abiding members of this class hierarchy due to the potential
 * for arithmetic overflows, and the presence of `NaN` and `Infinity` values. The behaviour is
 * unspecified in these cases.
 *
 * @since 1.0.0
 */

import { unsafeCoerce } from 'fp-ts/lib/function'

const SEMIRING: unique symbol = unsafeCoerce('fp-ts-numerics/SEMIRING')
/**
 * @since 1.0.0
 */
export interface Semiring<A> {
  /**
   * @internal
   */
  readonly [SEMIRING]: typeof SEMIRING
  /**
   * @since 1.0.0
   */
  add(x: A, y: A): A
  /**
   * @since 1.0.0
   */
  mul(x: A, y: A): A
  /**
   * @since 1.0.0
   */
  readonly one: A
  /**
   * @since 1.0.0
   */
  readonly zero: A
}

interface Methods<A> extends Omit<Semiring<A>, typeof SEMIRING> {}

/**
 * Semiring instance constructor
 *
 * ```ts
 * const semiringMyTupe: Semiring<MyType> =
 *   instanceSemiring({
 *       add: (x, y) => ...,
 *       zero: ...,
 *       mul: (x, y) => ...,
 *       one: ...,
 *   })
 *```

 * @since 1.0.0
 */
export function instanceSemiring<A>(semiring: Methods<A>): Semiring<A> {
  return {
    [SEMIRING]: SEMIRING,
    ...semiring,
  }
}

/**
 * @since 1.0.0
 */
export function getFunctionSemiring<A, B>(S: Methods<B>): Semiring<(a: A) => B> {
  return instanceSemiring<(a: A) => B>({
    add: (f, g) => (x) => S.add(f(x), g(x)),
    zero: () => S.zero,
    mul: (f, g) => (x) => S.mul(f(x), g(x)),
    one: () => S.one,
  })
}
