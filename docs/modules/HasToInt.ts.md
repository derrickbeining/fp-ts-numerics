---
title: HasToInt.ts
nav_order: 25
parent: Modules
---

## HasToInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasToInt (interface)](#hastoint-interface)
  - [instanceHasToInt](#instancehastoint)

---

# utils

## HasToInt (interface)

The class of values which can be converted to Int losslessly

**Signature**

```ts
export interface HasToInt<A> {
  /**
   * @internal
   */
  readonly [HAS_TO_INT]: typeof HAS_TO_INT
  /**
   * Converts a value to an Int
   *
   * @since 1.0.0
   */
  readonly toInt: (a: A) => Int
}
```

Added in v1.0.0

## instanceHasToInt

Instance constructor for HasToInt typeclass

**Signature**

```ts
export declare function instanceHasToInt<A>(members: Methods<A>): HasToInt<A>
```

Added in v1.0.0
