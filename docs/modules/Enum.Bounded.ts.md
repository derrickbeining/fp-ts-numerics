---
title: Enum.Bounded.ts
nav_order: 7
parent: Modules
---

## Enum.Bounded overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [BoundedEnum (interface)](#boundedenum-interface)
  - [defaultCardinality](#defaultcardinality)
  - [defaultFromEnum](#defaultfromenum)
  - [defaultToEnum](#defaulttoenum)
  - [fromThenTo](#fromthento)
  - [toEnumWithDefaults](#toenumwithdefaults)

---

# utils

## BoundedEnum (interface)

Type class for finite enumerations.

This should not be considered a part of a numeric hierarchy, as in Haskell.
Rather, this is a type class for small, ordered sum types with
statically-determined cardinality and the ability to easily compute
successor and predecessor elements like `DayOfWeek`.

Laws:

- `succ bottom >>= succ >>= succ ... succ [cardinality - 1 times] == top`
- `pred top >>= pred >>= pred ... pred [cardinality - 1 times] == bottom`
- `forall a > bottom: pred a >>= succ == Just a`
- `forall a < top: succ a >>= pred == Just a`
- `forall a > bottom: fromEnum <$> pred a = pred (fromEnum a)`
- `forall a < top: fromEnum <$> succ a = succ (fromEnum a)`
- `` e1 `compare` e2 == fromEnum e1 `compare` fromEnum e2 ``
- `toEnum (fromEnum a) = Just a`

**Signature**

```ts
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
```

Added in v1.0.0

## defaultCardinality

Provides a default implementation for `cardinality`.

Runs in `O(n)` where `n` is `fromEnum(top)`

**Signature**

```ts
export declare function defaultCardinality<A>(be: Bounded<A> & Enum<A>): Cardinality<A>
```

Added in v1.0.0

## defaultFromEnum

Provides a default implementation for `fromEnum`.

- Assumes `toEnum(0) = some(bottom)`.
- Cannot be used in conjuction with `defaultPred`.

Runs in `O(n)` where `n` is `fromEnum(a)`.

**Signature**

```ts
export declare function defaultFromEnum<A>(e: Enum<A>): (a: A) => Int32
```

Added in v1.0.0

## defaultToEnum

Provides a default implementation for `toEnum`.

- Assumes `fromEnum(bottom) = 0`.
- Cannot be used in conjuction with `defaultNext`.

Runs in `O(n)` where `n` is `fromEnum(a)`.

**Signature**

```ts
export declare function defaultToEnum<A>(be: Bounded<A> & Enum<A>): (i: Int32) => Option<A>
```

Added in v1.0.0

## fromThenTo

**Signature**

```ts
export declare function fromThenTo<F extends URIS, A>(
  f: Unfoldable1<F> & Functor1<F>,
  be: BoundedEnum<A>
): (from: A, then: A, to: A) => Kind<F, A>
```

Added in v1.0.0

## toEnumWithDefaults

Like `toEnum` but returns the first argument if `x` is less than
`fromEnum(bottom)` and the second argument if `x` is greater than
`fromEnum(top)`.

```ts
toEnumWithDefaults(boundedEnumBool)(false, true, (-1)) -- false
toEnumWithDefaults(boundedEnumBool)(false, true, 0)    -- false
toEnumWithDefaults(boundedEnumBool)(false, true, 1)    -- true
toEnumWithDefaults(boundedEnumBool)(false, true, 2)    -- true
```

**Signature**

```ts
export declare function toEnumWithDefaults<A>(be: BoundedEnum<A>): (low: A, high: A, n: Int32) => A
```

Added in v1.0.0
