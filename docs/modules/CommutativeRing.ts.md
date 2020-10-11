---
title: CommutativeRing.ts
nav_order: 2
parent: Modules
---

## CommutativeRing overview

The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
is commutative.

See {@link CommutativeRing} for laws.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [CommutativeRing (interface)](#commutativering-interface)
  - [instanceCommutativeRing](#instancecommutativering)

---

# utils

## CommutativeRing (interface)

The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
is commutative.

It has no members of its own, but instances must satisfy the following law
in addition to the {@link Ring} laws:

- Commutative multiplication: `a * b = b * a`

**Signature**

```ts
export interface CommutativeRing<A> extends Ring<A> {
  /**
   * @internal
   */
  readonly [COMMUTATIVE_RING]: typeof COMMUTATIVE_RING
}
```

Added in v1.0.0

## instanceCommutativeRing

CommutativeRing instance constructor

**Signature**

```ts
export declare function instanceCommutativeRing<A>(ring: Ring<A>): CommutativeRing<A>
```

**Example**

```ts
import { instanceSemiring } from 'fp-ts-numerics/Semiring'
import { instanceRing } from 'fp-ts-numerics/Ring'
import { instanceCommutativeRing } from 'fp-ts-numerics/CommutativeRing'

const semiringNumber = instanceSemiring<number>({
  add: (x, y) => x + y,
  mul: (x, y) => x * y,
  one: 1,
  zero: 0,
})

const ringNumber = instanceRing<number>({
  ...semiringNumber,
  sub: (x, y) => x - y,
})

const commutativeRingMyType = instanceCommutativeRing<number>(ringNumber)
```

Added in v1.0.0
