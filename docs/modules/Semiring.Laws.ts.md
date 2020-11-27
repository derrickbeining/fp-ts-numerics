---
title: Semiring.Laws.ts
nav_order: 52
parent: Modules
---

## Semiring.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getSemiringLaws](#getsemiringlaws)

---

# utils

## getSemiringLaws

**Signature**

```ts
export declare const getSemiringLaws: <A>(
  S: Eq<A> & Semiring<A>,
  arb: fc.Arbitrary<A>
) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
