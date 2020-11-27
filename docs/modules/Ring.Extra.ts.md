---
title: Ring.Extra.ts
nav_order: 48
parent: Modules
---

## Ring.Extra overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [abs](#abs)
  - [negate](#negate)
  - [signum](#signum)

---

# utils

## abs

The absolute value function, defined as...

```ts
if (x < zero) return negate(x)
else return x
```

**Signature**

```ts
export declare function abs<A>(OR: Ord<A> & HasSub<A> & HasZero<A>): (a: A) => A
```

Added in v1.0.0

## negate

`negate(x)` can be used as a shorthand for `sub(zero, x)`

**Signature**

```ts
export declare function negate<A>(R: HasSub<A> & HasZero<A>): (a: A) => A
```

Added in v1.0.0

## signum

The sign function; always evaluates to either `1` or `-1`. For
any `x`, we should have `signum(x) * abs(x) == x`

**Signature**

```ts
export declare function signum<A>(T: Ord<A> & HasSub<A> & HasZero<A> & HasOne<A>): (a: A) => A
```

Added in v1.0.0
