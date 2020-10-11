/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { HasToInt } from './HasToInt'
import { HasToRational } from './HasToRational'
import { NonZero } from './NonZero'

declare const INTEGRAL: unique symbol
const integralBrand = unsafeCoerce<{}, { readonly [INTEGRAL]: typeof INTEGRAL }>({})

/**
 * Integral numbers supporting truncating integer division
 *
 * @since 1.0.0
 */
export interface Integral<A> extends HasToRational<A>, HasToInt<A> {
  /**
   * @internal
   */
  readonly [INTEGRAL]: typeof INTEGRAL
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

interface Methods<A> extends Omit<Integral<A>, typeof INTEGRAL> {}

/**
 * Integral instance constructor
 *
 * ```ts
 * export const MyType: Integral<MyType> = {
 *   ...instanceIntegral({...})
 * }
 * ```
 * @category Typeclass Instance Constructor
 * @since 1.0.0
 */
export function instanceIntegral<A>(e: Methods<A>): Integral<A> {
  return {
    ...integralBrand,
    ...e,
  }
}

/**
 * General conversion between Integral values
 *
 * @since 1.0.0
 */
// export function fromIntegral<A, B>(A: Integral<A>, B: Integral<B>): (a: A) => B {
//   return (a) => A.toInt(a)
// }
