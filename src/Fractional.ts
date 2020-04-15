/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { DivisionRing } from './DivisionRing'
import { Rational } from './Rational'
import { Real } from './Real'

const FRACTIONAL: unique symbol = unsafeCoerce('fp-ts-numerics/FRACTIONAL')
/**
 * The Fractional class represents fractional numbers supporting real division.
 *
 * @since 1.0.0
 */
export interface Fractional<A> extends Real<A>, DivisionRing<A> {
  /**
   * @internal
   */
  readonly [FRACTIONAL]: typeof FRACTIONAL
  readonly fromRational: (r: Rational) => A
}

interface FractionalMembers<A> extends Omit<Fractional<A>, typeof FRACTIONAL> {}

/**
 * Fractional instance constructor
 *
 * @example
 * export const MyType: Fractional<MyType> = {
 *   ...instanceFractional({...})
 * }
 *
 * @since 1.0.0
 */
export function instanceFractional<A>(e: FractionalMembers<A>): Fractional<A> {
  return {
    [FRACTIONAL]: FRACTIONAL,
    ...e,
  }
}

/** A helper function for general conversion between Fractional values. */
export function fromFractional<A, B>(fa: Fractional<A>, fb: Fractional<B>): (a: A) => B {
  return (a) => fb.fromRational(fa.toRational(a))
}
