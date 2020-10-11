/**
 *
 * See {@link DivisionRing} for details
 *
 * @packageDocumentation
 *
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { NonZero } from './NonZero'
import { Ring } from './Ring'

declare const DIVISION_RING: unique symbol
const brand = unsafeCoerce<{}, { readonly [DIVISION_RING]: typeof DIVISION_RING }>({})

/**
 * The `DivisionRing` class is for non-zero rings in which every non-zero
 * element has a multiplicative inverse. Division rings are sometimes also
 * called *skew fields*.
 *
 * Instances must satisfy the following laws in addition to the {@link Ring}
 * laws:
 *
 * - Non-zero ring: `one /= zero`
 * - Non-zero multiplicative inverse: `recip a * a = a * recip a = one` for
 *   all non-zero `a`
 *
 * The result of `recip zero` is left undefined; individual instances may
 * choose how to handle this case.
 *
 * If a type has both `DivisionRing` and {@link CommutativeRing} instances, then
 * it is a field and should have a `Field` instance.
 *
 * @since 1.0.0
 */
export interface DivisionRing<A> extends Ring<A> {
  /**
   * @internal
   */
  readonly [DIVISION_RING]: typeof DIVISION_RING
  readonly recip: (a: NonZero<A>) => A
}

/**
 * @since 1.0.0
 */
interface Methods<A> extends Omit<DivisionRing<A>, typeof DIVISION_RING> {}

/**
 * DivisionRing instance constructor
 *
 * @example
 * import { instanceDivisionRing } from 'fp-ts-numerics/DivisionRing'
 * import { ringNumber } from 'fp-ts-numerics/number'
 *
 * const divisionRingMyType = instanceDivisionRing<number>({
 *   ...ringNumber,
 *   recip: (a) => 1 / a
 * })
 *
 * @since 1.0.0
 */
export function instanceDivisionRing<A>(dr: Methods<A>): DivisionRing<A> {
  return {
    ...brand,
    ...dr,
  }
}
