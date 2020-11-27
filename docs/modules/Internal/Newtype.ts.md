---
title: Internal/Newtype.ts
nav_order: 38
parent: Modules
---

## Newtype overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [IsNewtype (interface)](#isnewtype-interface)
  - [Newtype (interface)](#newtype-interface)

---

# utils

## IsNewtype (interface)

**Signature**

```ts
export interface IsNewtype<T extends Newtype<any, any>> {
  wrap: (u: Unwrap<T>) => T
  unwrap: (t: T) => Unwrap<T>
}
```

Added in v1.0.0

## Newtype (interface)

**Signature**

```ts
export interface Newtype<Name extends EnforcedUniqueSymbol<Name>, Type> extends INewtype<Name, Type> {}
```

Added in v1.0.0
