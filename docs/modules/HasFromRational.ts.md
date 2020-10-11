---
title: HasFromRational.ts
nav_order: 23
parent: Modules
---

## HasFromRational overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasFromRational (interface)](#hasfromrational-interface)
  - [instanceHasFromRational](#instancehasfromrational)

---

# utils

## HasFromRational (interface)

The dual of [[HasToRational]]. Should satisfy

```ts
fromRational(toRational(a)) = a
```

**Signature**

```ts
export interface HasFromRational<A> extends Ord<A> {
  /**
   * @internal
   */
  readonly [HAS_FROM_RATIONAL]: typeof HAS_FROM_RATIONAL
  /**
   * @since 1.0.0
   */
  fromRational(r: Rational): A
}
```

Added in v1.0.0

## instanceHasFromRational

Instance constructor for the HasFromRational typeclass

**Signature**

```ts
export declare function instanceHasFromRational<A>(e: Methods<A>): HasFromRational<A>
```

Added in v1.0.0
