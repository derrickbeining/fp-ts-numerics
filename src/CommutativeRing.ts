/**
 * The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
 * is commutative.
 *
 * See {@link CommutativeRing} for laws.
 *
 * @packageDocumentation
 * @since 1.0.0
 */

import { Ring } from './Ring'

const COMMUTATIVE_RING: unique symbol = Symbol('fp-ts-numerics/CommutativeRing')

/**
 * The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
 * is commutative.
 *
 * It has no members of its own, but instances must satisfy the following law
 * in addition to the {@link Ring} laws:
 *
 *   - Commutative multiplication: `a * b = b * a`
 *
 * @since 1.0.0
 */
export interface CommutativeRing<A> extends Ring<A> {
  /**
   * @internal
   */
  readonly [COMMUTATIVE_RING]: typeof COMMUTATIVE_RING
}

/**
 * CommutativeRing instance constructor
 *
 * @since 1.0.0
 *
 * @example
 * import { instanceSemiring } from 'fp-ts-numerics/Semiring'
 * import { instanceRing } from 'fp-ts-numerics/Ring'
 * import { instanceCommutativeRing } from 'fp-ts-numerics/CommutativeRing'
 *
 * const semiringNumber = instanceSemiring<number>({
 *   add: (x, y) => x + y,
 *   mul: (x, y) => x * y,
 *   one: 1,
 *   zero: 0,
 * })
 *
 * const ringNumber = instanceRing<number>({
 *   ...semiringNumber,
 *   sub: (x, y) => x - y
 * })
 *
 * const commutativeRingMyType = instanceCommutativeRing<number>(ringNumber)
 *
 */
export function instanceCommutativeRing<A>(ring: Ring<A>): CommutativeRing<A> {
  return {
    [COMMUTATIVE_RING]: COMMUTATIVE_RING,
    ...ring,
  }
}
