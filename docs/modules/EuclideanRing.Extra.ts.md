---
title: EuclideanRing.Extra.ts
nav_order: 12
parent: Modules
---

## EuclideanRing.Extra overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [div](#div)
  - [gcd](#gcd)
  - [isEven](#iseven)
  - [isOdd](#isodd)
  - [lcm](#lcm)

---

# utils

## div

**Signature**

```ts
export declare function div<A>(E: EuclideanRing<A>)
```

Added in v1.0.0

## gcd

Calculates the _greatest common divisor_ of two values using the Euclidean
algorithm. The result is always non-negative.

This function is overloaded such that, when `a` or `b` is `NonZero<A>`, the
result of `gcd(a, b)` is `NonNegative<NonZero<A>>`, otherwise it is just
`NonZero<A>`.

**Signature**

```ts
export declare function gcd<A>(T: Ord<A> & EuclideanRing<A>)
```

Added in v1.0.0

## isEven

**Signature**

```ts
export declare function isEven<A>(E: Eq<A> & EuclideanRing<A>): (a: A) => boolean
```

Added in v1.0.0

## isOdd

**Signature**

```ts
export declare function isOdd<A>(E: Eq<A> & EuclideanRing<A>): (a: A) => boolean
```

Added in v1.0.0

## lcm

Calculates the _least common multiple_ of two values. The result is always
non-negative. It's implemented using {@link gcd} internally.

This function is overloaded such that, when `a` or `b` is `NonZero<A>`, the
result of `lcm(a, b)` is `NonNegative<NonZero<A>>`, otherwise it is just
`NonZero<A>`.

**Signature**

```ts
export declare function lcm<A>(T: Ord<A> & EuclideanRing<A>): (a: A, b: A) => NonNegative<A>
```

Added in v1.0.0
