---
title: Int.ts
nav_order: 31
parent: Modules
---

## Int overview

Arbitrary precision integers.

Internally, `Int` uses native `BigInt` if globally available, otherwise
falls back to custom implementation.

Like all numeric data types in `fp-ts-numerics`, this module exposes the
`Int` type and namespace as a single declaration. It is intended to be
consumed like so:

```ts
import { Int } from 'fp-ts-numerics'

function isEven(n: Int): boolean {
  return Int.equals(Int.zero, Int.mod(n, Int.of(2)))
}
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [fromNumber](#fromnumber)
  - [fromString](#fromstring)
  - [unsafeFromNumber](#unsafefromnumber)
- [Guards](#guards)
  - [isTypeOf](#istypeof)
- [Instances](#instances)
  - [Arbitrary](#arbitrary)
  - [CommutativeRing](#commutativering)
  - [Enum](#enum)
  - [Eq](#eq)
  - [EuclideanRing](#euclideanring)
  - [HasAdd](#hasadd)
  - [HasMul](#hasmul)
  - [HasOne](#hasone)
  - [HasPow](#haspow)
  - [HasSub](#hassub)
  - [HasToInt](#hastoint)
  - [HasToRational](#hastorational)
  - [HasZero](#haszero)
  - [Integral](#integral)
  - [Ord](#ord)
  - [Ring](#ring)
  - [Semiring](#semiring)
  - [Show](#show)
- [Int](#int)
  - [Int](#int-1)
  - [Int (interface)](#int-interface)
  - [Usage](#usage)
- [Transformation](#transformation)
  - [toNumber](#tonumber)
  - [toNumberLossy](#tonumberlossy)
  - [unsafeToNumber](#unsafetonumber)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)
  - [FixedPrecisionInt (type alias)](#fixedprecisionint-type-alias)
  - [abs](#abs)
  - [add](#add)
  - [compare](#compare)
  - [degree](#degree)
  - [div](#div)
  - [equals](#equals)
  - [mod](#mod)
  - [mul](#mul)
  - [next](#next)
  - [one](#one)
  - [pow](#pow)
  - [prev](#prev)
  - [quot](#quot)
  - [rem](#rem)
  - [stringify](#stringify)
  - [sub](#sub)
  - [toInt](#toint)
  - [toNativeBigInt](#tonativebigint)
  - [toRational](#torational)
  - [zero](#zero)

---

# Constructor

## fromNumber

Attempts to construct an `Int` from a `number`, returning `nothing` if
not an safe integer, otherwise `some(n)`.

```ts
Int.fromNumber(100)
// > some(100)
Int.fromNumber(Number.MAX_VALUE)
// > nothing
```

**Signature**

```ts
export declare function fromNumber(n: number): Option<Int>
```

Added in v1.0.0

## fromString

Attempts to construct an `Int` from a `string`. Configuration is available
for numeric base (default 10), alphabet (default '0123456789abcdefghijklmnopqrstuvwxyz'),
and case sensitivity (default `false`).

```ts
Int.fromString('100')
// > some(100n)
Int.fromString('100n')
// > some(100n)
Int.fromString('woops')
// > nothing
```

**Signature**

```ts
export declare function fromString(
  str: string,
  config: { base?: NonZero<Int>; alphabet?: string; caseSensitive?: boolean } = {}
): Option<Int>
```

Added in v1.0.0

## unsafeFromNumber

Unsafely attempts to construct an `Int` from a `number`, throwing an error
if not a safe integer.

```ts
Int.unsafeFromNumber(100)
// > 100
Int.unsafeFromNumber(Number.MAX_VALUE)
// > uncaught error
```

**Signature**

```ts
export declare function unsafeFromNumber(n: number): Int
```

Added in v1.0.0

# Guards

## isTypeOf

A type guard to test if a value is an `Int`

**Signature**

```ts
export declare function isTypeOf(n: unknown): n is Int
```

Added in v1.0.0

# Instances

## Arbitrary

`fast-check` Arbitrary instance

**Signature**

```ts
export declare const Arbitrary: fc.Arbitrary<Int>
```

Added in v1.0.0

## CommutativeRing

**Signature**

```ts
export declare const CommutativeRing: CommutativeRing<Int>
```

Added in v1.0.0

## Enum

**Signature**

```ts
export declare const Enum: Enum<Int>
```

Added in v1.0.0

## Eq

**Signature**

```ts
export declare const Eq: Eq<Int>
```

Added in v1.0.0

## EuclideanRing

**Signature**

```ts
export declare const EuclideanRing: EuclideanRing<Int>
```

Added in v1.0.0

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

## HasPow

**Signature**

```ts
export declare const HasPow: HasPow<Int>
```

Added in v1.0.0

## HasSub

**Signature**

```ts
export declare const HasSub: HasSub<Int>
```

Added in v1.0.0

## HasToInt

**Signature**

```ts
export declare const HasToInt: HasToInt<Int>
```

Added in v1.0.0

## HasToRational

**Signature**

```ts
export declare const HasToRational: HasToRational<Int>
```

Added in v1.0.0

## HasZero

**Signature**

```ts
export declare const HasZero: HasZero<Int>
```

Added in v1.0.0

## Integral

**Signature**

```ts
export declare const Integral: Integral<Int>
```

Added in v1.0.0

## Ord

**Signature**

```ts
export declare const Ord: Ord<Int>
```

Added in v1.0.0

## Ring

**Signature**

```ts
export declare const Ring: Ring<Int>
```

Added in v1.0.0

## Semiring

**Signature**

```ts
export declare const Semiring: Semiring<Int>
```

Added in v1.0.0

## Show

**Signature**

```ts
export declare const Show: Show<Int>
```

Added in v1.0.0

# Int

## Int

The `Int` identifier serves as the type and a namespace for constants,
functions, and type classess

This is generally the only identifier you'll need to import to work with
`Int`s. It holds all typeclass instances as well as all other exports of the
`Int` module.

```ts
import { ord } from 'fp-ts'
import { Int } from 'fp-ts-numerics/Int'

