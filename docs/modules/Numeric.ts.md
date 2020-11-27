---
title: Numeric.ts
nav_order: 44
parent: Modules
---

## Numeric overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Numeric (interface)](#numeric-interface)

---

# utils

## Numeric (interface)

The class of types which can be converted to and from JS `number`s

**Signature**

```ts
export interface Numeric<A> {
  readonly fromNumber: (a: number) => Option<A>
  readonly toNumber: (a: A) => number
}
```

Added in v1.0.0
