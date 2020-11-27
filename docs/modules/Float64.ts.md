---
title: Float64.ts
nav_order: 17
parent: Modules
---

## Float64 overview

_WARNING:_
`Float64` cannot be a fully law-abiding member of several classes due
to the potential for arithmetic overflows and the presence of `NaN` and
`Infinity` values. Behaviour is unspecified in these cases.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass Instance](#typeclass-instance)
  - [Arbitrary](#arbitrary)
  - [Bounded](#bounded)
  - [CommutativeRing](#commutativering)
  - [DivisionRing](#divisionring)
  - [Eq](#eq)
  - [EuclideanRing](#euclideanring)
  - [Field](#field)
  - [HasAdd](#hasadd)
  - [HasMul](#hasmul)
  - [HasOne](#hasone)
  - [HasSub](#hassub)
  - [HasZero](#haszero)
  - [Ord](#ord)
  - [Ring](#ring)
  - [Semiring](#semiring)
  - [Show](#show)
- [utils](#utils)
  - [Float64](#float64)
  - [Float64 (type alias)](#float64-type-alias)
  - [add](#add)
  - [bottom](#bottom)
  - [compare](#compare)
  - [degree](#degree)
  - [div](#div)
  - [equals](#equals)
  - [mod](#mod)
  - [mul](#mul)
  - [one](#one)
  - [recip](#recip)
  - [show](#show)
  - [sub](#sub)
  - [top](#top)
  - [zero](#zero)

---

# Typeclass Instance

## Arbitrary

`Arbitrary<Float64>` instance from `fast-check`

**Signature**

```ts
export declare const Arbitrary: fc.Arbitrary<number>
```

Added in v1.0.0

## Bounded

Instance of [[Bouned]] for `Float64`

**Signature**

```ts
export declare const Bounded: Bounded<number>
```

Added in v1.0.0

## CommutativeRing

Instance of [[CommutativeRing]] for `Float64`

**Signature**

```ts
export declare const CommutativeRing: CommutativeRing<number>
```

Added in v1.0.0

## DivisionRing

Instance of [[DivisionRing]] for `Float64`

**Signature**

```ts
export declare const DivisionRing: DivisionRing<number>
```

Added in v1.0.0

## Eq

Instance of `Eq` for `Float64`

**Signature**

```ts
export declare const Eq: Eq<number>
```

Added in v1.0.0

## EuclideanRing

Instance of [[EuclideanRing]] for `Float64`

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<number>
```

Added in v1.0.0

## Field

Instance of [[Field]] for `Float64`

**Signature**

```ts
export declare const Field: Field<number>
```

Added in v1.0.0

## HasAdd

**Signature**

```ts
export declare const HasAdd: HasAdd<number>
```

Added in v1.0.0

## HasMul

**Signature**

```ts
export declare const HasMul: HasMul<number>
```

Added in v1.0.0

## HasOne

**Signature**

```ts
export declare const HasOne: HasOne<number>
```

Added in v1.0.0

## HasSub

**Signature**

```ts
export declare const HasSub: HasSub<number>
```

Added in v1.0.0

## HasZero

**Signature**

```ts
export declare const HasZero: HasZero<number>
```

Added in v1.0.0

## Ord

Instance of `Ord` for `Float64`

**Signature**

```ts
export declare const Ord: Ord<number>
```

Added in v1.0.0

## Ring

Instance of [[Ring]] for `Float64`

**Signature**

```ts
export declare const Ring: Ring<number>
```

Added in v1.0.0

## Semiring

Instance of [[Semiring]] for `Float64`

**Signature**

```ts
export declare const Semiring: Semiring<number>
```

Added in v1.0.0

## Show

Instance of `Ord` for `Float64`

**Signature**

```ts
export declare const Show: Show<number>
```

Added in v1.0.0

# utils

## Float64

**Signature**

```ts
export declare const Float64: Bounded<number> &
  CommutativeRing<number> &
  DivisionRing<number> &
  Eq<number> &
  EuclideanRing<number> &
  Field<number> &
  HasAdd<number> &
  HasMul<number> &
  HasOne<number> &
  HasSub<number> &
  HasZero<number> &
  Ord<number> &
  Ring<number> &
  Semiring<number> &
  Show<number> & {
    Arbitrary: fc.Arbitrary<number>
    Bounded: Bounded<number>
    CommutativeRing: CommutativeRing<number>
    DivisionRing: DivisionRing<number>
    Eq: Eq<number>
    EuclideanRing: EuclideanRing<number>
    Field: Field<number>
    HasAdd: HasAdd<number>
    HasMul: HasMul<number>
    HasOne: HasOne<number>
    HasSub: HasSub<number>
    HasZero: HasZero<number>
    Ord: Ord<number>
    Ring: Ring<number>
    Semiring: Semiring<number>
    Show: Show<number>
  }
```

Added in v1.0.0

## Float64 (type alias)

Alias of the native JavaScript `number` type, which is in double-precision
64-bit binary format IEEE 754

**Signature**

```ts
export type Float64 = number
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(x: Float64, y: Float64): Float64
```

Added in v1.0.0

## bottom

**Signature**

```ts
export declare const bottom: number
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare const compare: (x: number, y: number) => Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(_: Float64): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(dvd: Float64, dvr: NonZero<Float64>): Float64
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare const equals: (x: number, y: number) => boolean
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(_: Float64, __: NonZero<Float64>): Float64
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(x: Float64, y: Float64): Float64
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: number
```

Added in v1.0.0

## recip

**Signature**

```ts
export declare function recip(n: NonZero<Float64>): Float64
```

Added in v1.0.0

## show

**Signature**

```ts
export declare const show: (a: number) => string
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(x: Float64, y: Float64): Float64
```

Added in v1.0.0

## top

**Signature**

```ts
export declare const top: number
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: number
```

Added in v1.0.0
