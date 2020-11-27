---
title: Enum.Bounded.Cardinality.ts
nav_order: 6
parent: Modules
---

## Enum.Bounded.Cardinality overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Cardinality](#cardinality)
  - [Cardinality (type alias)](#cardinality-type-alias)

---

# utils

## Cardinality

**Signature**

```ts
export declare const Cardinality: {
  fromInt32: <A>(a: Int32) => Cardinality<A>
  toInt32: <A>(c: Cardinality<A>) => Int32
  of: <A>(n: Int32) => Cardinality<A>
}
```

Added in v1.0.0

## Cardinality (type alias)

The size of the set of values inhabiting a type.

**Signature**

```ts
export type Cardinality<A> = { readonly [_Cardinality_]: unique symbol }
```

Added in v1.0.0
