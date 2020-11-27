---
title: EuclideanRing.Laws.ts
nav_order: 12
parent: Modules
---

## EuclideanRing.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getEuclideanRingLaws](#geteuclideanringlaws)

---

# utils

## getEuclideanRingLaws

**Signature**

```ts
export declare const getEuclideanRingLaws: <A>(
  T: ord.Ord<A> & EuclideanRing<A>,
  arbs: fc.Arbitrary<[A, A]>
) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
