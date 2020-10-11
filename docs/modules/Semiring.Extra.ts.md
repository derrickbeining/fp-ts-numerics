---
title: Semiring.Extra.ts
nav_order: 46
parent: Modules
---

## Semiring.Extra overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [semiringPow](#semiringpow)

---

# utils

## semiringPow

Raises a Semiring to a non-negative integral power

```ts
expect(pow(UInt32))
```

**Signature**

```ts
export declare function semiringPow<B, E>(
  B: Semiring<B>,
  E: Ord<E> & EuclideanRing<E> & HasToInt<E>
): (base: B, exponent: NonNegative<E>) => B
```

Added in v1.0.0
