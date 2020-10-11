---
title: Semiring.ts
nav_order: 48
parent: Modules
---

## Semiring overview

The `Semiring` class is for types that support an addition and multiplication operation.

Instances must satisfy the following laws:

- Commutative monoid under addition:
  - Associativity: `(a + b) + c = a + (b + c)`
  - Identity: `zero + a = a + zero = a`
  - Commutative: `a + b = b + a`
- Monoid under multiplication:
  - Associativity: `(a * b) * c = a * (b * c)`
  - Identity: `one * a = a * one = a`
- Multiplication distributes over addition:
  - Left distributivity: `a * (b + c) = (a * b) + (a * c)`
  - Right distributivity: `(a + b) * c = (a * c) + (b * c)`
- Annihilation: `zero * a = a * zero = zero`

**Note:** The `number` type is not fully law abiding members of this class hierarchy due to the potential
for arithmetic overflows, and the presence of `NaN` and `Infinity` values. The behaviour is
unspecified in these cases.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Semiring (interface)](#semiring-interface)
  - [getFunctionSemiring](#getfunctionsemiring)
  - [instanceSemiring](#instancesemiring)

---

# utils

## Semiring (interface)

**Signature**

```ts
export interface Semiring<A> {
  /**
   * @internal
   */
  readonly [SEMIRING]: typeof SEMIRING
  /**
   * @since 1.0.0
   */
  add(x: A, y: A): A
  /**
   * @since 1.0.0
   */
  mul(x: A, y: A): A
  /**
   * @since 1.0.0
   */
  readonly one: A
  /**
   * @since 1.0.0
   */
  readonly zero: A
}
```

Added in v1.0.0

## getFunctionSemiring

**Signature**

```ts
export declare function getFunctionSemiring<A, B>(S: Methods<B>): Semiring<(a: A) => B>
```

Added in v1.0.0

## instanceSemiring

Semiring instance constructor

```ts
const semiringMyTupe: Semiring<MyType> =
  instanceSemiring({
      add: (x, y) => ...,
      zero: ...,
      mul: (x, y) => ...,
      one: ...,
  })
```

**Signature**

```ts
export declare function instanceSemiring<A>(semiring: Methods<A>): Semiring<A>
```

Added in v1.0.0
