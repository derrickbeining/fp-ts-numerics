---
title: Enum.Internal.ts
nav_order: 9
parent: Modules
---

## Enum.Internal overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Enum (interface)](#enum-interface)
  - [instanceEnum](#instanceenum)

---

# utils

## Enum (interface)

Typeclass for types which can be enumerated

Adapted from https://github.com/purescript/purescript-enums/blob/mast./Enum.purs

Laws:

1.  Successor: `all (a < _) (next a)`
2.  Predecessor: `all (_ < a) (prev a)`
3.  next retracts prev: `prev >=> next >=> prev = prev`
4.  prev retracts next: `next >=> prev >=> next = next`
5.  Non-skipping next: `b <= a || any (_ <= b) (next a)`
6.  Non-skipping prev: `a <= b || any (b <= _) (prev a)`

The retraction laws can intuitively be understood as saying that `next` is the
opposite of `prev`; if you apply `next` and then `prev` to something, you should
end up with what you started with (although of course this doesn't apply if
you tried to `next` the last value in an enumeration and therefore got `none`
out).

The non-skipping laws can intuitively be understood as saying that `next`
shouldn't skip over any elements of your type. For example, without the
non-skipping laws, it would be permissible to write an `Enum<Int>` instance
where `next(x) = some(x+2)`, and similarly `prev(x) = some(x-2)`.

**Signature**

```ts
export interface Enum<A> extends Ord<A> {
  /**
   * @internal
   */
  readonly [ENUM]: typeof ENUM
  readonly next: (a: A) => Option<A>
  readonly prev: (a: A) => Option<A>
}
```

Added in v1.0.0

## instanceEnum

Enum instance constructor

**Signature**

```ts
export declare function instanceEnum<A>(e: EnumMethods<A>): Enum<A>
```

Added in v1.0.0
