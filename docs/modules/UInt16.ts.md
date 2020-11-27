---
title: UInt16.ts
nav_order: 54
parent: Modules
---

## UInt16 overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromNumber](#fromnumber)
  - [fromNumberLossy](#fromnumberlossy)
  - [of](#of)
  - [unsafeFromNumber](#unsafefromnumber)
- [Data Type](#data-type)
  - [UInt16 (interface)](#uint16-interface)
- [Typeclass Instance](#typeclass-instance)
  - [CommutativeRing](#commutativering)
  - [Enum](#enum)
  - [EuclideanRing](#euclideanring)
  - [HasPow](#haspow)
  - [HasToInt](#hastoint)
  - [HasToRational](#hastorational)
  - [Numeric](#numeric)
  - [Ring](#ring)
  - [Semiring](#semiring)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [UInt16](#uint16)
  - [add](#add)
  - [bottom](#bottom)
  - [compare](#compare)
  - [degree](#degree)
  - [div](#div)
  - [equals](#equals)
  - [fromInt](#fromint)
  - [isTypeOf](#istypeof)
  - [mod](#mod)
  - [mul](#mul)
  - [negate](#negate)
  - [next](#next)
  - [one](#one)
  - [pow](#pow)
  - [prev](#prev)
  - [quot](#quot)
  - [rem](#rem)
  - [sub](#sub)
  - [toInt](#toint)
  - [toNumber](#tonumber)
  - [toRational](#torational)
  - [top](#top)
  - [zero](#zero)

---

# Constructor

## fromNumber

Attempts to construct a [[UInt16]] from a `number`, computing `none` if
the number is not an integer in the bounds of UInt16, otherwise `some(n)`.

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<UInt16>
```

Added in v1.0.0

## fromNumberLossy

Constructs a [[UInt16]] from a `number`, wrapping the value if it overflows
the range of [[UInt16]].

**Signature**

```ts
export declare function fromNumberLossy(n: number): UInt16
```

Added in v1.0.0

## of

Constructs a UInt16 from [[Digits]]

**Signature**

```ts
export declare function of(zero: 0): UInt16
export declare function of(...digits: Digits): NonZero<UInt16>
```

Added in v1.0.0

## unsafeFromNumber

Attempts to construct a [[UInt16]] from a `number`, throwing a RangeError if
the number is not an integer in the bounds of UInt16.

**Signature**

```ts
export declare function unsafeFromNumber(n: number): UInt16
```

Added in v1.0.0

# Data Type

## UInt16 (interface)

**Signature**

```ts
export interface UInt16 extends Branded<UInt32, typeof U_INT_16> {}
```

Added in v1.0.0

# Typeclass Instance

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: CommutativeRing<UInt16>
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: {
  equals: typeof equals
  compare: (x: UInt16, y: UInt16) => Ordering
  next: typeof next
  prev: typeof prev
}
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<UInt16>
```

Added in v1.0.0

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<UInt16>
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: HasToInt<UInt16>
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: HasToRational<UInt16>
```

Added in v1.0.0

## Numeric

**Signature**

```ts
export declare const Numeric: Numeric<UInt16>
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: Ring<UInt16>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<UInt16>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[UInt16]]

**Signature**

```ts
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [0 | 1 | 2 | 3 | 4 | 5, Digit, Digit, Digit, Digit]
  | [6, 0 | 1 | 2 | 3 | 4, Digit, Digit, Digit]
  | [6, 5, 0 | 1 | 2 | 3 | 4, Digit, Digit]
  | [6, 5, 5, 0 | 1 | 2, Digit]
  | [6, 5, 5, 3, 0 | 1 | 2 | 3 | 4 | 5]
```

Added in v1.0.0

## UInt16

**Signature**

```ts
export declare const UInt16: Bounded<UInt16> &
  CommutativeRing<UInt16> &
  Enum<UInt16> &
  Eq<UInt16> &
  EuclideanRing<UInt16> &
  HasPow<UInt16> &
  HasToInt<UInt16> &
  HasToRational<UInt16> &
  Integral<UInt16> &
  Numeric<UInt16> &
  Ord<UInt16> &
  Ring<UInt16> &
  Semiring<UInt16> &
  Show<UInt16> & {
    add: typeof add
    bottom: UInt16
    compare: (x: UInt16, y: UInt16) => Ordering
    div: typeof div
    equals: typeof equals
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    of: typeof of
    one: UInt16
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    sub: typeof sub
    toInt: typeof toInt
    toNonNegativeNumber: typeof toNumber
    toNumber: typeof toNumber
    top: UInt16
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: UInt16
  }
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: UInt16, b: UInt16): UInt16
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: UInt16
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare const compare: (x: UInt16, y: UInt16) => Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: UInt16): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: UInt16, d: NonZero<UInt16>): UInt16
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: UInt16, b: UInt16): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<UInt16>
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is UInt16
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: UInt16, d: NonZero<UInt16>): UInt16
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: UInt16, b: UInt16): UInt16
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: UInt16): UInt16
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: UInt16): Option<UInt16>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: UInt16
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: UInt16, exp: UInt16): UInt16
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: UInt16): Option<UInt16>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: UInt16, b: NonZero<UInt16>): UInt16
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: UInt16, b: NonZero<UInt16>): UInt16
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: UInt16, b: UInt16): UInt16
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(n: UInt16): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: UInt16): NonNegative<number>
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: UInt16): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: UInt16
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: UInt16
```

Added in v1.0.0
