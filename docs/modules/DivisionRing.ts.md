---
title: DivisionRing.ts
nav_order: 6
parent: Modules
---

## DivisionRing overview

See {@link DivisionRing} for details

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [DivisionRing (interface)](#divisionring-interface)
  - [instanceDivisionRing](#instancedivisionring)

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
  /**
   * @internal
   */
  readonly [DIVISION_RING]: typeof DIVISION_RING
  readonly recip: (a: NonZero<A>) => A
}
```

Added in v1.0.0

## instanceDivisionRing

DivisionRing instance constructor

**Signature**

```ts
export declare function instanceDivisionRing<A>(dr: Methods<A>): DivisionRing<A>
```

**Example**

```ts
import { instanceDivisionRing } from 'fp-ts-numerics/DivisionRing'
import { ringNumber } from 'fp-ts-numerics/number'

const divisionRingMyType = instanceDivisionRing<number>({
  ...ringNumber,
  recip: (a) => 1 / a,
})
```

Added in v1.0.0
