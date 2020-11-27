---
title: HasToInt.ts
nav_order: 28
parent: Modules
---

## HasToInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasToInt (interface)](#hastoint-interface)

---

# utils

## HasToInt (interface)

The class of values which can be converted to Int losslessly

**Signature**

```ts
export interface HasToInt<A> {
  /**
   * Converts a value to an Int
   *
   * @since 1.0.0
   */
  readonly toInt: (a: A) => Int
}
```

Added in v1.0.0
