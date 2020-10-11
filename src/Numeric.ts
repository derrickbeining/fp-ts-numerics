/**
 * @since 1.0.0
 */
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'

declare const NUMERIC: unique symbol
const numericBrand = unsafeCoerce<{}, { [NUMERIC]: typeof NUMERIC }>({})
/**
 * The class of types which can be converted to and from JS `number`s
 *
 * @since 1.0.0
 */
export interface Numeric<A> {
  /**
   * @internal
   */
  readonly [NUMERIC]: typeof NUMERIC
  readonly fromNumber: (a: number) => Option<A>
  readonly toNumber: (a: A) => number
}

type NumericMethods<A> = Omit<Numeric<A>, typeof NUMERIC>

/**
 * @since 1.0.0
 */
export function instanceNumeric<A>(numeric: NumericMethods<A>): Numeric<A> {
  return {
    ...numericBrand,
    ...numeric,
  }
}
