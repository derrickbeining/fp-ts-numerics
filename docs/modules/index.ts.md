---
title: index.ts
nav_order: 27
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [CommutativeRing](#commutativering)
  - [CommutativeRingLaws](#commutativeringlaws)
  - [DivisionRing](#divisionring)
  - [DivisionRingExtra](#divisionringextra)
  - [DivisionRingLaws](#divisionringlaws)
  - [Enum](#enum)
  - [EuclideanRing](#euclideanring)
  - [EuclideanRingExtra](#euclideanringextra)
  - [EuclideanRingLaws](#euclideanringlaws)
  - [Field](#field)
  - [FieldLaws](#fieldlaws)
  - [Float](#float)
  - [Fractional](#fractional)
  - [HasFromInt](#hasfromint)
  - [HasFromRational](#hasfromrational)
  - [HasToInt](#hastoint)
  - [HasToRational](#hastorational)
  - [Int](#int)
  - [Int16](#int16)
  - [Int32](#int32)
  - [Int32Bits](#int32bits)
  - [Int8](#int8)
  - [Integral](#integral)
  - [Natural](#natural)
  - [NonNegative](#nonnegative)
  - [NonZero](#nonzero)
  - [Numeric](#numeric)
  - [Ratio](#ratio)
  - [Rational](#rational)
  - [Ring](#ring)
  - [RingExtra](#ringextra)
  - [RingLaws](#ringlaws)
  - [Semiring](#semiring)
  - [SemiringExtra](#semiringextra)
  - [UInt16](#uint16)
  - [UInt32](#uint32)
  - [UInt8](#uint8)
  - [arbitraryFloat](#arbitraryfloat)
  - [arbitraryInt](#arbitraryint)
  - [arbitraryNatural](#arbitrarynatural)
  - [number](#number)

---

# utils

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: typeof CommutativeRing
```

Added in v1.0.0

## CommutativeRingLaws

**Signature**

```ts
export declare const CommutativeRingLaws: typeof CommutativeRingLaws
```

Added in v1.0.0

## DivisionRing

**Signature**

```ts
export declare const DivisionRing: typeof DivisionRing
```

Added in v1.0.0

## DivisionRingExtra

**Signature**

```ts
export declare const DivisionRingExtra: typeof DivisionRingExtra
```

Added in v1.0.0

## DivisionRingLaws

**Signature**

```ts
export declare const DivisionRingLaws: typeof DivisionRingLaws
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: typeof Enum
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: typeof EuclideanRing
```

Added in v1.0.0

## EuclideanRingExtra

**Signature**

```ts
export declare const EuclideanRingExtra: typeof EuclideanRingExtra
```

Added in v1.0.0

## EuclideanRingLaws

**Signature**

```ts
export declare const EuclideanRingLaws: typeof EuclideanRingLaws
```

Added in v1.0.0

## Field

**Signature**

```ts
export declare const Field: typeof Field
```

Added in v1.0.0

## FieldLaws

**Signature**

```ts
export declare const FieldLaws: typeof FieldLaws
```

Added in v1.0.0

## Float

**Signature**

```ts
export declare const Float: Bounded<Float> &
  CommutativeRing.CommutativeRing<Float> &
  Enum.Enum<Float> &
  Eq<Float> &
  EuclideanRing.EuclideanRing<Float> &
  HasPow<Float> &
  HasToInt.HasToInt<Float> &
  HasToRational.HasToRational<Float> &
  Integral.Integral<Float> &
  Numeric.Numeric<Float> &
  Ord<Float> &
  Ring.Ring<Float> &
  Ring.Semiring<Float> &
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

## Fractional

**Signature**

```ts
export declare const Fractional: typeof Fractional
```

Added in v1.0.0

## HasFromInt

**Signature**

```ts
export declare const HasFromInt: typeof HasFromInt
```

Added in v1.0.0

## HasFromRational

**Signature**

```ts
export declare const HasFromRational: typeof HasFromRational
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: typeof HasToInt
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: typeof HasToRational
```

Added in v1.0.0

## Int

**Signature**

```ts
export declare const Int: Enum.Enum<Int> &
  CommutativeRing.CommutativeRing<Int> &
  EuclideanRing.EuclideanRing<Int> &
  Integral.Integral<Int> &
  HasToInt.HasToInt<Int> &
  HasToRational.HasToRational<Int> & {
    abs: (a: Int) => NonNegative.NonNegative<Int>
    IntConstructor: typeof IntConstructor
    fromNumber: typeof fromNumber
    fromString: typeof fromString
    unsafeFromNumber: typeof unsafeFromNumber
    unsafeToNumber: typeof unsafeToNumber
    isTypeOf: typeof isTypeOf
    toNumber: typeof toNumber
    toNumberLossy: typeof toNumberLossy
  } & typeof IntConstructor
```

Added in v1.0.0

## Int16

**Signature**

```ts
export declare const Int16: Bounded<Int16> &
  CommutativeRing.CommutativeRing<Int16> &
  Enum.Enum<Int16> &
  Eq<Int16> &
  EuclideanRing.EuclideanRing<Int16> &
  HasPow<Int16> &
  HasToInt.HasToInt<Int16> &
  HasToRational.HasToRational<Int16> &
  Integral.Integral<Int16> &
  Numeric.Numeric<Int16> &
  Ord<Int16> &
  Ring.Ring<Int16> &
  Ring.Semiring<Int16> &
  Show<Int16> & {
    add: typeof add
    bottom: Int16
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
    one: Int16
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
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

## Int32

**Signature**

```ts
export declare const Int32: Bounded<Int32> &
  CommutativeRing.CommutativeRing<Int32> &
  Enum.Enum<Int32> &
  Eq<Int32> &
  EuclideanRing.EuclideanRing<Int32> &
  HasPow<Int32> &
  HasToInt.HasToInt<Int32> &
  HasToRational.HasToRational<Int32> &
  Integral.Integral<Int32> &
  Numeric.Numeric<Int32> &
  Ord<Int32> &
  Ring.Ring<Int32> &
  Ring.Semiring<Int32> &
  Show<Int32> & {
    add: typeof add
    bottom: Int32
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
    one: Int32
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
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

## Int32Bits

**Signature**

```ts
export declare const Int32Bits: typeof Int32Bits
```

Added in v1.0.0

## Int8

**Signature**

```ts
export declare const Int8: Bounded<Int8> &
  CommutativeRing.CommutativeRing<Int8> &
  Enum.Enum<Int8> &
  Eq<Int8> &
  EuclideanRing.EuclideanRing<Int8> &
  HasPow<Int8> &
  HasToInt.HasToInt<Int8> &
  HasToRational.HasToRational<Int8> &
  Integral.Integral<Int8> &
  Numeric.Numeric<Int8> &
  Ord<Int8> &
  Ring.Ring<Int8> &
  Ring.Semiring<Int8> &
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

## Integral

**Signature**

```ts
export declare const Integral: typeof Integral
```

Added in v1.0.0

## Natural

**Signature**

```ts
export declare const Natural: Enum.Enum<Natural> &
  Integral.Integral<Natural> &
  HasToInt.HasToInt<Natural> &
  Ring.Semiring<Natural> & {
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

## NonNegative

**Signature**

```ts
export declare const NonNegative: typeof NonNegative
```

Added in v1.0.0

## NonZero

**Signature**

```ts
export declare const NonZero: typeof NonZero
```

Added in v1.0.0

## Numeric

**Signature**

```ts
export declare const Numeric: typeof Numeric
```

Added in v1.0.0

## Ratio

**Signature**

```ts
export declare const Ratio: typeof Ratio
```

Added in v1.0.0

## Rational

**Signature**

```ts
export declare const Rational: typeof Rational
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: typeof Ring
```

Added in v1.0.0

## RingExtra

**Signature**

```ts
export declare const RingExtra: typeof RingExtra
```

Added in v1.0.0

## RingLaws

**Signature**

```ts
export declare const RingLaws: typeof RingLaws
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: typeof Semiring
```

Added in v1.0.0

## SemiringExtra

**Signature**

```ts
export declare const SemiringExtra: typeof SemiringExtra
```

Added in v1.0.0

## UInt16

**Signature**

```ts
export declare const UInt16: Bounded<UInt16> &
  CommutativeRing.CommutativeRing<UInt16> &
  Enum.Enum<UInt16> &
  Eq<UInt16> &
  EuclideanRing.EuclideanRing<UInt16> &
  HasPow<UInt16> &
  HasToInt.HasToInt<UInt16> &
  HasToRational.HasToRational<UInt16> &
  Integral.Integral<UInt16> &
  Numeric.Numeric<UInt16> &
  Ord<UInt16> &
  Ring.Ring<UInt16> &
  Ring.Semiring<UInt16> &
  Show<UInt16> & {
    add: typeof add
    bottom: UInt16
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
    one: UInt16
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    rem: typeof rem
    sub: typeof sub
    toInt: typeof toInt
    toNumber: typeof toNumber
    top: UInt16
    toRational: typeof toRational
    unsafeFromNumber: typeof unsafeFromNumber
    zero: UInt16
  }
```

Added in v1.0.0

## UInt32

**Signature**

```ts
export declare const UInt32: Bounded<UInt32> &
  CommutativeRing.CommutativeRing<UInt32> &
  Enum.Enum<UInt32> &
  Eq<UInt32> &
  EuclideanRing.EuclideanRing<UInt32> &
  HasPow<UInt32> &
  HasToInt.HasToInt<UInt32> &
  HasToRational.HasToRational<UInt32> &
  Integral.Integral<UInt32> &
  Numeric.Numeric<UInt32> &
  Ord<UInt32> &
  Ring.Ring<UInt32> &
  Ring.Semiring<UInt32> &
  Show<UInt32> & {
    add: typeof add
    bottom: UInt32
    boundedUInt32: Bounded<UInt32>
    compare: typeof compare
    div: typeof div
    enumUInt32: Enum.Enum<UInt32>
    eqUInt32: Eq<UInt32>
    equals: typeof equals
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    fromNumberLossy: typeof fromNumberLossy
    integralUInt32: Integral.Integral<UInt32>
    isTypeOf: typeof isTypeOf
    mod: typeof mod
    mul: typeof mul
    negate: typeof negate
    next: typeof next
    numericUInt32: Numeric.Numeric<UInt32>
    of: typeof of
    one: UInt32
    ordUInt32: Ord<UInt32>
    pow: typeof pow
    prev: typeof prev
    quot: typeof quot
    hasToRationalUInt32: HasToRational.HasToRational<UInt32>
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

## UInt8

**Signature**

```ts
export declare const UInt8: Bounded<UInt8> &
  CommutativeRing.CommutativeRing<UInt8> &
  Enum.Enum<UInt8> &
  Eq<UInt8> &
  EuclideanRing.EuclideanRing<UInt8> &
  HasPow<UInt8> &
  HasToInt.HasToInt<UInt8> &
  HasToRational.HasToRational<UInt8> &
  Integral.Integral<UInt8> &
  Numeric.Numeric<UInt8> &
  Ord<UInt8> &
  Ring.Ring<UInt8> &
  Ring.Semiring<UInt8> &
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

## arbitraryFloat

**Signature**

```ts
export declare const arbitraryFloat: Arbitrary<Float>
```

Added in v1.0.0

## arbitraryInt

**Signature**

```ts
export declare const arbitraryInt: Arbitrary<Int>
```

Added in v1.0.0

## arbitraryNatural

**Signature**

```ts
export declare const arbitraryNatural: Arbitrary<Natural>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Bounded<number> &
  CommutativeRing.CommutativeRing<number> &
  DivisionRing.DivisionRing<number> &
  Eq<number> &
  EuclideanRing.EuclideanRing<number> &
  Field.Field<number> &
  Ord<number> &
  Ring.Ring<number> &
  Ring.Semiring<number> &
  Show<number>
```

Added in v1.0.0
