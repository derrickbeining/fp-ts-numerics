---
title: DivisionRing.Extra.ts
nav_order: 4
parent: Modules
---

## DivisionRing.Extra overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [divL](#divl)
  - [divR](#divr)
  - [divisionRingPow](#divisionringpow)

---

# utils

## divL

Left division, defined as `divL(a, b) = recip(b * a)`. Left and right
division are distinct in this module because a `DivisionRing` is not
necessarily commutative.

If the type `a` is also a `EuclideanRing`, then this function is
equivalent to `div` from the `EuclideanRing` class. When working
abstractly, `div` should generally be preferred, unless you know that you
need your code to work with noncommutative rings.

**Signature**

```ts
export declare function divL<A>(DR: DivisionRing<A>): (a1: A, a2: NonZero<A>) => A
```

Added in v1.0.0

## divR

Right division, defined as `rightDiv a b = a * recip b`. Left and right
division are distinct in this module because a `DivisionRing` is not
necessarily commutative.

If the type `a` is also a `EuclideanRing`, then this function is
equivalent to `div` from the `EuclideanRing` class. When working
abstractly, `div` should generally be preferred, unless you know that you
need your code to work with noncommutative rings.

**Signature**

```ts
export declare function divR<A>(DR: DivisionRing<A>): (a1: A, a2: NonZero<A>) => A
```

Added in v1.0.0

## divisionRingPow

Raises a floating-point base to an integral power

```ts
import { number, Int32 } from 'fp-ts-numerics'

expect(divisionRingPow(number, Int32)(2.5, Int32.of(-3))).toBe(0.064)
```

**Signature**

```ts
export declare function divisionRingPow<B, E>(
  B: Eq<B> & DivisionRing<B>,
  E: Ord<E> & EuclideanRing<E> & HasToInt<E>
): (base: B, exponent: E) => B
```

Added in v1.0.0
