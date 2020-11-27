---
title: Ring.ts
nav_order: 50
parent: Modules
---

## Ring overview

The `Ring` class is for types that support addition, multiplication, and
subtraction operations. See {@link Ring} docs for more info.

Adapted from https://github.com/purescript/purescript-prelude/blob/mast./Ring.purs

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Ring (interface)](#ring-interface)
  - [getFunctionRing](#getfunctionring)
  - [getTupleRing](#gettuplering)
  - [negate](#negate)

---

# utils

## Ring (interface)

The `Ring` class is for types that support addition, multiplication, and
subtraction operations.

Instances must satisfy the following law in addition to the {@link Semiring}
laws:

- Additive inverse: `a - a = (zero - a) + a = zero`

**Signature**

```ts
export interface Ring<A> extends Semiring<A>, HasSub<A> {}
```

Added in v1.0.0

## getFunctionRing

**Signature**

```ts
export declare function getFunctionRing<A, B>(R: Ring<B>): Ring<(a: A) => B>
```

Added in v1.0.0

## getTupleRing

Given a tuple of `Ring`s returns a `Ring` for the tuple

**Signature**

```ts
export declare function getTupleRing<T extends ReadonlyArray<Ring<any>>>(
  ...rings: T
): Ring<{ [K in keyof T]: T[K] extends Ring<infer A> ? A : never }>
```

**Example**

```ts
import { getTupleRing } from 'fp-ts-numerics/Ring'
import { Float64 } from 'fp-ts-numerics/Float64'

const R = getTupleRing(Float64.Field, Float64.Field, Float64.Field)
assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
assert.deepStrictEqual(R.one, [1, 1, 1])
assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
assert.deepStrictEqual(R.zero, [0, 0, 0])
```

Added in v1.0.0

## negate

**Signature**

```ts
export declare function negate<A>(R: Ring<A>): (n: A) => A
```

Added in v1.0.0
