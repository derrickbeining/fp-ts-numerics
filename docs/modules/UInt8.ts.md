---
title: UInt8.ts
nav_order: 51
parent: Modules
---

## UInt8 overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromNumber](#fromnumber)
  - [fromNumberLossy](#fromnumberlossy)
  - [of](#of)
  - [unsafeFromNumber](#unsafefromnumber)
- [Data Type](#data-type)
  - [UInt8 (interface)](#uint8-interface)
- [Transformation](#transformation)
  - [toNumber](#tonumber)
- [Type Guard](#type-guard)
  - [isTypeOf](#istypeof)
- [Typeclass Instance](#typeclass-instance)
  - [boundedUInt8](#boundeduint8)
  - [commutativeRingUInt8](#commutativeringuint8)
  - [enumUInt8](#enumuint8)
  - [eqUInt8](#equint8)
  - [euclideanRingUInt8](#euclideanringuint8)
  - [hasPowUInt8](#haspowuint8)
  - [hasToIntUInt8](#hastointuint8)
  - [hasToRationalUInt8](#hastorationaluint8)
  - [integralUInt8](#integraluint8)
  - [numericUInt8](#numericuint8)
  - [ordUInt8](#orduint8)
  - [ringUInt8](#ringuint8)
  - [semiringUInt8](#semiringuint8)
  - [showUInt8](#showuint8)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [UInt8](#uint8)
  - [add](#add)
  - [bottom](#bottom)
  - [compare](#compare)
  - [degree](#degree)
  - [div](#div)
  - [equals](#equals)
  - [fromInt](#fromint)
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
  - [toRational](#torational)
  - [top](#top)
  - [zero](#zero)

---

# Constructor

## fromNumber

Attempts to construct a [[UInt8]] from a `number`, computing `none` if
the number is not an integer in the bounds of UInt8, otherwise `some(n)`.

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<UInt8>
```

Added in v1.0.0

## fromNumberLossy

Constructs a [[UInt8]] from a `number`, wrapping the value if it overflows
the range of [[UInt8]].

**Signature**

```ts
export declare function fromNumberLossy(n: number): UInt8
```

Added in v1.0.0

## of

Constructs a UInt8 from [[Digits]]

**Signature**

```ts
export declare function of(zero: 0): UInt8
export declare function of(...digits: Digits): NonZero<UInt8>
```

Added in v1.0.0

## unsafeFromNumber

Attempts to construct a [[UInt8]] from a `number`, throwing a RangeError if
the number is not an integer in the bounds of UInt8.

**Signature**

```ts
export declare function unsafeFromNumber(n: number): UInt8
```

Added in v1.0.0

# Data Type

## UInt8 (interface)

**Signature**

```ts
export interface UInt8 extends NonNegative<{}> {
  /**
   * @internal
   */
  readonly [U_INT_8]: unique symbol
}
```

Added in v1.0.0

# Transformation

## toNumber

**Signature**

```ts
export declare function toNumber(i: UInt8): number
```

Added in v1.0.0

# Type Guard

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is UInt8
```

Added in v1.0.0

# Typeclass Instance

## boundedUInt8

**Signature**

```ts
export declare const boundedUInt8: Bounded<UInt8>
```

Added in v1.0.0

## commutativeRingUInt8

**Signature**

```ts
export declare const commutativeRingUInt8: CommutativeRing<UInt8>
```

Added in v1.0.0

## enumUInt8

**Signature**

```ts
export declare const enumUInt8: Enum<UInt8>
```

Added in v1.0.0

## eqUInt8

**Signature**

```ts
export declare const eqUInt8: Eq<UInt8>
```

Added in v1.0.0

## euclideanRingUInt8

**Signature**

```ts
export declare const euclideanRingUInt8: EuclideanRing<UInt8>
```

Added in v1.0.0

## hasPowUInt8

**Signature**

```ts
export declare const hasPowUInt8: HasPow<UInt8>
```

Added in v1.0.0

## hasToIntUInt8

**Signature**

```ts
export declare const hasToIntUInt8: HasToInt<UInt8>
```

Added in v1.0.0

## hasToRationalUInt8

**Signature**

```ts
export declare const hasToRationalUInt8: HasToRational<UInt8>
```

Added in v1.0.0

## integralUInt8

**Signature**

```ts
export declare const integralUInt8: Integral<UInt8>
```

Added in v1.0.0

## numericUInt8

**Signature**

```ts
export declare const numericUInt8: Numeric<UInt8>
```

Added in v1.0.0

## ordUInt8

**Signature**

```ts
export declare const ordUInt8: ord.Ord<UInt8>
```

Added in v1.0.0

## ringUInt8

**Signature**

```ts
export declare const ringUInt8: Ring<UInt8>
```

Added in v1.0.0

## semiringUInt8

**Signature**

```ts
export declare const semiringUInt8: Semiring<UInt8>
```

Added in v1.0.0

## showUInt8

**Signature**

```ts
export declare const showUInt8: Show<UInt8>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[UInt8]]

**Signature**

```ts
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [1, Digit, Digit]
  | [2, 0 | 1 | 2 | 3 | 4, Digit]
  | [2, 5, 0 | 1 | 2 | 3 | 4 | 5]
```

Added in v1.0.0

## UInt8

**Signature**

```ts
export declare const UInt8: Bounded<UInt8> &
  CommutativeRing<UInt8> &
  Enum<UInt8> &
  Eq<UInt8> &
  EuclideanRing<UInt8> &
  HasPow<UInt8> &
  HasToInt<UInt8> &
  HasToRational<UInt8> &
  Integral<UInt8> &
  Numeric<UInt8> &
  ord.Ord<UInt8> &
  Ring<UInt8> &
  Semiring<UInt8> &
  Show<UInt8> & {
    add: typeof add
    bottom: UInt8
    compare: typeof compare
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
    one: UInt8
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: UInt8
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: UInt8
  }
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: UInt8, b: UInt8): UInt8
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: UInt8
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare function compare(a: UInt8, b: UInt8): -1 | 0 | 1
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: UInt8): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: UInt8, d: NonZero<UInt8>): UInt8
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: UInt8, b: UInt8): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<UInt8>
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: UInt8, d: NonZero<UInt8>): UInt8
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: UInt8, b: UInt8): UInt8
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: UInt8): UInt8
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: UInt8): Option<UInt8>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: UInt8
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: UInt8, exp: UInt8): UInt8
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: UInt8): Option<UInt8>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: UInt8, b: NonZero<UInt8>): UInt8
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: UInt8, b: NonZero<UInt8>): UInt8
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: UInt8, b: UInt8): UInt8
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: UInt8): Int
```

Added in v1.0.0

## toInteger

**Signature**

```ts
export declare function toInteger(a: UInt8): Int
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: UInt8): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: UInt8
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: UInt8
```

Added in v1.0.0
