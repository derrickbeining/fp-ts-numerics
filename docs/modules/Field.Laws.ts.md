---
title: Field.Laws.ts
nav_order: 15
parent: Modules
---

## Field.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getFieldLaws](#getfieldlaws)

---

# utils

## getFieldLaws

**Signature**

```ts
export declare const getFieldLaws: <A>(
  F: Ord<A> & Field<A>,
  arb: fc.Arbitrary<NonZero<A>>
) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
