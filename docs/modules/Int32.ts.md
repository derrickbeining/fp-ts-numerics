---
title: Int32.ts
nav_order: 34
parent: Modules
---

## Int32 overview

This module provides a way to construct and work with signed, 32-bit
integers. They are just JavaScript`number`s under the hood, so they should
be comparable in performance.

Since they are limited to 32 bits, `Int32`s are subject to overflowing if
the result of any operation should exceed the range of -2^31 and 2^31 - 1.

To avoid integer overflow, see [[Int]] for arbitrary precision integers.

Like the rest of `fp-ts-numerics`, this module exposes the `Int32` type
and namespace as a single declaration. It is intended to be consumed like so:

```ts
import { Int32 } from 'fp-ts-numerics'

function isEven(n: Int32): boolean {
  return Int32.equals(Int32.zero, Int32.mod(n, Int32.of(2)))
}
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass Instance](#typeclass-instance)
  - [Bounded](#bounded)
  - [CommutativeRing](#commutativering)
  - [Enum](#enum)
  - [Eq](#eq)
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
  - [Int32](#int32)
  - [Int32 (interface)](#int32-interface)
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
  - [of](#of)
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

# Typeclass Instance

## Bounded

**Signature**

```ts
export declare const Bounded: Bounded<Int32>
```

Added in v1.0.0

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: CommutativeRing<Int32>
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: Enum<Int32>
```

Added in v1.0.0

## Eq

**Signature**

```ts
export declare const Eq: Eq<Int32>
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<Int32>
```

Added in v1.0.0

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<Int32>
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: HasToInt<Int32>
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: HasToRational<Int32>
```

Added in v1.0.0

## Integral

**Signature**

```ts
export declare const Integral: Integral<Int32>
```

Added in v1.0.0

## Numeric

**Signature**

```ts
export declare const Numeric: Numeric<Int32>
```

Added in v1.0.0

## Ord

**Signature**

```ts
export declare const Ord: Ord<Int32>
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: Ring<Int32>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<Int32>
```

Added in v1.0.0

## Show

**Signature**

```ts
export declare const Show: Show<Int32>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
`Int32`

**Signature**

```ts
export type Digits =
  | [-1 | 0 | 1]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [LeadingDigit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [LeadingDigit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [-1 | 1, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [-2 | 2, 0, Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [-2 | 2, 1, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
  | [-2 | 2, 1, 4, Exclude<Digit, 7 | 8 | 9>, Digit, Digit, Digit, Digit, Digit, Digit]
  | [-2 | 2, 1, 4, 7, 0 | 1 | 2 | 3, Digit, Digit, Digit, Digit, Digit]
  | [-2 | 2, 1, 4, 7, 4, Exclude<Digit, 8 | 9>, Digit, Digit, Digit, Digit]
  | [-2 | 2, 1, 4, 7, 4, 8, 0 | 1 | 2, Digit, Digit, Digit]
  | [-2 | 2, 1, 4, 7, 4, 8, 3, 0 | 1 | 2 | 3 | 4 | 5, Digit, Digit]
  | [-2 | 2, 1, 4, 7, 4, 8, 3, 6, 0 | 1 | 2 | 3, Digit]
  | [-2 | 2, 1, 4, 7, 4, 8, 3, 6, 4, Exclude<Digit, 8 | 9>]
  | [-2, 1, 4, 7, 4, 8, 3, 6, 4, 8]
```

Added in v1.0.0

## Int32

**Signature**

```ts
export declare const Int32: Bounded<Int32> &
  CommutativeRing<Int32> &
  Enum<Int32> &
  Eq<Int32> &
  EuclideanRing<Int32> &
  HasPow<Int32> &
  HasToInt<Int32> &
  HasToRational<Int32> &
  Integral<Int32> &
  Numeric<Int32> &
  Ord<Int32> &
  Ring<Int32> &
  Semiring<Int32> &
  Show<Int32> & {
    add: typeof add
    bottom: Int32
    Bounded: Bounded<Int32>
    CommutativeRing: CommutativeRing<Int32>
    compare: (x: Int32, y: Int32) => Ordering
    div: typeof div
    Enum: Enum<Int32>
    Eq: Eq<Int32>
    equals: typeof equals
    EuclideanRing: EuclideanRing<Int32>
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    HasPow: HasPow<Int32>
    HasToInt: HasToInt<Int32>
    HasToRational: HasToRational<Int32>
    Integral: Integral<Int32>
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    Numeric: Numeric<Int32>
    of: typeof of
    one: Int32
    Ord: Ord<Int32>
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    Ring: Ring<Int32>
    Semiring: Semiring<Int32>
    Show: Show<Int32>
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: Int32
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: Int32
  }
```

Added in v1.0.0

## Int32 (interface)

**Signature**

```ts
export interface Int32 extends Newtype<typeof INT_32, number> {}
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: Int32
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare const compare: (x: Int32, y: Int32) => Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Int32): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Int32, d: NonZero<Int32>): Int32
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Int32, b: Int32): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<Int32>
```

Added in v1.0.0

## fromNumber

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<Int32>
```

Added in v1.0.0

## fromNumberLossy

**Signature**

```ts
export declare function fromNumberLossy(n: number): Int32
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is Int32
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Int32, d: NonZero<Int32>): Int32
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: Int32): Int32
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: Int32): Option<Int32>
```

Added in v1.0.0

## of

Constructs a 32-bit, signed, two's complement integer.

- Min value: -2^31
- Max value: 2^31 - 1

**Signature**

```ts
export declare function of(zero: 0): Int32
export declare function of(...digits: Digits): NonZero<Int32>
```

**Example**

```ts
import { Int32 } from 'fp-ts-numerics/Int32'

Int32.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
// > 21474883647
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: Int32
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Int32, exp: Int32): Int32
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: Int32): Option<Int32>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Int32, b: NonZero<Int32>): Int32
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Int32, b: NonZero<Int32>): Int32
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: Int32): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: Int32): number
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: Int32): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: Int32
```

Added in v1.0.0

## unsafeFromNumber

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Int32
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: Int32
```

Added in v1.0.0
