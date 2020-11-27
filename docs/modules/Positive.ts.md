---
title: Positive.ts
nav_order: 45
parent: Modules
---

## Positive overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Positive (type alias)](#positive-type-alias)
  - [arbitraryPositive](#arbitrarypositive)
  - [isPositive](#ispositive)
  - [toPositive](#topositive)

---

# utils

## Positive (type alias)

The type of values greater than `zero`

**Signature**

```ts
export type Positive<A> = A & NonNegative<A> & NonZero<A>
```

Added in v1.0.0

## arbitraryPositive

**Signature**

```ts
export declare function arbitraryPositive<A>(
  T: Ord<A> & HasZero<A>
): (arb: fc.Arbitrary<A>) => fc.Arbitrary<Positive<A>>
```

Added in v1.0.0

## isPositive

**Signature**

```ts
export declare function isPositive<A>(T: Ord<A> & HasZero<A>)
```

Added in v1.0.0

## toPositive

Either validates that a value is positive or attempts to flip its sign
to positive by subtracting it from `zero`. Since flipping the sign of some
numbers can cause overflow/wrapping back to negative, we can't always
produce a positive number, hence the `Option`.

**Signature**

```ts
export declare function toPositive<A>(T: Ord<A> & HasZero<A> & HasSub<A>): (a: A) => Option<Positive<A>>
```

Added in v1.0.0
