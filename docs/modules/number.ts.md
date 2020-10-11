---
title: number.ts
nav_order: 39
parent: Modules
---

## number overview

_WARNING:_
`number` cannot be a fully law-abiding member of several classes due
to the potential for arithmetic overflows and the presence of NaN and
Infinity values. Behaviour is unspecified in these cases.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass Instance](#typeclass-instance)
  - [boundedNumber](#boundednumber)
  - [commutativeRingNumber](#commutativeringnumber)
  - [divisionRingNumber](#divisionringnumber)
  - [eqNumber](#eqnumber)
  - [euclideanRingNumber](#euclideanringnumber)
  - [fieldNumber](#fieldnumber)
  - [ordNumber](#ordnumber)
  - [ringNumber](#ringnumber)
  - [semiringNumber](#semiringnumber)
- [utils](#utils)
  - [add](#add)
  - [degree](#degree)
  - [div](#div)
  - [mod](#mod)
  - [mul](#mul)
  - [number](#number)
  - [one](#one)
  - [recip](#recip)
  - [sub](#sub)
  - [zero](#zero)

---

# Typeclass Instance

## boundedNumber

Instance of [[Semiring]] for `number`

**Signature**

```ts
export declare const boundedNumber: Bounded<number>
```

Added in v1.0.0

## commutativeRingNumber

Instance of [[CommutativeRing]] for `number`

**Signature**

```ts
export declare const commutativeRingNumber: CommutativeRing<number>
```

Added in v1.0.0

## divisionRingNumber

Instance of [[DivisionRing]] for `number`

**Signature**

```ts
export declare const divisionRingNumber: DivisionRing<number>
```

Added in v1.0.0

## eqNumber

Instance of `Eq` for `number`

**Signature**

```ts
export declare const eqNumber: Eq<number>
```

Added in v1.0.0

## euclideanRingNumber

Instance of [[EuclideanRing]] for `number`

**Signature**

```ts
export declare const euclideanRingNumber: EuclideanRing<number>
```

Added in v1.0.0

## fieldNumber

Instance of [[Field]] for `number`

**Signature**

```ts
export declare const fieldNumber: Field<number>
```

Added in v1.0.0

## ordNumber

Instance of `Ord` for `number`

**Signature**

```ts
export declare const ordNumber: Ord<number>
```

Added in v1.0.0

## ringNumber

Instance of [[Ring]] for `number`

**Signature**

```ts
export declare const ringNumber: Ring<number>
```

Added in v1.0.0

## semiringNumber

Instance of [[Semiring]] for `number`

**Signature**

```ts
export declare const semiringNumber: Semiring<number>
```

Added in v1.0.0

# utils

## add

**Signature**

```ts
export declare function add(x: number, y: number): number
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(_: number): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(dvd: number, dvr: NonZero<number>): number
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(_: number, __: NonZero<number>): number
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(x: number, y: number): number
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Bounded<number> &
  CommutativeRing<number> &
  DivisionRing<number> &
  Eq<number> &
  EuclideanRing<number> &
  Field<number> &
  Ord<number> &
  Ring<number> &
  Semiring<number> &
  Show<number>
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
export declare function recip(n: NonZero<number>): number
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(x: number, y: number): number
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: number
```

Added in v1.0.0
