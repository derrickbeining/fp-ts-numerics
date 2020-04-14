/**
 * The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
 * is commutative.
 *
 * See {@link CommutativeRing} for laws.
 *
 * @packageDocumentation
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Ring } from './Ring'

const COMMUTATIVE_RING: unique symbol = unsafeCoerce('fp-ts-numerics/COMMUTATIVE_RING')

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
 * @example
 *
 * ```ts
 * export const commutativeRingMyType =
 *   instanceCommutativeRing(ringMyType)
 * ```
 * @since 1.0.0
 */
export function instanceCommutativeRing<A>(ring: Ring<A>): CommutativeRing<A> {
  return {
    [COMMUTATIVE_RING]: COMMUTATIVE_RING,
    ...ring,
  }
}
