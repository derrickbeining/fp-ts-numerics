/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { DivisionRing } from './DivisionRing'
import { EuclideanRing } from './EuclideanRing'

const FIELD: unique symbol = unsafeCoerce('fp-ts-numerics/FIELD')
/**
 * The `Field` class is for types that are (commutative) fields.
 *
 *  Mathematically, a field is a ring which is commutative and in which every
 *  nonzero element has a multiplicative inverse; these conditions correspond
 *  to the {@link CommutativeRing} and {@link DivisionRing} classes in `fp-ts-numerics`
 *  respectively. However, the `Field` class has {@link EuclideanRing} and
 *  {@link DivisionRing} as superclasses, which seems like a stronger requirement
 *  (since {@link CommutativeRing} is a superclass of {@link EuclideanRing}). In fact, it
 *  is not stronger, since any type which has law-abiding {@link CommutativeRing}
 *  and {@link DivisionRing} instances permits exactly one law-abiding
 *  {@link EuclideanRing} instance. We use a {@link EuclideanRing} superclass here in
 *  order to ensure that a `Field` constraint on a function permits you to use
 *  {@link EuclideanRing.div} on that type, since {@link EuclideanRing.div} is a member of {@link EuclideanRing}.
 *
 *  This class has no laws or members of its own; it exists as a convenience,
 *  so a single constraint can be used when field-like behaviour is expected.
 *
 * @since 1.0.0
 */
export interface Field<A> extends EuclideanRing<A>, DivisionRing<A> {
  /**
   * @internal
   */
  readonly [FIELD]: typeof FIELD
}

interface FieldMethods<A> extends Omit<Field<A>, typeof FIELD> {}

/**
 * Field instance constructor
 *
 * @since 1.0.0
 */
export function instanceField<A>(e: FieldMethods<A>): Field<A> {
  return {
    [FIELD]: FIELD,
    ...e,
  }
}
