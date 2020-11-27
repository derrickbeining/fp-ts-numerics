---
title: Natural.ts
nav_order: 40
parent: Modules
---

## Natural overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromNumber](#fromnumber)
  - [unsafeFromNumber](#unsafefromnumber)
- [Instances](#instances)
  - [HasAdd](#hasadd)
  - [HasMul](#hasmul)
  - [HasOne](#hasone)
  - [HasZero](#haszero)
- [Typeclass Instance](#typeclass-instance)
  - [Enum](#enum)
  - [Eq](#eq)
  - [HasPow](#haspow)
  - [HasToInt](#hastoint)
  - [HasToRational](#hastorational)
  - [Integral](#integral)
  - [Ord](#ord)
  - [Semiring](#semiring)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [Natural](#natural)
  - [Natural (interface)](#natural-interface)
  - [Show](#show)
  - [add](#add)
  - [compare](#compare)
  - [degree](#degree)
  - [div](#div)
  - [equals](#equals)
  - [fromInt](#fromint)
  - [isTypeOf](#istypeof)
  - [minus](#minus)
  - [mod](#mod)
  - [mul](#mul)
  - [next](#next)
  - [numberIsNatural](#numberisnatural)
  - [of](#of)
  - [one](#one)
  - [pow](#pow)
  - [prev](#prev)
  - [quot](#quot)
  - [rem](#rem)
  - [stringify](#stringify)
  - [toInt](#toint)
  - [toNumber](#tonumber)
  - [toRational](#torational)
  - [unsafeMinus](#unsafeminus)
  - [zero](#zero)

---

# Constructor

## fromNumber

Attempts to construct a [[Natural]] from a `number`, computing `none` if
not a safe non-negative integer, otherwise `some(n)`.

```ts
import { Natural } from 'fp-ts-numerics'
import { Branded } from './Internal/Branded'

Natural.fromNumber(100)
// > option.some(Natural.of(1,0,0))
Natural.fromNumber(Number.MAX_VALUE)
// > option.nothing
```

**Signature**

```ts
export declare function fromNumber(n: number): Option<Natural>
```

Added in v1.0.0

## unsafeFromNumber

Unsafely attempts to construct an [[Natural]] from a `number`, throwing an error
if not a safe, non-negative integer.

```ts
import { Natural } from 'fp-ts-numerics'

Natural.unsafeFromNumber(100)
// > Natural.of(1,0,0)
Natural.unsafeFromNumber(Number.MAX_VALUE)
// > uncaught error
```

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Natural
```

Added in v1.0.0

# Instances

## HasAdd

**Signature**

```ts
export declare const HasAdd: HasAdd<Int>
```

Added in v1.0.0

## HasMul

**Signature**

```ts
export declare const HasMul: HasMul<Int>
```

Added in v1.0.0

## HasOne

**Signature**

```ts
export declare const HasOne: HasOne<Int>
```

Added in v1.0.0

## HasZero

**Signature**

```ts
export declare const HasZero: HasZero<Int>
```

Added in v1.0.0

# Typeclass Instance

## Enum

**Signature**

```ts
export declare const Enum: Enum<Natural>
```

Added in v1.0.0

## Eq

**Signature**

```ts
export declare const Eq: Eq<Natural>
```

Added in v1.0.0

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<Natural>
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: HasToInt<Natural>
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: HasToRational<Natural>
```

Added in v1.0.0

## Integral

**Signature**

```ts
export declare const Integral: Integral<Natural>
```

Added in v1.0.0

## Ord

**Signature**

```ts
export declare const Ord: ord.Ord<Natural>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<Natural>
```

Added in v1.0.0

# utils

## Digits (type alias)

**Signature**

```ts
export type Digits = [LeadingDigit | Digit] | [LeadingDigit, ...Array<Digit>]
```

Added in v1.0.0

## Natural

**Signature**

```ts
export declare const Natural: Eq<Natural> &
  Enum<Natural> &
  HasAdd<Natural> &
  HasMul<Natural> &
  HasOne<Natural> &
  HasPow<Natural> &
  HasToInt<Natural> &
  HasToRational<Natural> &
  HasZero<Natural> &
  Integral<Natural> &
  Ord<Natural> &
  Show<Natural> &
  Semiring<Natural> & {
    degree: typeof degree
    div: typeof div
    Enum: Enum<Natural>
    Eq: Eq<Natural>
    fromInt: typeof fromInt
    fromNumber: typeof fromNumber
    HasAdd: HasAdd<Int>
    HasMul: HasMul<Int>
    HasOne: HasOne<Int>
    HasPow: HasPow<Natural>
    HasToInt: HasToInt<Natural>
    HasToRational: HasToRational<Natural>
    HasZero: HasZero<Int>
    Integral: Integral<Natural>
    isTypeOf: typeof isTypeOf
    minus: typeof minus
    mod: typeof mod
    of: typeof of
    Ord: ord.Ord<Natural>
    Semiring: Semiring<Natural>
    Show: Show<Natural>
    toBigInt: typeof toBigInt
    unsafeFromNumber: typeof unsafeFromNumber
    toNumber: typeof toNumber
    unsafeMinus: typeof unsafeMinus
  }
```

Added in v1.0.0

## Natural (interface)

Arbitrary-precision non-negative integers

**Signature**

```ts
export interface Natural extends NonNegative<Int> {}
```

Added in v1.0.0

## Show

**Signature**

```ts
export declare const Show: Show<Natural>
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Natural, b: Natural): Natural
```

Added in v: 1.0.0

## compare

**Signature**

```ts
export declare function compare(a: Natural, b: Natural): Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Natural): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Natural, d: NonZero<Natural>): Natural
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Natural, b: Natural): boolean
```

Added in v1.0.0

## fromInt

**Signature**

```ts
export declare function fromInt(n: Int): Option<Natural>
```

Added in v1.0.0

## isTypeOf

**Signature**

```ts
export declare function isTypeOf(n: unknown): n is Natural
```

Added in v1.0.0

## minus

Subtract the second `Natural` from the first. Evaluates to `zero`
when the result would be less than zero, since `Natural` cannot obey
`Ring` laws or wrap on overflow. See `unsafeMinus` if you desire a
runtime error to be thrown on underflow.

**Signature**

```ts
export declare function minus(a: Natural, b: Natural): Natural
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Natural, d: Natural): Natural
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Natural, b: Natural): Natural
```

Added in v: 1.0.0

## next

**Signature**

```ts
export declare function next(prev: Natural): Option<Natural>
```

Added in v: 1.0.0

## numberIsNatural

**Signature**

```ts
export declare function numberIsNatural(n: number): boolean
```

Added in v1.0.0

## of

**Signature**

```ts
export declare function of(zero: 0): Natural
export declare function of(...digits: Digits): NonZero<Natural>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: NonZero<Natural>
```

Added in v: 1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Natural, exponent: Natural): Natural
```

Added in v: 1.0.0

## prev

**Signature**

```ts
export declare function prev(next: Natural): Option<Natural>
```

Added in v: 1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Natural, b: Natural): Natural
```

Added in v: 1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Natural, b: Natural): Natural
```

Added in v: 1.0.0

## stringify

**Signature**

```ts
export declare function stringify(n: Natural): string
```

Added in v: 1.0.0

## toInt

**Signature**

```ts
export declare function toInt(n: Natural): NonNegative<Int>
```

Added in v: 1.0.0

## toNumber

**Signature**

```ts
export declare function toNumber(i: Natural): Option<number>
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(a: Natural): Rational
```

Added in v1.0.0

## unsafeMinus

Subtract the second `Natural` from the first. Throws an error
if underflow occurs.

**Signature**

```ts
export declare function unsafeMinus(a: Natural, b: Natural): Natural
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: Natural
```

Added in v: 1.0.0
