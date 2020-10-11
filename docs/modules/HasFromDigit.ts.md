---
title: HasFromDigit.ts
nav_order: 21
parent: Modules
---

## HasFromDigit overview

The class of types which can be constructed by `fromDigit`

```ts
import { Int, NonNegative, NonZero } from 'fp-ts-numerics'

const myInt: NonNegative<Int> = Int.fromDigit(0)
const myInt: NonZero<NonNegative<Int>> = Int.fromDigit(8)
```

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasFromDigit (interface)](#hasfromdigit-interface)
  - [instanceHasFromDigit](#instancehasfromdigit)

---

# utils

## HasFromDigit (interface)

**Signature**

```ts
export interface HasFromDigit<A> {
  /** @internal */
  [HAS_FROM_DIGIT]: typeof HAS_FROM_DIGIT
  fromDigit<D extends Digit>(digit: D): D extends 0 ? NonNegative<A> : NonZero<NonNegative<A>>
}
```

Added in v1.0.0

## instanceHasFromDigit

**Signature**

```ts
export declare function instanceHasFromDigit<A>(members: Methods<A>): HasFromDigit<A>
```

Added in v1.0.0
