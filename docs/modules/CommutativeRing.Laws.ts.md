---
title: CommutativeRing.Laws.ts
nav_order: 1
parent: Modules
---

## CommutativeRing.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getCommutativeRingLaws](#getcommutativeringlaws)

---

# utils

## getCommutativeRingLaws

Derive fast-check property tests for your CommutativeRing instances

**Signature**

```ts
export declare const getCommutativeRingLaws: <A>(
  CR: Eq<A> & CommutativeRing<A>,
  arb: fc.Arbitrary<A>
) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
