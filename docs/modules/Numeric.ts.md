---
title: Numeric.ts
nav_order: 40
parent: Modules
---

## Numeric overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Numeric (interface)](#numeric-interface)
  - [instanceNumeric](#instancenumeric)

---

# utils

## Numeric (interface)

The class of types which can be converted to and from JS `number`s

**Signature**

```ts
export interface Numeric<A> {
  /**
   * @internal
   */
  readonly [NUMERIC]: typeof NUMERIC
  readonly fromNumber: (a: number) => Option<A>
  readonly toNumber: (a: A) => number
}
```

Added in v1.0.0

## instanceNumeric

**Signature**

```ts
export declare function instanceNumeric<A>(numeric: NumericMethods<A>): Numeric<A>
```

Added in v1.0.0
