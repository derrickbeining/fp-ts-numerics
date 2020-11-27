---
title: Float32.ts
nav_order: 16
parent: Modules
---

## Float32 overview

This module provides a way to construct and work with signed, 32-bit
integers. They are just JavaScript`number`s under the hood, so they should
be comparable in performance.

Since they are limited to 32 bits, `Float32`s are subject to overflowing if
the result of any operation should exceed the range of -2^31 and 2^31 - 1.

To avoid integer overflow, see [[Int]] for arbitrary precision integers.

Like the rest of `fp-ts-numerics`, this module exposes the `Float32` type
and namespace as a single declaration. It is intended to be consumed like so:

```ts
import { Float32 } from 'fp-ts-numerics'

function isEven(n: Float32): boolean {
  return Float32.equals(Float32.zero, Float32.mod(n, Float32.of(2)))
}
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass Instance](#typeclass-instance)
  - [Bounded](#bounded)
  - [CommutativeRing](#commutativering)
  - [DivisionRing](#divisionring)
  - [Enum](#enum)
  - [Eq](#eq)
  - [EuclideanRing](#euclideanring)
  - [Field](#field)
  - [HasAdd](#hasadd)
  - [HasMul](#hasmul)
  - [HasOne](#hasone)
  - [HasPow](#haspow)
  - [HasSub](#hassub)
  - [HasZero](#haszero)
  - [Numeric](#numeric)
  - [Ord](#ord)
  - [Ring](#ring)
  - [Semiring](#semiring)
  - [Show](#show)
- [utils](#utils)
  - [Arbitrary](#arbitrary)
  - [Digits (type alias)](#digits-type-alias)
  - [Float32](#float32)
  - [Float32 (interface)](#float32-interface)
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
  - [recip](#recip)
  - [rem](#rem)
  - [sub](#sub)
  - [toInt](#toint)
  - [toInteger](#tointeger)
  - [toNumber](#tonumber)
  - [top](#top)
  - [unsafeFromNumber](#unsafefromnumber)
  - [zero](#zero)

---

# Typeclass Instance

## Bounded

**Signature**

```ts
export declare const Bounded: Bounded<Float32>
```

Added in v1.0.0

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: Ring<Float32>
```

Added in v1.0.0

## DivisionRing

Instance of [[DivisionRing]] for `Float32`

**Signature**

```ts
export declare const DivisionRing: DivisionRing<Float32>
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: Enum<Float32>
```

Added in v1.0.0

## Eq

**Signature**

```ts
export declare const Eq: Eq<Float32>
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<Float32>
```

Added in v1.0.0

## Field

Instance of [[Field]] for `Float32`

**Signature**

```ts
export declare const Field: Field<Float32>
```

Added in v1.0.0

## HasAdd

**Signature**

```ts
export declare const HasAdd: HasAdd<Float32>
```

Added in v1.0.0

## HasMul

**Signature**

```ts
export declare const HasMul: HasMul<Float32>
```

Added in v1.0.0

## HasOne

**Signature**

```ts
export declare const HasOne: HasOne<Float32>
```

