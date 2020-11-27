---
title: Int16.ts
nav_order: 32
parent: Modules
---

## Int16 overview

This module provides a way to construct and work with signed, 16-bit
integers. They are just JavaScript`number`s under the hood, so they should
be comparable in performance.

Since they are limited to 16 bits, `Int16`s are subject to overflowing if
the result of any operation should exceed the range of -2^15 and 2^15 - 1.

To avoid integer overflow, see [[Int]] for arbitrary precision integers.

Like the rest of `fp-ts-numerics`, this module exposes the `Int16` type
and namespace as a single declaration. It is intended to be consumed like so:

```ts
import { Int16 } from 'fp-ts-numerics'

function isEven(n: Int16): boolean {
  return Int16.equals(Int16.zero, Int16.mod(n, Int16.of(2)))
}
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [of](#of)
- [Data Type](#data-type)
  - [Int16 (interface)](#int16-interface)
- [Instances](#instances)
  - [Bounded](#bounded)
  - [CommutativeRing](#commutativering)
  - [Enum](#enum)
  - [EuclideanRing](#euclideanring)
  - [HasPow](#haspow)
  - [HasToInt](#hastoint)
  - [HasToRational](#hastorational)
  - [Integral](#integral)
  - [Numeric](#numeric)
  - [Ord](#ord)
  - [Ring](#ring)
  - [Semiring](#semiring)
  - [Show](#show)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [Int16](#int16)
  - [add](#add)
  - [bottom](#bottom)
  - [compare](#compare)
  - [degree](#degree)
  - [div](#div)
  - [equals](#equals)
  - [fromInt](#fromint)
  - [fromNumber](#fromnumber)
  - [fromNumberLossy](#fromnumberlossy)
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
  - [unsafeFromNumber](#unsafefromnumber)
  - [zero](#zero)

---

# Constructor

## of

Constructs a signed 16-bit integer.

- Min value: -2^15
- Max value: 2^15 - 1

**Signature**

```ts
export declare function of(zero: 0): Int16
export declare function of(...digits: Digits): NonZero<Int16>
```

**Example**

```ts
import { Int16 } from 'fp-ts-numerics/Int16'

Int16.of(3, 2, 7, 6, 7)
// > 32767
```

Added in v1.0.0

# Data Type

## Int16 (interface)

The type of signed, 16-bit integers. Subject to integer overflow.

```ts
const myInt: Int = Int(1, 0, 0)
```

**Signature**

```ts
export interface Int16 extends Branded<Int32, typeof INT_16> {}
```

Added in v1.0.0

# Instances

## Bounded

**Signature**

```ts
export declare const Bounded: Bounded<Int16>
```

Added in v1.0.0

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: CommutativeRing<Int16>
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: Enum<Int16>
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<Int16>
```

Added in v1.0.0

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<Int16>
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: HasToInt<Int16>
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: HasToRational<Int16>
```

Added in v1.0.0

## Integral

**Signature**

```ts
export declare const Integral: Integral<Int16>
```

Added in v1.0.0

## Numeric

**Signature**

```ts
export declare const Numeric: Numeric<Int16>
```

Added in v1.0.0

## Ord

**Signature**

```ts
export declare const Ord: Ord<Int16>
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: Ring<Int16>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<Int16>
```

Added in v1.0.0

## Show

**Signature**

```ts
export declare const Show: Show<Int16>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[Int16]]

**Signature**

```ts
export type Digits =
  | [-1 | 0 | 1]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [-2 | -1 | 1 | 2, Digit, Digit, Digit, Digit]
  | [-3 | 3, 0 | 1, Digit, Digit, Digit]
  | [-3 | 3, 2, Exclude<Digit, 7 | 8 | 9>, Digit, Digit]
  | [-3 | 3, 2, 7, 0 | 1 | 2 | 3 | 4 | 5, Digit]
  | [-3 | 3, 2, 7, 6, Exclude<Digit, 8 | 9>]
  | [-3, 2, 7, 6, 8]
```

Added in v1.0.0

## Int16

**Signature**

```ts
export declare const Int16: Bounded<Int16> &
  CommutativeRing<Int16> &
  Enum<Int16> &
  Eq<Int16> &
  EuclideanRing<Int16> &
  HasPow<Int16> &
  HasToInt<Int16> &
  HasToRational<Int16> &
  Integral<Int16> &
  Numeric<Int16> &
  Ord<Int16> &
  Ring<Int16> &
  Semiring<Int16> &
  Show<Int16> & {
    add: typeof add
    bottom: Int16
    Bounded: Bounded<Int16>
    CommutativeRing: CommutativeRing<Int16>
    compare: (x: Int16, y: Int16) => Ordering
    div: typeof div
    Enum: Enum<Int16>
    Eq: Eq<Int16>
    equals: typeof equals
    EuclideanRing: EuclideanRing<Int16>
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    HasPow: HasPow<Int16>
    HasToInt: HasToInt<Int16>
    HasToRational: HasToRational<Int16>
    Integral: Integral<Int16>
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    Numeric: Numeric<Int16>
    of: typeof of
    one: Int16
    Ord: Ord<Int16>
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    Ring: Ring<Int16>
    Semiring: Semiring<Int16>
    Show: Show<Int16>
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: Int16
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: Int16
  }
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Int16, b: Int16): Int16
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: Int16
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare const compare: (x: Int16, y: Int16) => Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Int16): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Int16, d: NonZero<Int16>): Int16
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Int16, b: Int16): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(n: Int): Option<Int16>
```

Added in v1.0.0

## fromNumber

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<Int16>
```

Added in v1.0.0

## fromNumberLossy

**Signature**

```ts
export declare function fromNumberLossy(n: number): Int16
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is Int16
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Int16, d: NonZero<Int16>): Int16
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Int16, b: Int16): Int16
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: Int16): Int16
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: Int16): Option<Int16>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: Int16
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Int16, exp: Int16): Int16
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: Int16): Option<Int16>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Int16, b: NonZero<Int16>): Int16
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Int16, b: NonZero<Int16>): Int16
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Int16, b: Int16): Int16
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: Int16): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: Int16): number
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: Int16): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: Int16
```

Added in v1.0.0

## unsafeFromNumber

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Int16
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: Int16
```

Added in v1.0.0
