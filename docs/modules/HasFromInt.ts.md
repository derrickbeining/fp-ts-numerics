---
title: HasFromInt.ts
nav_order: 22
parent: Modules
---

## HasFromInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasFromInt (interface)](#hasfromint-interface)
  - [instanceHasFromInt](#instancehasfromint)

---

# utils

## HasFromInt (interface)

The class of values mapped to an [[Int]]

**Signature**

```ts
export interface HasFromInt<A> {
  /**
   * @internal
   */
  readonly [HAS_FROM_INT]: typeof HAS_FROM_INT
  /**
   * Maps an Int to a value
   *
   * @since 1.0.0
   */
  readonly fromInt: (int: Int) => A
}
```

Added in v1.0.0

## instanceHasFromInt

Instance constructor for HasFromInt typeclass

**Signature**

```ts
export declare function instanceHasFromInt<A>(members: Methods<A>): HasFromInt<A>
```

Added in v1.0.0
