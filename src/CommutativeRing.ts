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
export interface CommutativeRing<A> extends Ring<A> {}
