---
title: NonZero.ts
nav_order: 43
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

---

# utils

## NonZero (type alias)

The type of values not equal to `zero`

**Signature**

```ts
export type NonZero<A> = A & { readonly [NON_ZERO]: typeof NON_ZERO }
```

Added in v1.0.0

## arbitraryNonZero

**Signature**

```ts
export declare function arbitraryNonZero<A>(T: Eq<A> & HasZero<A>): (arb: fc.Arbitrary<A>) => fc.Arbitrary<NonZero<A>>
```

Added in v1.0.0

## isNonZero

**Signature**

```ts
export declare function isNonZero<A>(T: Eq<A> & HasZero<A>): (a: A) => a is NonZero<A>
```

Added in v1.0.0
