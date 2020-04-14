import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'

import { Int } from './Int'
import { NonZero } from './NonZero'

const NUMERIC: unique symbol = unsafeCoerce('fp-ts-numerics/NUMERIC')

/**
 * A typeclass providing common operations on numeric types, covering
 * most operations supported by native JS numbers and the built-in global
 * `Math` namespace. It has no laws, per se, because it is intended for types
 * which are unable to satisfy the laws of other mathematical typeclasses, such
 * as JavaScript's built-in `number` type
 *
 * When available, **you should prefer lawful typeclasses over this one**. For
 * lawful mathematical operations, see the following typeclasses:
 *   - {@link Semiring}: zero, one, addition, multiplication
 *   - {@link Ring}: subtraction
 *   - {@link CommutativeRing}: commutative multiplication
 *   - {@link EuclideanRing}: division
 *   - {@link DivisionRing}: reciprocal
 *   - {@link Field}
 *
 * Although not fully lawful, instances of `Numeric` are conventionally expected
 * to follow the laws of the typeclasses listed above insofar as they are
 * able.
 */
export interface Numeric<A> extends Ord<A> {
  /**
   * @internal
   */
  readonly [NUMERIC]: typeof NUMERIC
  /**
   * The absolute value function.
   */
  readonly abs: (a: A) => A
  /**
   * Addition, conventionally expected to satisfy the {@link Semiring} laws
   */
  readonly add: (a: A, b: A) => A
  /**
   * Division, conventionally expected to satisfy the {@link EuclideanRing}
   * laws as far as possible.
   */
  readonly div: (numerator: A, denominator: NonZero<A>) => A
  /**
   * Attempts to convert an {@link Int} to a member of type `A` when
   * able to usefully do so. Lossy operations (i.e. truncation, overflow, etc)
   * is not considered useful here.
   */
  readonly fromInt: (i: Int) => Option<A>
  /**
   * Attempts to convert an JS `number` to a member of type `A` when
   * able to usefully do so. Lossy operations (i.e. rounding) is not
   * considered useful here.
   */
  readonly fromNumber: (a: number) => Option<A>
  /**
   * Attempts to convert a JS `number` to a member of type `A` when
   * able to usefully do so. Lossy operations (i.e. rounding) is not
   * considered useful here.
   */
  readonly mod: (a: A, b: NonZero<A>) => A
  /**
   * Multiplication, conventionally expected to satisfy the {@link SemiringLaws}
   * as far as possible.
   */
  readonly mul: (a: A, b: A) => A
  /**
   * Inverts the sign of its argument, e.g. `negate(1) === -1`.
   */
  readonly negate: (a: A) => A
  /**
   * Inverts the sign of its argument, e.g. `negate(1) === -1`.
   */
  readonly one: A
  readonly pow: (a: A, b: A) => A
  readonly quot: (a: A, b: NonZero<A>) => A
  readonly rem: (a: A, b: NonZero<A>) => A
  readonly signum: (a: A) => A
  readonly sub: (a: A, b: A) => A
  readonly toInt: (a: A) => Int
  readonly toNumber: (a: A) => number
  readonly zero: A
}

type NumericMembers<A> = Omit<Numeric<A>, typeof NUMERIC>

export function instanceNumeric<A>(numeric: NumericMembers<A>): Numeric<A> {
  return {
    [NUMERIC]: NUMERIC,
    ...numeric,
  }
}
