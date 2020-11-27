---
title: NonNegative.ts
nav_order: 42
parent: Modules
---

## NonNegative overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [NonNegative (type alias)](#nonnegative-type-alias)
  - [arbitraryNonNegative](#arbitrarynonnegative)
  - [isNonNegative](#isnonnegative)
  - [toNonNegative](#tononnegative)

---

# utils

## NonNegative (type alias)

The type of values including `zero` and those greater than `zero`

**Signature**

```ts
export type NonNegative<A> = A & { readonly [NON_NEGATIVE]: typeof NON_NEGATIVE }
```

Added in v1.0.0

## arbitraryNonNegative

**Signature**

```ts
export declare function arbitraryNonNegative<A>(
  T: Ord<A> & HasZero<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonNegative<A>>
```

Added in v1.0.0

## isNonNegative

**Signature**

```ts
export declare function isNonNegative<A>(T: Ord<A> & HasZero<A>)
```

Added in v1.0.0

## toNonNegative

**Signature**

```ts
export declare function toNonNegative<A>(T: Ord<A> & HasZero<A> & HasSub<A>): (a: A) => Option<NonNegative<A>>
```

Added in v1.0.0
