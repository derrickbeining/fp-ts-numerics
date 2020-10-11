---
title: Fractional.ts
nav_order: 20
parent: Modules
---

## Fractional overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Fractional (interface)](#fractional-interface)
  - [fromFractional](#fromfractional)
  - [instanceFractional](#instancefractional)

---

# utils

## Fractional (interface)

The Fractional class represents fractional numbers supporting real division.

**Signature**

```ts
export interface Fractional<A> extends HasToRational<A>, DivisionRing<A> {
  /**
   * @internal
   */
  readonly [FRACTIONAL]: typeof FRACTIONAL
  readonly fromRational: (r: Rational) => A
}
```

Added in v1.0.0

## fromFractional

A helper function for general conversion between Fractional values.

**Signature**

```ts
export declare function fromFractional<A, B>(fa: Fractional<A>, fb: Fractional<B>): (a: A) => B
```

Added in v1.0.0

## instanceFractional

Fractional instance constructor

**Signature**

```ts
export declare function instanceFractional<A>(e: FractionalMethods<A>): Fractional<A>
```

Added in v1.0.0
