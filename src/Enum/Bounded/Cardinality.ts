import { unsafeCoerce } from 'fp-ts/lib/function'

import { Int32 } from '../../Int32'

declare const _Cardinality_: unique symbol

/** The size of the set of values inhabiting a type.
 *
 * @example
 * const cardiBool: Cardinality<boolean> = Cardinality.of(2)
 *
 */
export type Cardinality<A> = { readonly [_Cardinality_]: unique symbol }
const fromInt32 = <A>(a: Int32): Cardinality<A> => unsafeCoerce(a)
const toInt32 = <A>(c: Cardinality<A>): Int32 => unsafeCoerce(c)
/**
 * Constructs a `Cardinality<A>`
 *
 * Without type inference, you'll need to supply the type annotation:
 *
 * @example
 * const cardiBool = Cardinality.of<boolean>(2)
 */
const of = <A>(n: Int32): Cardinality<A> => fromInt32(n)

export const Cardinality = {
  fromInt32,
  toInt32,
  of,
}
