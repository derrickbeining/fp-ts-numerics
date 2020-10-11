---
title: DivisionRing.Laws.ts
nav_order: 5
parent: Modules
---

## DivisionRing.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getDivisionRingLaws](#getdivisionringlaws)

---

# utils

## getDivisionRingLaws

**Signature**

```ts
export declare const getDivisionRingLaws: <A>(
  DR: Eq<A> & DivisionRing<A>,
  arb: fc.Arbitrary<NonZero<A>>
) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
