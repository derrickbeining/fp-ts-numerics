/**
 * @since 1.0.0
 */
import { Option } from 'fp-ts/lib/Option'

/**
 * The class of types which can be converted to and from JS `number`s
 *
 * @since 1.0.0
 */
export interface Numeric<A> {
  readonly fromNumber: (a: number) => Option<A>
  readonly toNumber: (a: A) => number
}
