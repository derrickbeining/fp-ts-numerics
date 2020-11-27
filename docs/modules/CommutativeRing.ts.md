---
title: CommutativeRing.ts
nav_order: 2
parent: Modules
---

## CommutativeRing overview

The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
is commutative.

See {@link CommutativeRing} for laws.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [CommutativeRing (interface)](#commutativering-interface)

---

# utils

## CommutativeRing (interface)

The `CommutativeRing` typeclass is for {@link Ring}s where multiplication
is commutative.

It has no members of its own, but instances must satisfy the following law
in addition to the {@link Ring} laws:

- Commutative multiplication: `a * b = b * a`

**Signature**

```ts
export interface CommutativeRing<A> extends Ring<A> {}
```

Added in v1.0.0
