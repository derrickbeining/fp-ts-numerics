---
title: Ratio.ts
nav_order: 46
parent: Modules
---

## Ratio overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Ratio](#ratio)
  - [Ratio (interface)](#ratio-interface)

---

# utils

## Ratio

**Signature**

```ts
export declare const Ratio: {
  of: <A>(T: Ord<A> & HasToRational<A> & EuclideanRing<A>) => (n: A, d: NonZero<A>) => Ratio<A>
  isTypeOf: <A>(innerGuard: (x: unknown) => x is A) => (y: unknown) => y is Ratio<A>
  numerator: <A>(r: Ratio<A>) => A
  denominator: <A>(r: Ratio<A>) => A
}
```

Added in v1.0.0

## Ratio (interface)

Rational numbers, with numerator and denominator of some Integral type.

**Signature**

```ts
export interface Ratio<A> extends Readonly<{ readonly [RATIO]: { numerator: A; denominator: A } }> {}
```

Added in v1.0.0