const ten: Int = Int(1, 0)
const is0LT10: boolean = ord.lt(Int)(Int.zero, ten)
const twoDivThree = Int.div(Int(2), Int(3))
const zeroTo9000: Array<Int> = Enum.fromTo(Int)(Int.zero, Int(9, 0, 0, 0))
```

**Signature**

```ts
export declare const Int: CommutativeRing<Int> &
  Enum<Int> &
  Eq<Int> &
  EuclideanRing<Int> &
  HasAdd<Int> &
  HasMul<Int> &
  HasOne<Int> &
  HasPow<Int> &
  HasSub<Int> &
  HasToInt<Int> &
  HasToRational<Int> &
  HasZero<Int> &
  Integral<Int> &
  Ord<Int> &
  Ring<Int> &
  Semiring<Int> &
  Show<Int> & {
    abs: typeof abs
    Arbitrary: fc.Arbitrary<Int>
    CommutativeRing: CommutativeRing<Int>
    Enum: Enum<Int>
    Eq: Eq<Int>
    EuclideanRing: EuclideanRing<Int>
    fromNumber: typeof fromNumber
    fromString: typeof fromString
    HasAdd: HasAdd<Int>
    HasMul: HasMul<Int>
    HasOne: HasOne<Int>
    HasSub: HasSub<Int>
    HasToInt: HasToInt<Int>
    HasToRational: HasToRational<Int>
    HasZero: HasZero<Int>
    Integral: Integral<Int>
    isTypeOf: typeof isTypeOf
    of: typeof of
    Ord: Ord<Int>
    Ring: Ring<Int>
    Semiring: Semiring<Int>
    Show: Show<Int>
    stringify: typeof stringify
    toNativeBigInt: typeof toNativeBigInt
    toNumber: typeof toNumber
    toNumberLossy: typeof toNumberLossy
    unsafeFromNumber: typeof unsafeFromNumber
    unsafeToNumber: typeof unsafeToNumber
  }
```

Added in v1.0.0

## Int (interface)

Arbitrary precision integer type

## Usage

```ts
import { Int } from 'fp-ts-numerics'

