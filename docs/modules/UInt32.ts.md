---
title: UInt32.ts
nav_order: 50
parent: Modules
---

## UInt32 overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromNumber](#fromnumber)
  - [fromNumberLossy](#fromnumberlossy)
  - [of](#of)
  - [unsafeFromNumber](#unsafefromnumber)
- [Data Type](#data-type)
  - [UInt32 (interface)](#uint32-interface)
- [Typeclass Instance](#typeclass-instance)
  - [commutativeRingUInt32](#commutativeringuint32)
  - [euclideanRingUInt32](#euclideanringuint32)
  - [hasPowUint32](#haspowuint32)
  - [hasToIntUInt32](#hastointuint32)
  - [ringUInt32](#ringuint32)
  - [semiringUInt32](#semiringuint32)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [UInt32](#uint32)
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
  - [toInteger](#tointeger)
  - [toNumber](#tonumber)
  - [toRational](#torational)
  - [top](#top)
  - [zero](#zero)

---

# Constructor

## fromNumber

Attempts to construct a [[UInt32]] from a `number`, computing `none` if
the number is not an integer in the bounds of UInt32, otherwise `some(n)`.

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<UInt32>
```

Added in v1.0.0

## fromNumberLossy

Constructs a [[UInt32]] from a `number`, wrapping the value if it overflows
the range of [[UInt32]].

**Signature**

```ts
export declare function fromNumberLossy(n: number): UInt32
```

Added in v1.0.0

## of

Constructs a UInt32 from [[Digits]]

**Signature**

```ts
export declare function of(zero: 0): UInt32
export declare function of(...digits: Digits): NonZero<UInt32>
```

Added in v1.0.0

## unsafeFromNumber

Attempts to construct a [[UInt32]] from a `number`, throwing a RangeError if
the number is not an integer in the bounds of UInt32.

**Signature**

```ts
export declare function unsafeFromNumber(n: number): UInt32
```

Added in v1.0.0

# Data Type

## UInt32 (interface)

**Signature**

```ts
export interface UInt32 extends NonNegative<{}> {
  /**
   * @internal
   */
  readonly [U_INT_32]: unique symbol
}
```

Added in v1.0.0

# Typeclass Instance

## commutativeRingUInt32

**Signature**

```ts
export declare const commutativeRingUInt32: CommutativeRing<UInt32>
```

Added in v1.0.0

## euclideanRingUInt32

**Signature**

```ts
export declare const euclideanRingUInt32: EuclideanRing<UInt32>
```

Added in v1.0.0

## hasPowUint32

**Signature**

```ts
export declare const hasPowUint32: HasPow<UInt32>
```

Added in v1.0.0

## hasToIntUInt32

**Signature**

```ts
export declare const hasToIntUInt32: HasToInt<UInt32>
```

Added in v1.0.0

## ringUInt32

**Signature**

```ts
export declare const ringUInt32: Ring<UInt32>
```

Added in v1.0.0

## semiringUInt32

**Signature**

```ts
export declare const semiringUInt32: Semiring<UInt32>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[UInt32]]

**Signature**

```ts
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 0 | 1, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, Exclude<Digit, 9>, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 4, Exclude<Digit, 9>, Digit, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 4, 9, 0 | 1 | 2 | 3 | 4 | 5, Digit, Digit, Digit, Digit]
  | [4, 2, 9, 4, 9, 6, Exclude<Digit, 7 | 8 | 9>, Digit, Digit, Digit]
  | [4, 2, 9, 4, 9, 6, 7, 0 | 1, Digit, Digit]
  | [4, 2, 9, 4, 9, 6, 7, 2, Exclude<Digit, 9>, Digit]
  | [4, 2, 9, 4, 9, 6, 7, 2, 9, Exclude<Digit, 6 | 7 | 8 | 9>]
```

Added in v1.0.0

## UInt32

**Signature**

```ts
export declare const UInt32: Bounded<UInt32> &
  CommutativeRing<UInt32> &
  Enum<UInt32> &
  Eq<UInt32> &
  EuclideanRing<UInt32> &
  HasPow<UInt32> &
  HasToInt<UInt32> &
  HasToRational<UInt32> &
  Integral<UInt32> &
  Numeric<UInt32> &
  ord.Ord<UInt32> &
  Ring<UInt32> &
  Semiring<UInt32> &
  Show<UInt32> & {
    add: typeof add
    bottom: UInt32
    boundedUInt32: Bounded<UInt32>
    compare: typeof compare
    div: typeof div
    enumUInt32: Enum<UInt32>
    eqUInt32: Eq<UInt32>
    equals: typeof equals
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    integralUInt32: Integral<UInt32>
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    numericUInt32: Numeric<UInt32>
    of: typeof of
    one: UInt32
    ordUInt32: ord.Ord<UInt32>
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    hasToRationalUInt32: HasToRational<UInt32>
    rem: typeof rem
    showUInt32: Show<UInt32>
    sub: typeof sub
    toInt: typeof toInt
    toInteger: typeof toInteger
    toNumber: typeof toNumber
    top: UInt32
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: UInt32
  }
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: UInt32, b: UInt32): UInt32
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: UInt32
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare function compare(a: UInt32, b: UInt32): -1 | 0 | 1
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: UInt32): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: UInt32, d: NonZero<UInt32>): UInt32
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: UInt32, b: UInt32): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<UInt32>
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is UInt32
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: UInt32, d: NonZero<UInt32>): UInt32
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: UInt32, b: UInt32): UInt32
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: UInt32): UInt32
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: UInt32): Option<UInt32>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: UInt32
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: UInt32, exp: UInt32): UInt32
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: UInt32): Option<UInt32>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: UInt32, b: NonZero<UInt32>): UInt32
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: UInt32, b: NonZero<UInt32>): UInt32
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: UInt32, b: UInt32): UInt32
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: UInt32): Int
```

Added in v1.0.0

## toInteger

**Signature**

```ts
export declare function toInteger(a: UInt32): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: UInt32): number
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: UInt32): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: UInt32
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: UInt32
```

Added in v1.0.0
