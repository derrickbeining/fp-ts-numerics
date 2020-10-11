---
title: NonZero.ts
nav_order: 38
parent: Modules
---

## NonZero overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [NonZero (type alias)](#nonzero-type-alias)
  - [arbitraryNonZero](#arbitrarynonzero)
  - [isNonZero](#isnonzero)
  - [nonZero](#nonzero)

---

# utils

## NonZero (type alias)

**Signature**

```ts
export type NonZero<A> = A & { readonly [NON_ZERO]: typeof NON_ZERO }
```

Added in v1.0.0

## arbitraryNonZero

**Signature**

```ts
export declare function arbitraryNonZero<A>(T: Eq<A> & Semiring<A>): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonZero<A>>
```

Added in v1.0.0

## isNonZero

**Signature**

```ts
export declare function isNonZero<A>(T: Eq<A> & Semiring<A>): <B>(a: A & B) => a is NonZero<A & B>
```

Added in v1.0.0

## nonZero

**Signature**

```ts
export declare function nonZero<A>(T: Eq<A> & Semiring<A>)
```

Added in v1.0.0
