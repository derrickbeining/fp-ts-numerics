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

---

# utils

## HasFromInt (interface)

The class of values mapped to an [[Int]]

**Signature**

```ts
export interface HasFromInt<A> {
  /**
   * Maps an Int to a value
   *
   * @since 1.0.0
   */
  readonly fromInt: (int: Int) => A
}
```

Added in v1.0.0
