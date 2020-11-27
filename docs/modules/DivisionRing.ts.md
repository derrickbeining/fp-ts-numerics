---
title: DivisionRing.ts
nav_order: 5
parent: Modules
---

## DivisionRing overview

See {@link DivisionRing} for details

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [DivisionRing (interface)](#divisionring-interface)
  - [divL](#divl)
  - [divR](#divr)

---

# utils

## DivisionRing (interface)

The `DivisionRing` class is for non-zero rings in which every non-zero
element has a multiplicative inverse. Division rings are sometimes also
called _skew fields_.

Instances must satisfy the following laws in addition to the {@link Ring}
laws:

- Non-zero ring: `one /= zero`
- Non-zero multiplicative inverse: `recip a * a = a * recip a = one` for
  all non-zero `a`

The result of `recip zero` is left undefined; individual instances may
choose how to handle this case.

If a type has both `DivisionRing` and {@link CommutativeRing} instances, then
it is a field and should have a `Field` instance.

**Signature**

```ts
export interface DivisionRing<A> extends Ring<A> {
  readonly recip: (a: NonZero<A>) => A
}
```

Added in v1.0.0

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
