---
title: Ring.Laws.ts
nav_order: 44
parent: Modules
---

## Ring.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getRingLaws](#getringlaws)

---

# utils

## getRingLaws

**Signature**

```ts
export declare const getRingLaws: <A>(R: Eq<A> & Ring<A>, arb: fc.Arbitrary<A>) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
