---
title: Int.ts
nav_order: 29
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
  return Int.equals(Int.zero, Int.mod(n, Int(2)))
}
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructor](#constructor)
  - [IntConstructor](#intconstructor)
  - [fromNumber](#fromnumber)
  - [fromString](#fromstring)
  - [unsafeFromNumber](#unsafefromnumber)
- [Data Type](#data-type)
  - [Int (interface)](#int-interface)
  - [Usage](#usage)
- [Namespace](#namespace)
  - [Int](#int)
- [Transformation](#transformation)
  - [toNumber](#tonumber)
  - [toNumberLossy](#tonumberlossy)
  - [unsafeToNumber](#unsafetonumber)
- [Type Guard](#type-guard)
  - [isTypeOf](#istypeof)
- [Typeclass Instance](#typeclass-instance)
  - [commutativeRingInt](#commutativeringint)
  - [enumInt](#enumint)
  - [euclideanRingInt](#euclideanringint)
  - [hasToIntInt](#hastointint)
  - [hasToRationalInt](#hastorationalint)
  - [integralInt](#integralint)
  - [ordInt](#ordint)
  - [ringInt](#ringint)
  - [semiringInt](#semiringint)
- [utils](#utils)
  - [Digits (type alias)](#digits-type-alias)

---

# Constructor

## IntConstructor

Constructs a signed, arbitrary precision integer from a
tuple of digits.

```ts
Int(9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 6, 0, 0, 0)
```

**Signature**

```ts
export declare function IntConstructor(zero: 0): NonNegative<Int>
export declare function IntConstructor(...digits: [NegDigit, ...Array<Digit>]): NonZero<Int>
export declare function IntConstructor(...digits: [Exclude<Digit, 0>, ...Array<Digit>]): NonNegative<NonZero<Int>>
```

Added in v1.0.0

## fromNumber

Attempts to construct an [[Int]] from a `number`, returning `nothing` if
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

Attempts to construct an [[Int]] from a `string`. Configuration is available
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

Unsafely attempts to construct an [[Int]] from a `number`, throwing an error
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

# Data Type

## Int (interface)

Arbitrary precision integer type

## Usage

```ts
import { Int } from 'fp-ts-numerics'

const foo: Int = Int(1, 2, 3, 4, 5)
```

**Signature**

```ts
export interface Int {
  /**
   * @internal
   */
  readonly [INT]: unique symbol
}
```

Added in v1.0.0

# Namespace

## Int

The `Int` type and namespace.

This is generally the only identifier you'll need to import to work with
`Int`s. It holds all typeclass instances as well as all other exports of the
`Int` module.

```ts
import { ord } from 'fp-ts'
import { Int } from 'fp-ts-numerics'

const is0LT10: boolean = ord.lt(Int)(Int.zero, Int(1, 0))
const twoDivThree: Int = Int.div(Int(2), Int(3))
const zeroTo9000: Array<Int> = Enum.fromTo(Int)(Int.zero, Int(9, 0, 0, 0))
```

**Signature**

```ts
export declare const Int: Enum<Int> &
  CommutativeRing<Int> &
  EuclideanRing<Int> &
  Integral<Int> &
  HasToInt<Int> &
  HasToRational<Int> & {
    abs: (a: Int) => NonNegative<Int>
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

# Transformation

## toNumber

Attempts to convert an [[Int]] to a `number`, computing `none` if outside
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

Converts an [[Int]] to a `number` but loses precision if it's outside
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

Unsafely converts an [[Int]] to a `number` throwing an error if it's outside
JavaScript's safe integer range.

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

# Type Guard

## isTypeOf

A type guard to test if a value is an [[Int]]

**Signature**

```ts
export declare function isTypeOf(n: unknown): n is Int
```

Added in v1.0.0

# Typeclass Instance

## commutativeRingInt

**Signature**

```ts
export declare const commutativeRingInt: CommutativeRing<Int>
```

Added in v1.0.0

## enumInt

**Signature**

```ts
export declare const enumInt: Enum<Int>
```

Added in v1.0.0

## euclideanRingInt

**Signature**

```ts
export declare const euclideanRingInt: EuclideanRing<Int>
```

Added in v1.0.0

## hasToIntInt

**Signature**

```ts
export declare const hasToIntInt: HasToInt<Int>
```

Added in v1.0.0

## hasToRationalInt

**Signature**

```ts
export declare const hasToRationalInt: HasToRational<Int>
```

Added in v1.0.0

## integralInt

**Signature**

```ts
export declare const integralInt: Integral<Int>
```

Added in v1.0.0

## ordInt

**Signature**

```ts
export declare const ordInt: ord.Ord<Int>
```

Added in v1.0.0

## ringInt

**Signature**

```ts
export declare const ringInt: Ring<Int>
```

Added in v1.0.0

## semiringInt

**Signature**

```ts
export declare const semiringInt: Semiring<Int>
```

Added in v1.0.0

# utils

## Digits (type alias)

A tuple representing the digits of an [[Int]]

**Signature**

```ts
export type Digits = [0] | [NegDigit, ...Array<Digit>] | [Exclude<Digit, 0>, ...Array<Digit>]
```

Added in v1.0.0
