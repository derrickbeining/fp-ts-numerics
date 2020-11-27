---
title: HasPow.ts
nav_order: 26
parent: Modules
---

## HasPow overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HasPow (interface)](#haspow-interface)
  - [toPowOf](#topowof)

---

# utils

## HasPow (interface)

The class of values which support exponentiation

**Signature**

````ts
export interface HasPow<A> {
  /**
   * Exponentiates a value
   *
   * ```ts
   * import { Int } from 'fp-ts'
   *
   * const actual = Int.pow(Int(3), Int(3))
   * const expected = Int(2,7)
   *
   * expect(actual).toBe(expected)
   *
   * ```
   */
  readonly pow: (n: A, exponent: A) => A
}
````

Added in v1.0.0

## toPowOf

Pipeable version of [[HasPow.pow]]. Exponentiates a value.

```ts
import { Int } from 'fp-ts'

const actual = pipe(Int(3), toPowOf(Int)(3))
const expected = Int(2, 7)

expect(actual).toBe(expected)
```

**Signature**

```ts
export declare function toPowOf<A>(T: HasPow<A>): (exponent: A) => (n: A) => A
```

Added in v1.0.0
