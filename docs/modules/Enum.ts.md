---
title: Enum.ts
nav_order: 10
parent: Modules
---

## Enum overview

Provides the [[Enum]] typeclass interface and functions which operate
on `Enum`s

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [defaultNext](#defaultnext)
  - [defaultPrev](#defaultprev)
  - [enumDownAfter](#enumdownafter)
  - [enumDownFrom](#enumdownfrom)
  - [enumFromTo](#enumfromto)
  - [enumUpAfter](#enumupafter)
  - [enumUpFrom](#enumupfrom)

---

# utils

## defaultNext

**Signature**

```ts
export declare function defaultNext<A>(toEnum: (n: Int32) => Option<A>, fromEnum: (a: A) => Int32): (a: A) => Option<A>
```

Added in v1.0.0

Provides a default implementation for `next`, given a function that maps
integers to values in the `Enum`, and a function that maps values in the
`Enum` back to integers. The integer mapping must agree in both directions
for this to implement a law-abiding `next`.

If a `BoundedEnum` instance exists for `a`, the `toEnum` and `fromEnum`
functions can be used here:

```typescript
next = defaultNext(toEnum, fromEnum)
```

## defaultPrev

**Signature**

```ts
export declare function defaultPrev<A>(toEnum: (n: Int32) => Option<A>, fromEnum: (a: A) => Int32): (a: A) => Option<A>
```

Added in v1.0.0

Provides a default implementation for `prev`, given a function that maps
integers to values in the `Enum`, and a function that maps values in the
`Enum` back to integers. The integer mapping must agree in both directions
for this to implement a law-abiding `prev`.

If a `BoundedEnum` instance exists for `a`, the `toEnum` and `fromEnum`
functions can be used here:

```typescript
prev = defaultPrev(toEnum, fromEnum)
```

## enumDownAfter

**Signature**

```ts
export declare function enumDownAfter<E, U extends URIS>(
  e: Enum<E>,
  u: Unfoldable1<U>
): (excludedStart: E) => Kind<U, E>
```

Added in v1.0.0

Produces all predecessors of an enumerable value, excluding the start value.

## enumDownFrom

**Signature**

```ts
export declare function enumDownFrom<E, U extends URIS>(e: Enum<E>, u: Unfoldable1<U>): (includedStart: E) => Kind<U, E>
```

Added in v1.0.0

Produces all predecessors of an `Enum` value, including the start value.

```typescript
expect(enumDownFrom(Int8, array)(Int8.top)).toBe(reverse(sort(Int8)(everyInt8)))
```

## enumFromTo

**Signature**

```ts
export declare function enumFromTo<E, U extends URIS>(e: Enum<E>, u: Unfoldable1<U>): (from: E, to: E) => Kind<U, E>
```

Added in v1.0.0

Returns the enumeration of elements from `from` to `to` (inclusive)
contained in the data type for which an `Unfoldable` instance is provided.

```typescript
expect(fromTo(Int, array)(Int.zero, Int(3))).toBe([Int(0), Int(1), Int(2), Int(3)])
```

## enumUpAfter

**Signature**

```ts
export declare function enumUpAfter<E, U extends URIS>(e: Enum<E>, u: Unfoldable1<U>): (excludedStart: E) => Kind<U, E>
```

Added in v1.0.0

Produces all successors of an `Enum` value, excluding the start value.

## enumUpFrom

**Signature**

```ts
export declare function enumUpFrom<E, U extends URIS>(e: Enum<E>, u: Unfoldable1<U>): (bottom: E) => Kind<U, E>
```

Added in v1.0.0

Produces all successors of an `Enum` value, including the start value.

```typescript
expect(enumUpFrom(Int8, array)(Int8.bottom)).toBe(sort(Int8)(everyInt8))
```
