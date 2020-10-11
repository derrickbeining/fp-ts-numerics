/**
 * The `Ring` class is for types that support addition, multiplication, and
 * subtraction operations. See {@link Ring} docs for more info.
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/master/Data/Ring.purs
 *
 * @packageDocumentation
 *
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { getFunctionSemiring, instanceSemiring, Semiring } from './Semiring'

export * from './Semiring'

const RING: unique symbol = unsafeCoerce('fp-ts-numerics/RING')

/**
 * The `Ring` class is for types that support addition, multiplication, and
 * subtraction operations.
 *
 * Instances must satisfy the following law in addition to the {@link Semiring}
 * laws:
 *
 * - Additive inverse: `a - a = (zero - a) + a = zero`
 *
 * @since 1.0.0
 */
export interface Ring<A> extends Semiring<A> {
  /**
   * @internal
   */
  readonly [RING]: typeof RING
  sub: (x: A, y: A) => A
}

interface RingMethods<A> extends Omit<Ring<A>, typeof RING> {}

/**
 * Ring instance constructor
 *
 * ```ts
 * export const ringMyType = instanceRing<MyType>({
 *   ...semiringMyType,
 *   sub: (a, b) => ...
 * })
 * ```
 *
 * @since 1.0.0
 */
export function instanceRing<A>(ring: RingMethods<A>): Ring<A> {
  return {
    [RING]: RING,
    ...ring,
  }
}

/**
 * ## Instance Derivation Combinators
 */

/**
 * @since 1.0.0
 */
export function getFunctionRing<A, B>(R: Ring<B>): Ring<(a: A) => B> {
  return instanceRing({
    ...getFunctionSemiring(R),
    sub: (f, g) => (x) => R.sub(f(x), g(x)),
  })
}

/**
 * Given a tuple of `Ring`s returns a `Ring` for the tuple
 *
 * @example
 * import { getTupleRing } from 'fp-ts-numerics/Class/Ring'
 * import { fieldNumber } from 'fp-ts-numerics/Data/number'
 *
 * const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
 * assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
 * assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
 * assert.deepStrictEqual(R.one, [1, 1, 1])
 * assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
 * assert.deepStrictEqual(R.zero, [0, 0, 0])
 *
 * @since 1.0.0
 */
export function getTupleRing<T extends ReadonlyArray<Ring<any>>>(
  ...rings: T
): Ring<{ [K in keyof T]: T[K] extends Ring<infer A> ? A : never }> {
  const semiring = instanceSemiring({
    add: (x: any, y: any) => rings.map((S, i) => S.add(x[i], y[i])),
    zero: rings.map((S) => S.zero),
    mul: (x: any, y: any) => rings.map((S, i) => S.mul(x[i], y[i])),
    one: rings.map((S) => S.one),
  })

  return instanceRing({
    ...semiring,
    sub: (x: any, y: any) => rings.map((R, i) => R.sub(x[i], y[i])),
  }) as any
}
