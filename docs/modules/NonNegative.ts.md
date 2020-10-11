---
title: NonNegative.ts
nav_order: 37
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
  - [nonNegative](#nonnegative)

---

# utils

## NonNegative (type alias)

**Signature**

```ts
export type NonNegative<A> = A & { readonly [NON_NEGATIVE]: typeof NON_NEGATIVE }
```

Added in v1.0.0

## arbitraryNonNegative

**Signature**

```ts
export declare function arbitraryNonNegative<A>(
  T: Ord<A> & Semiring<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonNegative<A>>
```

Added in v1.0.0

## isNonNegative

**Signature**

```ts
export declare function isNonNegative<A>(T: Ord<A> & Semiring<A>)
```

Added in v1.0.0

## nonNegative

**Signature**

```ts
export declare function nonNegative<A>(T: Ord<A> & Ring<A> & Bounded<A>): <A2>(a: A & A2) => Option<NonNegative<A & A2>>
export declare function nonNegative<A>(T: Ord<A> & Ring<A>): <A2>(a: A & A2) => NonNegative<A & A2>
export declare function nonNegative<A>(T: Ord<A> & Semiring<A>): <A2>(a: A & A2) => Option<NonNegative<A & A2>>
```

Added in v1.0.0
