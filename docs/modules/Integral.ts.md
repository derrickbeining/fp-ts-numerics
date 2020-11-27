---
title: Integral.ts
nav_order: 36
parent: Modules
---

## Integral overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Integral (interface)](#integral-interface)

---

# utils

## Integral (interface)

Integral numbers supporting truncating integer division

**Signature**

```ts
export interface Integral<A> extends HasToRational<A>, HasToInt<A> {
  /**
   * Truncating integer division rounding toward zero
   */
  readonly quot: (dividend: A, divisor: NonZero<A>) => A
  /**
   * Remainder of truncating integer division. Always takes the sign of the
   * dividend.
   */
  readonly rem: (dividend: A, divisor: NonZero<A>) => A
}
```

Added in v1.0.0
