/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'

import { Int32 } from './Int32'

declare const _Cardinality_: unique symbol

/** The size of the set of values inhabiting a type.
 *
 * @since 1.0.0
 */
export type Cardinality<A> = { readonly [_Cardinality_]: unique symbol }

/**
 * @since 1.0.0
 */
const fromInt32 = <A>(a: Int32): Cardinality<A> => unsafeCoerce(a)

/**
 * @since 1.0.0
 */
const toInt32 = <A>(c: Cardinality<A>): Int32 => unsafeCoerce(c)
/**
 * Constructs a `Cardinality<A>`
 *
 * Without type inference, you'll need to supply the type annotation:
 *
 * @since 1.0.0
 */
const of = <A>(n: Int32): Cardinality<A> => fromInt32(n)

/**
 * @since 1.0.0
 */
export const Cardinality = {
  fromInt32,
  toInt32,
  of,
}
