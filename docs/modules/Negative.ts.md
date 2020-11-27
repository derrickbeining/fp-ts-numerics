---
title: Negative.ts
nav_order: 41
parent: Modules
---

## Negative overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Negative (type alias)](#negative-type-alias)
  - [arbitraryNegative](#arbitrarynegative)
  - [isNegative](#isnegative)
  - [toNegative](#tonegative)

---

# utils

## Negative (type alias)

The type of values less than `zero`

**Signature**

```ts
export type Negative<A> = A & { readonly [NEGATIVE]: typeof NEGATIVE }
```

Added in v1.0.0

## arbitraryNegative

**Signature**

```ts
export declare function arbitraryNegative<A>(
  T: Ord<A> & Semiring<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<Negative<A>>
```

Added in v1.0.0

## isNegative

**Signature**

```ts
export declare function isNegative<A>(T: Ord<A> & HasZero<A>)
```

Added in v1.0.0

## toNegative

**Signature**

```ts
export declare function toNegative<A>(T: Ord<A> & HasZero<A> & HasSub<A>): (a: A) => Negative<A>
```

Added in v1.0.0
