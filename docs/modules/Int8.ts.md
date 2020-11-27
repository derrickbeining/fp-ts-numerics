---
title: Int8.ts
nav_order: 35
parent: Modules
---

## Int8 overview

This module provides a way to construct and work with signed, 8-bit
integers. They are just JavaScript`number`s under the hood, so they should
be comparable in performance.

Since they are limited to 8 bits, `Int8`s are subject to overflowing if
the result of any operation should exceed the range of -2^7 and 2^7 -1.

To avoid integer overflow, see [[Int]] for arbitrary precision integers.

Like the rest of `fp-ts-numerics`, this module exposes the `Int8` type
and namespace as a single declaration. It is intended to be consumed like so:

```ts
import { Int8 } from 'fp-ts-numerics'

function isEven(n: Int8): boolean {
  return Int8.equals(Int8.zero, Int8.mod(n, Int8.of(2)))
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
  - [Int8](#int8)
  - [Int8 (interface)](#int8-interface)
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
export declare const Bounded: Bounded<Int8>
```

Added in v1.0.0

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: CommutativeRing<Int8>
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: Enum<Int8>
```

Added in v1.0.0

## Eq

**Signature**

```ts
export declare const Eq: Eq<Int8>
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<Int8>
```

Added in v1.0.0

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<Int8>
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: HasToInt<Int8>
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: HasToRational<Int8>
```

Added in v1.0.0

## Integral

**Signature**

```ts
export declare const Integral: Integral<Int8>
```

Added in v1.0.0

## Numeric

**Signature**

```ts
export declare const Numeric: Numeric<Int8>
```

Added in v1.0.0

## Ord

**Signature**

```ts
export declare const Ord: Ord<Int8>
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: Ring<Int8>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<Int8>
```

Added in v1.0.0

## Show

**Signature**

```ts
export declare const Show: Show<Int8>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[Int8]]

**Signature**

```ts
export type Digits =
  | [0]
  | [LeadingDigit]
  | [LeadingDigit, Digit]
  | [-1 | 1, 0 | 1, Digit]
  | [-1 | 1, 2, Exclude<Digit, 8 | 9>]
```

Added in v1.0.0

## Int8

**Signature**

```ts
export declare const Int8: Bounded<Int8> &
  CommutativeRing<Int8> &
  Enum<Int8> &
  Eq<Int8> &
  EuclideanRing<Int8> &
  HasPow<Int8> &
  HasToInt<Int8> &
  HasToRational<Int8> &
  Integral<Int8> &
  Numeric<Int8> &
  Ord<Int8> &
  Ring<Int8> &
  Semiring<Int8> &
  Show<Int8> & {
    add: typeof add
    bottom: Int8
    Bounded: Bounded<Int8>
    CommutativeRing: CommutativeRing<Int8>
    compare: (x: Int8, y: Int8) => Ordering
    div: typeof div
    Enum: Enum<Int8>
    equals: typeof equals
    EuclideanRing: EuclideanRing<Int8>
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    HasPow: HasPow<Int8>
    HasToRational: HasToRational<Int8>
    Integral: Integral<Int8>
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    Numeric: Numeric<Int8>
    of: typeof of
    one: Int8
    Ord: Ord<Int8>
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    Ring: Ring<Int8>
    Semiring: Semiring<Int8>
    Show: Show<Int8>
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: Int8
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: Int8
  }
```

Added in v1.0.0

## Int8 (interface)

**Signature**

```ts
export interface Int8 extends Branded<Int16, typeof INT_8> {}
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Int8, b: Int8): Int8
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: Int8
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare const compare: (x: Int8, y: Int8) => Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Int8): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Int8, d: NonZero<Int8>): Int8
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Int8, b: Int8): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<Int8>
```

Added in v1.0.0

## fromNumber

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<Int8>
```

Added in v1.0.0

## fromNumberLossy

**Signature**

```ts
export declare function fromNumberLossy(n: number): Int8
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is Int8
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Int8, d: NonZero<Int8>): Int8
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Int8, b: Int8): Int8
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: Int8): Int8
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: Int8): Option<Int8>
```

Added in v1.0.0

## of

Constructs a 8-bit, signed, two's complement integer.

- Min value: -2^7
- Max value: 2^7 - 1

```ts
Int8.of(1, 2, 7)
// > 127
```

**Signature**

```ts
export declare function of(zero: 0): Int8
export declare function of(...digits: Digits): NonZero<Int8>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: Int8
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Int8, exp: Int8): Int8
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: Int8): Option<Int8>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Int8, b: NonZero<Int8>): Int8
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Int8, b: NonZero<Int8>): Int8
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Int8, b: Int8): Int8
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: Int8): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: Int8): number
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: Int8): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: Int8
```

Added in v1.0.0

## unsafeFromNumber

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Int8
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: Int8
```

Added in v1.0.0
