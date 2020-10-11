/**
 * @since 1.0.0
 */
import { DivisionRing } from './DivisionRing'
import { HasToRational } from './HasToRational'
import { Rational } from './Rational'

declare const FRACTIONAL: unique symbol

/**
 * The Fractional class represents fractional numbers supporting real division.
 *
 * @since 1.0.0
 */
export interface Fractional<A> extends HasToRational<A>, DivisionRing<A> {
  /**
   * @internal
   */
  readonly [FRACTIONAL]: typeof FRACTIONAL
  readonly fromRational: (r: Rational) => A
}

interface FractionalMethods<A> extends Omit<Fractional<A>, typeof FRACTIONAL> {}

/**
 * Fractional instance constructor
 *
 * @since 1.0.0
 */
export function instanceFractional<A>(e: FractionalMethods<A>): Fractional<A> {
  return {
    [FRACTIONAL]: FRACTIONAL,
    ...e,
  }
}

/**
 * A helper function for general conversion between Fractional values.
 *
 * @since 1.0.0
 */
export function fromFractional<A, B>(fa: Fractional<A>, fb: Fractional<B>): (a: A) => B {
  return (a) => fb.fromRational(fa.toRational(a))
}
