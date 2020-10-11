---
title: Float.ts
nav_order: 18
parent: Modules
---

## Float overview

This module provides a way to construct and work with signed, 32-bit
integers. They are just JavaScript`number`s under the hood, so they should
be comparable in performance.

Since they are limited to 32 bits, `Float`s are subject to overflowing if
the result of any operation should exceed the range of -2^31 and 2^31 - 1.

To avoid integer overflow, see [[Int]] for arbitrary precision integers.

Like the rest of `fp-ts-numerics`, this module exposes the `Float` type
and namespace as a single declaration. It is intended to be consumed like so:

```ts
import { Float } from 'fp-ts-numerics'

function isEven(n: Float): boolean {
  return Float.equals(Float.zero, Float.mod(n, Float.of(2)))
}
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass Instance](#typeclass-instance)
  - [boundedFloat](#boundedfloat)
  - [commutativeRingFloat](#commutativeringfloat)
  - [enumFloat](#enumfloat)
  - [eqFloat](#eqfloat)
  - [euclideanRingFloat](#euclideanringfloat)
  - [hasPowFloat](#haspowfloat)
  - [hasToIntFloat](#hastointfloat)
  - [hasToRationalFloat](#hastorationalfloat)
  - [integralFloat](#integralfloat)
  - [numericFloat](#numericfloat)
  - [ordFloat](#ordfloat)
  - [ringFloat](#ringfloat)
  - [semiringFloat](#semiringfloat)
  - [showFloat](#showfloat)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [Float](#float)
  - [Float (interface)](#float-interface)
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
  - [toInteger](#tointeger)
  - [toNumber](#tonumber)
  - [toRational](#torational)
  - [top](#top)
  - [unsafeFromNumber](#unsafefromnumber)
  - [zero](#zero)

---

# Typeclass Instance

## boundedFloat

**Signature**

```ts
export declare const boundedFloat: Bounded<Float>
```

Added in v1.0.0

## commutativeRingFloat

**Signature**

```ts
export declare const commutativeRingFloat: CommutativeRing<Float>
```

Added in v1.0.0

## enumFloat

**Signature**

```ts
export declare const enumFloat: Enum<Float>
```

Added in v1.0.0

## eqFloat

**Signature**

```ts
export declare const eqFloat: Eq<Float>
```

Added in v1.0.0

## euclideanRingFloat

**Signature**

```ts
export declare const euclideanRingFloat: EuclideanRing<Float>
```

Added in v1.0.0

## hasPowFloat

**Signature**

```ts
export declare const hasPowFloat: HasPow<Float>
```

Added in v1.0.0

## hasToIntFloat

**Signature**

```ts
export declare const hasToIntFloat: HasToInt<Float>
```

Added in v1.0.0

## hasToRationalFloat

**Signature**

```ts
export declare const hasToRationalFloat: HasToRational<Float>
```

Added in v1.0.0

## integralFloat

**Signature**

```ts
export declare const integralFloat: Integral<Float>
```

Added in v1.0.0

## numericFloat

**Signature**

```ts
export declare const numericFloat: Numeric<Float>
```

Added in v1.0.0

## ordFloat

**Signature**

```ts
export declare const ordFloat: ord.Ord<Float>
```

Added in v1.0.0

## ringFloat

**Signature**

```ts
export declare const ringFloat: Ring<Float>
```

Added in v1.0.0

## semiringFloat

**Signature**

```ts
export declare const semiringFloat: Semiring<Float>
```

Added in v1.0.0

## showFloat

**Signature**

```ts
export declare const showFloat: Show<Float>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[Float]]

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

## Float

**Signature**

```ts
export declare const Float: Bounded<Float> &
  CommutativeRing<Float> &
  Enum<Float> &
  Eq<Float> &
  EuclideanRing<Float> &
  HasPow<Float> &
  HasToInt<Float> &
  HasToRational<Float> &
  Integral<Float> &
  Numeric<Float> &
  ord.Ord<Float> &
  Ring<Float> &
  Semiring<Float> &
  Show<Float> & {
    add: typeof add
    bottom: Float
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
    one: Float
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: Float
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: Float
  }
```

Added in v1.0.0

## Float (interface)

**Signature**

```ts
export interface Float {
  /**
   * @internal
   */
  readonly [FLOAT]: unique symbol
}
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Float, b: Float): Float
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: Float
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare function compare(a: Float, b: Float): -1 | 0 | 1
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Float): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Float, d: NonZero<Float>): Float
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Float, b: Float): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<Float>
```

Added in v1.0.0

## fromNumber

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<Float>
```

Added in v1.0.0

## fromNumberLossy

**Signature**

```ts
export declare function fromNumberLossy(n: number): Float
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is Float
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Float, d: NonZero<Float>): Float
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Float, b: Float): Float
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: Float): Float
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: Float): Option<Float>
```

Added in v1.0.0

## of

Constructs a 32-bit, signed floating-point number.
Math.pow(2, 127) \* (2 - 1 / Math.pow(2, 23))

- Min value: -2^127 \* (2 - (1/2^23))
- Max value: 2^127 \* (2 - (1/2^23))

**Signature**

```ts
export declare function of(zero: 0): Float
export declare function of(...digits: Digits): NonZero<Float>
```

**Example**

```ts
import * as Float from 'fp-ts-numerics/Float'

const f = Float.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: Float
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Float, exp: Float): Float
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: Float): Option<Float>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Float, b: NonZero<Float>): Float
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Float, b: NonZero<Float>): Float
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Float, b: Float): Float
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: Float): Int
```

Added in v1.0.0

## toInteger

**Signature**

```ts
export declare function toInteger(a: Float): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: Float): number
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: Float): Rational
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: Float
```

Added in v1.0.0

## unsafeFromNumber

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Float
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: Float
```

Added in v1.0.0
