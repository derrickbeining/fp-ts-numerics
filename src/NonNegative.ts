import * as fc from 'fast-check'
import { option, ord } from 'fp-ts'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'

import { Numeric } from './Numeric'
import { negate, Ring } from './Ring'
import { Semiring } from './Semiring'

declare const NON_NEGATIVE: unique symbol

export type NonNegative<A> = A & { readonly [NON_NEGATIVE]: A }

export namespace NonNegative {
  export function isTypeOf<A>(T: Ord<A> & (Numeric<A> | Semiring<A>)) {
    return <A2>(a: A & A2): a is NonNegative<A & A2> => !ord.lt(T)(a, T.zero)
  }

  export function from<A>(T: Ord<A> & Ring<A>): <A2>(a: A & A2) => NonNegative<A & A2>
  export function from<A>(T: Ord<A> & Semiring<A>): <A2>(a: A & A2) => Option<NonNegative<A & A2>>
  export function from<A>(
    T: Ord<A> & (Ring<A> | Semiring<A>)
  ): <A2>(a: A & A2) => Option<NonNegative<A & A2>> | (A & A2) {
    return <A2>(a: A) => {
      return 'sub' in T
        ? unsafeCoerce<A, NonNegative<A & A2>>(ord.lt(T)(a, T.zero) ? negate(T)(a) : a)
        : ord.lt(T)(a, T.zero)
        ? option.none
        : option.some(unsafeCoerce<A, NonNegative<A & A2>>(a))
    }
  }

  export function getArbitrary<A>(
    T: Ord<A> & (Numeric<A> | Semiring<A>)
  ): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonNegative<A>> {
    return (arb) => arb.filter(isTypeOf(T))
  }
}
