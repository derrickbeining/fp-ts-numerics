import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'

const ENUM: unique symbol = unsafeCoerce('fp-ts-numerics/ENUM')

/**
 * Typeclass for types which can be enumerated
 *
 * Adapted from https://github.com/purescript/purescript-enums/blob/master/src/Data/Enum.purs
 *
 * Laws:
 *
 *  1. Successor: `all (a < _) (next a)`
 *  2. Predecessor: `all (_ < a) (prev a)`
 *  3. next retracts prev: `prev >=> next >=> prev = prev`
 *  4. prev retracts next: `next >=> prev >=> next = next`
 *  5. Non-skipping next: `b <= a || any (_ <= b) (next a)`
 *  6. Non-skipping prev: `a <= b || any (b <= _) (prev a)`
 *
 * The retraction laws can intuitively be understood as saying that `next` is the
 * opposite of `prev`; if you apply `next` and then `prev` to something, you should
 * end up with what you started with (although of course this doesn't apply if
 * you tried to `next` the last value in an enumeration and therefore got `none`
 * out).
 *
 * The non-skipping laws can intuitively be understood as saying that `next`
 * shouldn't skip over any elements of your type. For example, without the
 * non-skipping laws, it would be permissible to write an `Enum<Int>` instance
 * where `next(x) = some(x+2)`, and similarly `prev(x) = some(x-2)`.
 *
 * @since 1.0.0
 *
 */
export interface Enum<A> extends Ord<A> {
  /**
   * @internal
   */
  readonly [ENUM]: typeof ENUM
  readonly next: (a: A) => Option<A>
  readonly prev: (a: A) => Option<A>
}

interface EnumMembers<A> extends Omit<Enum<A>, typeof ENUM> {}

/**
 * Enum instance constructor
 *
 * @example
 * export const MyType: Enum<MyType> = {
 *   ...instanceEnum({
 *     next: ...,
 *     prev: ...,
 *   })
 * }
 *
 * @since 1.0.0
 */
export function instanceEnum<A>(e: EnumMembers<A>): Enum<A> {
  return {
    [ENUM]: ENUM,
    ...e,
  }
}
