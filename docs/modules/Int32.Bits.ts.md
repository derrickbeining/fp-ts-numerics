---
title: Int32.Bits.ts
nav_order: 33
parent: Modules
---

## Int32.Bits overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [and](#and)
  - [complement](#complement)
  - [or](#or)
  - [shl](#shl)
  - [shr](#shr)
  - [xor](#xor)
  - [zshr](#zshr)

---

# utils

## and

Performs the bitwise AND operation on each pair of bits.

**Signature**

```ts
export declare function and(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## complement

Performs the bitwise NOT operation on each pair of bits.

**Signature**

```ts
export declare function complement(a: Int32): Int32
```

Added in v1.0.0

## or

Performs the bitwise OR operation on each pair of bits.

**Signature**

```ts
export declare function or(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## shl

Bitwise shift left
Shifts the first operand the specified number of bits to the
left. Excess bits shifted off to the left are discarded. Zero bits are
shifted in from the right.

**Signature**

```ts
export declare function shl(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## shr

Bitwise shift right.

Shifts the first operand the specified number of bits to the
right. Excess bits shifted off to the right are discarded. Copies of the
leftmost bit are shifted in from the left. Since the new leftmost bit has
the same value as the previous leftmost bit, the sign bit (the leftmost bit)
does not change.

**Signature**

```ts
export declare function shr(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## xor

Performs the bitwise XOR operation on each pair of bits.

**Signature**

```ts
export declare function xor(a: Int32, b: Int32): Int32
```

Added in v1.0.0

## zshr

Bitwise zero-fill shift right.

This operator shifts the first operand the specified number of bits to the
right. Excess bits shifted off to the right are discarded. Zero bits are
shifted in from the left. The sign bit becomes 0, so the result is always
non-negative. Unlike the other bitwise operators, zero-fill right shift
returns an unsigned 32-bit integer.

**Signature**

```ts
export declare function zshr(a: Int32, b: Int32): UInt32
```

Added in v1.0.0