Added in v1.0.0

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<Float32>
```

Added in v1.0.0

## HasSub

**Signature**

```ts
export declare const HasSub: HasSub<Float32>
```

Added in v1.0.0

## HasZero

**Signature**

```ts
export declare const HasZero: HasZero<Float32>
```

Added in v1.0.0

## Numeric

**Signature**

```ts
export declare const Numeric: Numeric<Float32>
```

Added in v1.0.0

## Ord

**Signature**

```ts
export declare const Ord: Ord<Float32>
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: Ring<Float32>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<Float32>
```

Added in v1.0.0

## Show

**Signature**

```ts
export declare const Show: Show<Float32>
```

Added in v1.0.0

# utils

## Arbitrary

`Arbitrary<Float32>` from `fast-check`

**Signature**

```ts
export declare const Arbitrary: fc.Arbitrary<Float32>
```

Added in v1.0.0

## Digits (type alias)

A tuple of literal integers representing every valid sequence of digits for
[[Float32]]

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

## Float32

**Signature**

```ts
export declare const Float32: Bounded<Float32> &
  CommutativeRing<Float32> &
  Enum<Float32> &
  Eq<Float32> &
  EuclideanRing<Float32> &
  HasPow<Float32> &
  Numeric<Float32> &
  Ord<Float32> &
  Ring<Float32> &
  Semiring<Float32> &
  Show<Float32> & {
    Arbitrary: fc.Arbitrary<Float32>
    Bounded: Bounded<Float32>
    CommutativeRing: Ring<Float32>
    Enum: Enum<Float32>
    Eq: Eq<Float32>
    EuclideanRing: EuclideanRing<Float32>
    fromInt: typeof fromInt
    fromNumberLossy: typeof fromNumberLossy
    HasAdd: HasAdd<Float32>
    HasMul: HasMul<Float32>
    HasOne: HasOne<Float32>
    HasPow: HasPow<Float32>
    HasSub: HasSub<Float32>
    HasZero: HasZero<Float32>
    isTypeOf: typeof isTypeOf
    negate: typeof negate
    Numeric: Numeric<Float32>
    of: typeof of
    Ord: Ord<Float32>
    quot: typeof quot
    rem: typeof rem
    Ring: Ring<Float32>
    Semiring: Semiring<Float32>
    Show: Show<Float32>
    toInt: typeof toInt
    unsafeFromNumber: typeof unsafeFromNumber
  }
```

Added in v1.0.0

## Float32 (interface)

**Signature**

```ts
export interface Float32 extends Newtype<typeof FLOAT, Float64> {}
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Float32, b: Float32): Float32
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: Float32
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare const compare: (x: Float32, y: Float32) => Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Float32): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Float32, d: NonZero<Float32>): Float32
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Float32, b: Float32): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(int: Int): Option<Float32>
```

Added in v1.0.0

## fromNumber

**Signature**

```ts
export declare function fromNumber(n: number): option.Option<Float32>
```

Added in v1.0.0

## fromNumberLossy

Coerces a Float64 to Float32, using `Math.fround` internally.
If the input exceeds the range of `Float32`, it evaluates to
`Infinity` or `-Infinity`.

**Signature**

```ts
export declare function fromNumberLossy(n: number): Float32
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(x: unknown): x is Float32
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Float32, d: NonZero<Float32>): Float32
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Float32, b: Float32): Float32
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate(a: Float32): Float32
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(a: Float32): Option<Float32>
```

Added in v1.0.0

## of

Constructs a 32-bit, signed floating-point number.
Math.pow(2, 127) \* (2 - 1 / Math.pow(2, 23))

- Min value: -2^127 \* (2 - (1/2^23))
- Max value: 2^127 \* (2 - (1/2^23))

**Signature**

```ts
export declare function of(zero: 0): Float32
export declare function of(...digits: Digits): NonZero<Float32>
```

**Example**

```ts
import * as Float32 from 'fp-ts-numerics/Float32'

const f = Float32.of(2, 1, 4, 7, 4, 8, 3, 6, 4, 7)
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: Float32
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Float32, exp: Float32): Float32
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(a: Float32): Option<Float32>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Float32, b: NonZero<Float32>): Float32
```

Added in v1.0.0

## recip

**Signature**

```ts
export declare function recip(n: NonZero<Float32>): Float32
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Float32, b: NonZero<Float32>): Float32
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Float32, b: Float32): Float32
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(a: Float32): Option<Int>
```

Added in v1.0.0

## toInteger

**Signature**

```ts
export declare function toInteger(a: Float32): Int
```

Added in v1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: Float32): number
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: Float32
```

Added in v1.0.0

## unsafeFromNumber

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Float32
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: Float32
```

Added in v1.0.0
