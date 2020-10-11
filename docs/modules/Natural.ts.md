---
title: Natural.ts
nav_order: 36
parent: Modules
---

## Natural overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromNumber](#fromnumber)
  - [unsafeFromNumber](#unsafefromnumber)
- [Typeclass Instance](#typeclass-instance)
  - [enumInt](#enumint)
  - [hasToIntNatural](#hastointnatural)
  - [hasToRationalNatural](#hastorationalnatural)
  - [integralNatural](#integralnatural)
  - [ordNatural](#ordnatural)
  - [semiringNatural](#semiringnatural)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [Natural](#natural)
  - [Natural (interface)](#natural-interface)
  - [degree](#degree)
  - [div](#div)
  - [fromInt](#fromint)
  - [of](#of)
  - [sub](#sub)

---

# Constructor

## fromNumber

Attempts to construct a [[Natural]] from a `number`, computing `none` if
not a safe non-negative integer, otherwise `some(n)`.

```ts
import { Natural } from 'fp-ts-numerics'

Natural.fromNumber(100)
// > option.some(Natural.of(1,0,0))
Natural.fromNumber(Number.MAX_VALUE)
// > option.nothing
```

**Signature**

```ts
export declare function fromNumber(n: number): Option<Natural>
```

Added in v1.0.0

## unsafeFromNumber

Unsafely attempts to construct an [[Natural]] from a `number`, throwing an error
if not a safe, non-negative integer.

```ts
import { Natural } from 'fp-ts-numerics'

Natural.unsafeFromNumber(100)
// > Natural.of(1,0,0)
Natural.unsafeFromNumber(Number.MAX_VALUE)
// > uncaught error
```

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Natural
```

Added in v1.0.0

# Typeclass Instance

## enumInt

**Signature**

```ts
export declare const enumInt: Enum<Natural>
```

Added in v1.0.0

## hasToIntNatural

**Signature**

```ts
export declare const hasToIntNatural: HasToInt<Natural>
```

Added in v1.0.0

## hasToRationalNatural

**Signature**

```ts
export declare const hasToRationalNatural: HasToRational<Natural>
```

Added in v1.0.0

## integralNatural

**Signature**

```ts
export declare const integralNatural: Integral<Natural>
```

Added in v1.0.0

## ordNatural

**Signature**

```ts
export declare const ordNatural: ord.Ord<Natural>
```

Added in v1.0.0

## semiringNatural

**Signature**

```ts
export declare const semiringNatural: Semiring<Natural>
```

Added in v1.0.0

# utils

## Digits (type alias)

**Signature**

```ts
export type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]
```

Added in v1.0.0

## Natural

**Signature**

```ts
export declare const Natural: Enum<Natural> &
  Integral<Natural> &
  HasToInt<Natural> &
  Semiring<Natural> & {
    unsafeFromBigInt: typeof unsafeFromBigInt
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    unsafeFromNumber: typeof unsafeFromNumber
    isTypeOf: typeof isTypeOf
    of: typeof of
    toBigInt: typeof toBigInt
    sub: typeof sub
    degree: typeof degree
    div: typeof div
    mod: typeof mod
    toNumber: typeof toNumber
  }
```

Added in v1.0.0

## Natural (interface)

Arbitrary-precision non-negative integers

**Signature**

```ts
export interface Natural extends Int {
  /**
   * @internal
   */
  readonly [NATURAL]: unique symbol
}
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Natural): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Natural, d: NonZero<Natural>): Natural
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(i: Int): Option<Natural>
```

Added in v1.0.0

## of

**Signature**

```ts
export declare function of(zero: 0): Natural
export declare function of(...digits: Digits): NonZero<Natural>
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Natural, b: Natural): Natural
```

Added in v1.0.0