const foo: Int = Int(1, 2, 3, 4, 5)
```

**Signature**

```ts
export interface Int extends Newtype<typeof INT, BigInteger> {}
```

Added in v1.0.0

# Transformation

## toNumber

Attempts to convert an `Int` to a `number`, computing `none` if outside
JavaScript's safe integer range, else `some(number)`.

```ts
import { option } from 'fp-ts'
import { Int } from 'fp-ts-numerics'

expect(Int.toNumber(Int(1))).toBe(option.some(1))
```

**Signature**

```ts
export declare function toNumber(i: Int): Option<number>
```

Added in v1.0.0

## toNumberLossy

Converts an `Int` to a `number` but loses precision if it's outside
JavaScript's safe integer range.

```ts
import { option } from 'fp-ts'
import { Int } from 'fp-ts-numerics'

expect(Int.toNumberLossy(Int(1))).toBe(1)
```

**Signature**

```ts
export declare function toNumberLossy(i: Int): number
```

Added in v1.0.0

## unsafeToNumber

Unsafely converts an `Int` to a `number` throwing RangeError if it's outside
JavaScript's range between `Number.MIN_VALUE` and `Number.MAX_VALUE`.

```ts
import { option } from 'fp-ts'
import { Int } from 'fp-ts-numerics'

expect(Int.unsafeToNumber(Int(1))).toBe(1)
expect(() => Int.unsafeToNumber(Int(...MAX_SAFE_INTEGER))).toBe(1)
```

**Signature**

```ts
export declare function unsafeToNumber(n: Int): number
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple of digits which can be used to construct an `Int`

**Signature**

```ts
export type Digits = [0] | [NegDigit, ...Array<Digit>] | [Exclude<Digit, 0>, ...Array<Digit>]
```

Added in v1.0.0

## FixedPrecisionInt (type alias)

**Signature**

```ts
export type FixedPrecisionInt = Int8 | Int16 | Int32 | UInt8 | UInt16 | UInt32
```

Added in v1.0.0

## abs

**Signature**

```ts
export declare function abs(n: Int): NonNegative<Int>
```

Added in v1.0.0

## add

**Signature**

```ts
export declare function add(a: Int, b: Int)
```

Added in v1.0.0

## compare

**Signature**

```ts
export declare function compare(a: Int, b: Int): Ordering
```

Added in v1.0.0

## degree

**Signature**

```ts
export declare function degree(i: Int): Natural
```

Added in v1.0.0

## div

**Signature**

```ts
export declare function div(n: Int, d: NonZero<Int>): Int
```

Added in v1.0.0

## equals

**Signature**

```ts
export declare function equals(a: Int, b: Int): boolean
```

Added in v1.0.0

## mod

**Signature**

```ts
export declare function mod(n: Int, d: NonZero<Int>): Int
```

Added in v1.0.0

## mul

**Signature**

```ts
export declare function mul(a: Int, b: Int)
```

Added in v1.0.0

## next

**Signature**

```ts
export declare function next(n: Int): Option<Int>
```

Added in v1.0.0

## one

**Signature**

```ts
export declare const one: NonNegative<NonZero<Int>>
```

Added in v1.0.0

## pow

**Signature**

```ts
export declare function pow(n: Int, exp: Int): Int
```

Added in v1.0.0

## prev

**Signature**

```ts
export declare function prev(n: Int): Option<Int>
```

Added in v1.0.0

## quot

**Signature**

```ts
export declare function quot(a: Int, b: Int): Int
```

Added in v1.0.0

## rem

**Signature**

```ts
export declare function rem(a: Int, b: Int): Int
```

Added in v1.0.0

## stringify

**Signature**

```ts
export declare function stringify(n: Int): string
```

Added in v1.0.0

## sub

**Signature**

```ts
export declare function sub(a: Int, b: Int)
```

Added in v1.0.0

## toInt

**Signature**

```ts
export declare function toInt(int: Int): Int
```

Added in v1.0.0

## toNativeBigInt

**Signature**

```ts
export declare function toNativeBigInt(n: Int): bigint
```

Added in v1.0.0

## toRational

**Signature**

```ts
export declare function toRational(n: Int): Ratio<Int>
```

Added in v1.0.0

## zero

**Signature**

```ts
export declare const zero: NonNegative<Int>
```

Added in v1.0.0
