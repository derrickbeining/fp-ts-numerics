import * as fc from 'fast-check'
import { option } from 'fp-ts'
import { Eq } from 'fp-ts/lib/Eq'
import { Option } from 'fp-ts/lib/Option'

import { Numeric } from './Numeric'
import { Semiring } from './Semiring'

declare const NON_ZERO: unique symbol

export type NonZero<A> = A & { readonly [NON_ZERO]: A }

export namespace NonZero {
  export function isTypeOf<A>(
    T: Eq<A> & (Numeric<A> | Semiring<A>)
  ): <B>(a: A & B) => a is NonZero<A & B> {
    return <B>(a: A): a is NonZero<A & B> => !T.equals(T.zero, a)
  }

  export function from<A>(T: Eq<A> & (Numeric<A> | Semiring<A>)) {
    return <B>(a: A & B): Option<A & B & NonZero<A & B>> => {
      return isTypeOf(T)(a) ? option.some(a) : option.none
    }
  }

  export function getArbitrary<A>(
    T: Eq<A> & (Numeric<A> | Semiring<A>)
  ): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonZero<A>> {
    return (arb) => arb.filter(isTypeOf(T))
  }
}
