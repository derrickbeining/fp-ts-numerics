---
title: EuclideanRing.ts
nav_order: 14
parent: Modules
---

## EuclideanRing overview

Adapted from https://github.com/purescript/purescript-prelude/blob/v4.1./EuclideanRing.purs

The `EuclideanRing` typeclass is for [[CommutativeRing]]s that support division.
The mathematical structure this typeclass is based on is sometimes also called
a _Euclidean domain_.

## Laws

Instances must satisfy the following laws in addition to the
[[CommutativeRing]] laws:

- **Integral domain**

  - `!equals(one, zero)`, and if `a` and `b` are both non-zero then so is
    their product `a * b`

- **Euclidean function `degree`**:

  - _Nonnegativity_:
    - For all non-zero `a`, `degree(a) >= 0`
  - _Quotient and remainder_:
    - For all `a` and `b`, where `b` is non-zero,
    - if `q === a / b` and `r === mod(a, b)`
    - then `a === q * b + r`,
    - and either `r === zero` or `degree(r) < degree(b)`

- **Submultiplicative euclidean function**:
  - For all non-zero `a` and `b`, `degree(a) <= degree(a * b)`

## Implementing `degree`

For any `EuclideanRing` which is also a [[Field]], one valid choice
for `degree` is simply `() => one`. In fact, unless there's a specific
reason not to, [[Field]] types should normally use this definition of
`degree`.

`(n) => abs(n)` is also a fine implementation when [[Field]] behavior
is not desired.

## Types of integer division

For integer data types, there are a few different sensible law-abiding
implementations to choose from, with slightly different behavior in the
presence of negative dividends or divisors. The most common definitions are:

- Truncating division
  - `a / b` is rounded towards 0.
- Flooring division
  - `a / b` is rounded towards negative infinity.
- Euclidean division:
  - `a / b` rounds towards negative infinity if the divisor is positive, and
    towards positive infinity if the divisor is negative.
  - The benefit this provides is that `mod(a, b)` is always non-negative.

Note that all three definitions are identical if we restrict our attention
to non-negative dividends and divisors.

_The `EuclideanRing` instances provided for integer type in `fp-ts-numerics`_
_(Int, Int32, UInt32, etc.) all use Euclidean division._

If truncating division is desired, `fp-ts-numerics` also provides `quot` and
`rem` functions for that purpose. These can be found on instances of
[[Integral]] as well.

## Caveats for Non-Arbitrary Precision numbers

N-bit integer types like Int32 and UInt32 violiate some EuclideanRing laws
due to certain cases of overflow. For an integer type with N bits, you’ll
find that the integral domain law will be violated with any pair of powers
of 2 whose exponents add up to at least N. For example
16 _ 16 = 2^4 _ 2^4 = 0 with Int8.

Aside from those cases, the laws hold.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [EuclideanRing (interface)](#euclideanring-interface)
  - [instanceEuclideanRing](#instanceeuclideanring)

---

# utils

## EuclideanRing (interface)

The `EuclideanRing` typeclass is for [[CommutativeRing]]s that support division.
The mathematical structure this typeclass is based on is sometimes also called
a _Euclidean domain_.

See [["EuclideanRing"]] module docs for more info

**Signature**

```ts
export interface EuclideanRing<A> extends CommutativeRing<A> {
  /**
   * @internal
   */
  readonly [EUCLIDEAN_RING]: typeof EUCLIDEAN_RING
  /**
   * Euclidean function `degree` is required to obey the following laws:
   *   - Nonnegativity:
   *      - For all non-zero `a`, `degree(a) >= 0`
   *   - Quotient/remainder:
   *      - For all `a` and `b`, where `b` is non-zero, let `q = div(a,b)` and
   *        `r = mod(a,b)`; then `a = q*b + r`, and also either `r = zero` or
   *        `degree(r) < degree(b)`
   *   - Submultiplicative euclidean function:
   *      - For all non-zero `a` and `b`, `degree(a) <= degree(a * b)
   */
  degree(a: A): Natural
  /**
   * Euclidean division.
   *
   * Given `div(a,b)`, if `b > 0`, result is rounded towards negative infinity. If
   * `b < 0`, result is rounded towards positive infinity.
   */
  div(dividend: A, divisor: NonZero<A>): A
  /**
   * Remainder of Euclidean division.
   *
   * `mod(a,b)` should always be >= 0
   *
   * TODO: return `NonNegative<A>` instead
   */
  mod(dividend: A, divisor: NonZero<A>): A
}
```

Added in v1.0.0

## instanceEuclideanRing

EuclideanRing instance constructor

```ts
const euclideanRingMyType: EuclideanRing<MyType> =
  instanceEuclideanRing({...})
```

**Signature**

```ts
export declare function instanceEuclideanRing<A>(e: Methods<A>): EuclideanRing<A>
```

Added in v1.0.0
