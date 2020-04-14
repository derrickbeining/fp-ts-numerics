import { unsafeCoerce } from 'fp-ts/lib/function'

import { Int } from './Int'
import { NonZero } from './NonZero'
import { Real } from './Real'

const INTEGRAL: unique symbol = unsafeCoerce('fp-ts-numerics/INTEGRAL')

/**
 *
 */
export interface Integral<A> extends Real<A> {
  /**
   * @internal
   */
  readonly [INTEGRAL]: typeof INTEGRAL
  /** Converts a value to Int */
  readonly toInteger: (a: A) => Int
  /**
   * Truncating integer division rounding toward zero
   */
  readonly quot: (dividend: A, divisor: NonZero<A>) => A
  /**
   * Remainder of truncating integer division. Always takes the sign of the
   * dividend.
   */
  readonly rem: (dividend: A, divisor: NonZero<A>) => A
}

interface IntegralMembers<A> extends Omit<Integral<A>, typeof INTEGRAL> {}

/**
 * Intregral instance constructor
 *
 * @example
 * export const MyType: Integral<MyType> = {
 *   ...instanceIntegral({...})
 * }
 *
 * @since 1.0.0
 */
export function instanceIntegral<A>(e: IntegralMembers<A>): Integral<A> {
  return {
    [INTEGRAL]: INTEGRAL,
    ...e,
  }
}
