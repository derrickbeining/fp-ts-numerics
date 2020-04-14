import * as fc from 'fast-check'
import { option } from 'fp-ts'
import { Eq } from 'fp-ts/lib/Eq'
import { unsafeCoerce } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'

import { Numeric } from './Numeric'
import { Semiring } from './Semiring'

const NON_ZERO: unique symbol = unsafeCoerce('fp-ts-numerics/NON_ZERO')

export type NonZero<A> = A & { readonly [NON_ZERO]: A }

export function isNonZero<A>(T: Eq<A> & (Numeric<A> | Semiring<A>)): (a: A) => a is NonZero<A> {
  return (a): a is NonZero<A> => !T.equals(T.zero, a)
}

export function toNonZero<A>(T: Eq<A> & (Numeric<A> | Semiring<A>)) {
  return (a: A): Option<A & NonZero<A>> => {
    return isNonZero(T)(a) ? option.some(a) : option.none
  }
}

export function getArbitraryNonZero<A>(
  T: Eq<A> & (Numeric<A> | Semiring<A>)
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonZero<A>> {
  return (arb) => arb.filter(isNonZero(T))
}
