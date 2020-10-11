---
title: Integral.ts
nav_order: 34
parent: Modules
---

## Integral overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass Instance Constructor](#typeclass-instance-constructor)
  - [instanceIntegral](#instanceintegral)
- [utils](#utils)
  - [Integral (interface)](#integral-interface)

---

# Typeclass Instance Constructor

## instanceIntegral

Integral instance constructor

```ts
export const MyType: Integral<MyType> = {
  ...instanceIntegral({...})
}
```

**Signature**

```ts
export declare function instanceIntegral<A>(e: Methods<A>): Integral<A>
```

Added in v1.0.0

# utils

## Integral (interface)

Integral numbers supporting truncating integer division

**Signature**

```ts
export interface Integral<A> extends HasToRational<A>, HasToInt<A> {
  /**
   * @internal
   */
  readonly [INTEGRAL]: typeof INTEGRAL
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
