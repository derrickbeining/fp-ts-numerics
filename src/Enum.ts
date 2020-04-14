/**
 * Provides the {@link Enum} typeclass interface and functions which operate
 * on `Enum`s
 *
 * @packageDocumentation
 */
import { option, ord } from 'fp-ts'
import { tuple } from 'fp-ts/lib/function'
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { Unfoldable1 } from 'fp-ts/lib/Unfoldable'

import { Enum } from './Enum.Internal'
import { Int32 } from './Int32'

export * from './Enum.Internal'

/**
 * @since 1.0.0
 *
 * Provides a default implementation for `next`, given a function that maps
 * integers to values in the `Enum`, and a function that maps values in the
 * `Enum` back to integers. The integer mapping must agree in both directions
 * for this to implement a law-abiding `next`.
 *
 * If a `BoundedEnum` instance exists for `a`, the `toEnum` and `fromEnum`
 * functions can be used here:
 *
 * ```typescript
 * next = defaultNext(toEnum, fromEnum)
 * ```
 */
export function defaultNext<A>(
  toEnum: (n: Int32) => Option<A>,
  fromEnum: (a: A) => Int32
): (a: A) => Option<A> {
  return (a) => toEnum(Int32.add(fromEnum(a), Int32.of(1)))
}

/**
 * @since 1.0.0
 *
 * Provides a default implementation for `prev`, given a function that maps
 * integers to values in the `Enum`, and a function that maps values in the
 * `Enum` back to integers. The integer mapping must agree in both directions
 * for this to implement a law-abiding `prev`.
 *
 * If a `BoundedEnum` instance exists for `a`, the `toEnum` and `fromEnum`
 * functions can be used here:
 *
 * ```typescript
 * prev = defaultPrev(toEnum, fromEnum)
 * ```
 *
 */
export function defaultPrev<A>(
  toEnum: (n: Int32) => Option<A>,
  fromEnum: (a: A) => Int32
): (a: A) => Option<A> {
  return (a) => toEnum(Int32.sub(fromEnum(a), Int32.of(1)))
}

/**
 * @since 1.0.0
 *
 * Produces all predecessors of an enumerable value, excluding the start value.
 */
export function enumDownAfter<E, U extends URIS>(
  e: Enum<E>,
  u: Unfoldable1<U>
): (excludedStart: E) => Kind<U, E> {
  return (excludedStart) =>
    u.unfold(excludedStart, (prev) =>
      pipe(
        e.prev(prev),
        option.map((next) => tuple(next, next))
      )
    )
}
/**
 * @since 1.0.0
 *
 * Produces all predecessors of an `Enum` value, including the start value.
 *
 * ```typescript
 * expect(enumDownFrom(Int8, array)(Int8.top))
 *   .toBe(reverse(sort(Int8)(everyInt8)))
 * ```
 */
export function enumDownFrom<E, U extends URIS>(
  e: Enum<E>,
  u: Unfoldable1<U>
): (includedStart: E) => Kind<U, E> {
  return (includedStart) =>
    u.unfold(includedStart, (prev) =>
      pipe(
        e.prev(prev),
        option.map((next) => tuple(prev, next))
      )
    )
}
/**
 * @since 1.0.0
 *
 * Returns the enumeration of elements from `from` to `to` (inclusive)
 * contained in the data type for which an `Unfoldable` instance is provided.
 *
 * ```typescript
 * expect(fromTo(Int, array)(Int.zero, Int.of(3)))
 *   .toBe([Int.of(0), Int.of(1), Int.of(2), Int.of(3)])
 * ```
 */
export function enumFromTo<E, U extends URIS>(
  e: Enum<E>,
  u: Unfoldable1<U>
): (from: E, to: E) => Kind<U, E> {
  return (from, to) =>
    e.equals(from, to)
      ? u.unfold(true, (eh) => (eh ? option.some(tuple(from, false)) : option.none))
      : ord.lt(e)(from, to)
      ? u.unfold(from, go(e.next, ord.leq(e), to))
      : u.unfold(from, go(e.prev, ord.geq(e), to))
  // where
  function go(step: (x: E) => Option<E>, test: (a: E, b: E) => boolean, end: E) {
    return (curr: E) =>
      test(curr, end)
        ? option.none
        : pipe(
            step(curr),
            option.map((next) => tuple(curr, next))
          )
  }
}

/**
 * @since 1.0.0
 *
 * Produces all successors of an `Enum` value, excluding the start value.
 */
export function enumUpAfter<E, U extends URIS>(
  e: Enum<E>,
  u: Unfoldable1<U>
): (excludedStart: E) => Kind<U, E> {
  return (excludedStart) =>
    u.unfold(excludedStart, (prev) =>
      pipe(
        e.next(prev),
        option.map((next) => tuple(next, next))
      )
    )
}

/**
 * @since 1.0.0
 *
 * Produces all successors of an `Enum` value, including the start value.
 *
 * ```typescript
 * expect(enumUpFrom(Int8, array)(Int8.bottom))
 *   .toBe((sort(Int8)(everyInt8)))
 * ```
 *
 */
export function enumUpFrom<E, U extends URIS>(
  e: Enum<E>,
  u: Unfoldable1<U>
): (bottom: E) => Kind<U, E> {
  return (bottom) =>
    u.unfold(bottom, (prev) =>
      pipe(
        e.next(prev),
        option.map((next) => tuple(prev, next))
      )
    )
}
