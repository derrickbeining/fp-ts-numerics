import { option, ord } from 'fp-ts'
import { Bounded } from 'fp-ts/lib/Bounded'
import { tuple } from 'fp-ts/lib/function'
import { Functor1 } from 'fp-ts/lib/Functor'
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { Unfoldable1 } from 'fp-ts/lib/Unfoldable'

import { Enum } from '../Enum'
import { Int32 } from '../Int32'
import { Cardinality } from './Bounded/Cardinality'

/**
 * Type class for finite enumerations.
 *
 * This should not be considered a part of a numeric hierarchy, as in Haskell.
 * Rather, this is a type class for small, ordered sum types with
 * statically-determined cardinality and the ability to easily compute
 * successor and predecessor elements like `DayOfWeek`.
 *
 * Laws:
 *
 * - ```succ bottom >>= succ >>= succ ... succ [cardinality - 1 times] == top```
 * - ```pred top    >>= pred >>= pred ... pred [cardinality - 1 times] == bottom```
 * - ```forall a > bottom: pred a >>= succ == Just a```
 * - ```forall a < top:  succ a >>= pred == Just a```
 * - ```forall a > bottom: fromEnum <$> pred a = pred (fromEnum a)```
 * - ```forall a < top:  fromEnum <$> succ a = succ (fromEnum a)```
 * - ```e1 `compare` e2 == fromEnum e1 `compare` fromEnum e2```
 * - ```toEnum (fromEnum a) = Just a```
 */
export interface BoundedEnum<A> extends Bounded<A>, Enum<A> {
  /** The number of discrete value in a type.
   *
   *  E.g.
   *
   */
  cardinality: Cardinality<A>
  toEnum(int: Int32): Option<A>
  fromEnum(a: A): Int32
}

/**
 * Provides a default implementation for `cardinality`.
 *
 * Runs in `O(n)` where `n` is `fromEnum(top)`
 */
export function defaultCardinality<A>(be: Bounded<A> & Enum<A>): Cardinality<A> {
  return Cardinality.fromInt32(go(Int32.of(1), be.bottom))
  // where
  function go(i: Int32, x: A): Int32 {
    return pipe(
      be.next(x),
      option.fold(
        () => i,
        ($x) => go(Int32.add(i, Int32.of(1)), $x)
      )
    )
  }
}

/**
 * Provides a default implementation for `fromEnum`.
 *
 * - Assumes `toEnum(0) = some(bottom)`.
 * - Cannot be used in conjuction with `defaultPred`.
 *
 * Runs in `O(n)` where `n` is `fromEnum(a)`.
 */
export function defaultFromEnum<A>(e: Enum<A>): (a: A) => Int32 {
  return (a): Int32 => go(Int32.zero, a)
  // where
  function go(i: Int32, x: A): Int32 {
    return pipe(
      e.prev(x),
      option.fold(
        () => i,
        (y) => go(Int32.add(i, Int32.one), y)
      )
    )
  }
}
/**
 * Provides a default implementation for `toEnum`.
 *
 * - Assumes `fromEnum(bottom) = 0`.
 * - Cannot be used in conjuction with `defaultNext`.
 *
 * Runs in `O(n)` where `n` is `fromEnum(a)`.
 */
export function defaultToEnum<A>(be: Bounded<A> & Enum<A>): (i: Int32) => Option<A> {
  return (i): Option<A> => (ord.lt(Int32)(i, Int32.zero) ? option.none : go(i, be.bottom))

  // where
  function go($i: Int32, prev: A): Option<A> {
    return Int32.equals($i, Int32.zero)
      ? option.some(prev)
      : pipe(
          be.next(prev),
          option.fold(
            () => option.none,
            (next) => go(Int32.sub($i, Int32.one), next)
          )
        )
  }
}

export function fromThenTo<F extends URIS, A>(
  f: Unfoldable1<F> & Functor1<F>,
  be: BoundedEnum<A>
): (from: A, then: A, to: A) => Kind<F, A> {
  return (from, then, to): Kind<F, A> => {
    const _from = be.fromEnum(from)
    const _then = be.fromEnum(then)
    const _to = be.fromEnum(to)
    return pipe(
      f.unfold(_from, (e) => go(Int32.sub(_then, _from), _to, e)),
      (x) =>
        f.map(x, (int32) => {
          const res = option.toNullable(be.toEnum(int32))
          if (res === null) {
            const err = `fromThenTo(${from}, ${then}, ${to}) crashed because the BoundedEnum instance breaks one of its laws`
            throw new Error(err)
          }
          return res
        })
    )
  }
  // where
  function go(step: Int32, to: Int32, e: Int32): Option<[Int32, Int32]> {
    return ord.leq(Int32)(e, to) ? option.some(tuple(e, Int32.add(e, step))) : option.none
  }
}

// export function rangeN <A>(e: Enum<A>) => (
//   n: Int32,
//   start: A,
//   step: Int32
// ): Array<A> => {
//   const direction = Int32.equals(Int32.signum(n), Int32.of(1))
//     ? 'up'
//     : Int32.equals(Int32.signum(n), Int32.of(0))
//     ? 'inert'
//     : 'down'
//   switch (direction) {
//     case 'inert':
//       return []
//     case 'down':
//       return array.unfold(tuple(start, 0), ([b, count]) =>
//         count < Int32.toNumber(n)
//           ? pipe(
//               e.prev(b),
//               option.map((a) => tuple(a, tuple(b, count + 1)))
//             )
//           : option.none
//       )

//     case 'up':
//       return array.unfold(tuple(start, 0), ([b, count]) =>
//         count < Int32.toNumber(n)
//           ? pipe(
//               e.next(b),
//               option.map((a) => tuple(a, tuple(b, count + 1)))
//             )
//           : option.none
//       )
//   }
// }
/**
 * Like `toEnum` but returns the first argument if `x` is less than
 * `fromEnum(bottom)` and the second argument if `x` is greater than
 * `fromEnum(top)`.
 *
 * ``` ts
 * toEnumWithDefaults(boundedEnumBool)(false, true, (-1)) -- false
 * toEnumWithDefaults(boundedEnumBool)(false, true, 0)    -- false
 * toEnumWithDefaults(boundedEnumBool)(false, true, 1)    -- true
 * toEnumWithDefaults(boundedEnumBool)(false, true, 2)    -- true
 * ```
 */
export function toEnumWithDefaults<A>(be: BoundedEnum<A>): (low: A, high: A, n: Int32) => A {
  return (low, high, n): A =>
    pipe(
      be.toEnum(n),
      option.fold(
        () => (ord.lt(Int32)(n, be.fromEnum(be.bottom)) ? low : high),
        ($enum) => $enum
      )
    )
}
