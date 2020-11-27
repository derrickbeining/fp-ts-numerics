---
title: HasToRational.ts
nav_order: 29
parent: Modules
---

## HasToRational overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasToRational (interface)](#hastorational-interface)

---

# utils

## HasToRational (interface)

This class allows lossless conversion from any representation of a rational
to the fixed [[Rational]] type. Lossless means don't do any rounding. For
rounding see Algebra.RealRing. With the instances for Float and Double we
acknowledge that these types actually represent rationals rather than
(approximated) real numbers.

**Signature**

```ts
export interface HasToRational<A> {
  /**
   * The rational equivalent of its real argument with full precision
   */
  toRational(a: A): Rational
}
```

Added in v1.0.0
