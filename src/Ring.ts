/**
 * The `Ring` class is for types that support addition, multiplication, and
 * subtraction operations. See {@link Ring} docs for more info.
 *
 * Adapted from https://github.com/purescript/purescript-prelude/blob/mast./Ring.purs
 *
 * @packageDocumentation
 *
 * @since 1.0.0
 */
import { HasSub } from './HasSub'
import { getFunctionSemiring, Semiring } from './Semiring'

export * from './Semiring'

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
export interface Ring<A> extends Semiring<A>, HasSub<A> {}

/**
 * @since 1.0.0
 */
export function negate<A>(R: Ring<A>): (n: A) => A {
  return (n) => R.sub(R.zero, n)
}

/**
 * ## Instance Derivation Combinators
 */

/**
 * @since 1.0.0
 */
export function getFunctionRing<A, B>(R: Ring<B>): Ring<(a: A) => B> {
  return {
    ...getFunctionSemiring(R),
    sub: (f, g) => (x) => R.sub(f(x), g(x)),
  }
}

/**
 * Given a tuple of `Ring`s returns a `Ring` for the tuple
 *
 * @example
 * import { getTupleRing } from 'fp-ts-numerics/Ring'
 * import { Float64 } from 'fp-ts-numerics/Float64'
 *
 * const R = getTupleRing(Float64.Field, Float64.Field, Float64.Field)
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
  const semiring = {
    add: (x: any, y: any) => rings.map((S, i) => S.add(x[i], y[i])),
    zero: rings.map((S) => S.zero),
    mul: (x: any, y: any) => rings.map((S, i) => S.mul(x[i], y[i])),
    one: rings.map((S) => S.one),
  }

  return {
    ...semiring,
    sub: (x: any, y: any) => rings.map((R, i) => R.sub(x[i], y[i])),
  } as any
}
