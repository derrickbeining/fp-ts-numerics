---
title: Int8.ts
nav_order: 33
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
  - [boundedInt8](#boundedint8)
  - [commutativeRingInt8](#commutativeringint8)
  - [enumInt8](#enumint8)
  - [eqInt8](#eqint8)
  - [euclideanRingInt8](#euclideanringint8)
  - [hasPowInt8](#haspowint8)
  - [hasToIntInt8](#hastointint8)
  - [hasToRationalInt8](#hastorationalint8)
  - [integralInt8](#integralint8)
  - [numericInt8](#numericint8)
  - [ordInt8](#ordint8)
  - [ringInt8](#ringint8)
  - [semiringInt8](#semiringint8)
  - [showInt8](#showint8)
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

## boundedInt8

**Signature**

```ts
export declare const boundedInt8: Bounded<Int8>
```

Added in v1.0.0

## commutativeRingInt8

**Signature**

```ts
export declare const commutativeRingInt8: CommutativeRing<Int8>
```

Added in v1.0.0

## enumInt8

**Signature**

```ts
export declare const enumInt8: Enum<Int8>
```

Added in v1.0.0

## eqInt8

**Signature**

```ts
export declare const eqInt8: Eq<Int8>
```

Added in v1.0.0

## euclideanRingInt8

**Signature**

```ts
export declare const euclideanRingInt8: EuclideanRing<Int8>
```

Added in v1.0.0

## hasPowInt8

**Signature**

```ts
export declare const hasPowInt8: HasPow<Int8>
```

Added in v1.0.0

## hasToIntInt8

**Signature**

```ts
export declare const hasToIntInt8: HasToInt<Int8>
```

Added in v1.0.0

## hasToRationalInt8

**Signature**

```ts
export declare const hasToRationalInt8: HasToRational<Int8>
```

Added in v1.0.0

## integralInt8

**Signature**

```ts
export declare const integralInt8: Integral<Int8>
```

Added in v1.0.0

## numericInt8

**Signature**

```ts
export declare const numericInt8: Numeric<Int8>
```

Added in v1.0.0

## ordInt8

**Signature**

```ts
export declare const ordInt8: ord.Ord<Int8>
```

Added in v1.0.0

## ringInt8

**Signature**

```ts
export declare const ringInt8: Ring<Int8>
```

Added in v1.0.0

## semiringInt8

**Signature**

```ts
export declare const semiringInt8: Semiring<Int8>
```

Added in v1.0.0

## showInt8

**Signature**

```ts
export declare const showInt8: Show<Int8>
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
  ord.Ord<Int8> &
  Ring<Int8> &
  Semiring<Int8> &
  Show<Int8> & {
    add: typeof add
    bottom: Int8
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
    one: Int8
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
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
export interface Int8 {
  /**
   * @internal
   */
  readonly [INT_8]: unique symbol
}
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
export declare function compare(a: Int8, b: Int8): -1 | 0 | 1
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
