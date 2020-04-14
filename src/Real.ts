import { unsafeCoerce } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'

import { Rational } from './Rational'

const REAL: unique symbol = unsafeCoerce('fp-ts-numerics/REAL')

/**
 * Typeclass for real numbers
 */
export interface Real<A> extends Ord<A> {
  /**
   * @internal
   */
  readonly [REAL]: typeof REAL
  /**
   * The rational equivalent of its real argument with full precision
   */
  toRational(a: A): Rational
}

interface RealMembers<A> extends Omit<Real<A>, typeof REAL> {}

/**
 * Real instance constructor
 *
 * @example
 * export const MyType: Real<MyType> = {
 *   ...instanceReal({...})
 * }
 *
 * @since 1.0.0
 */
export function instanceReal<A>(e: RealMembers<A>): Real<A> {
  return {
    [REAL]: REAL,
    ...e,
  }
}
