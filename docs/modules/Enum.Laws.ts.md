---
title: Enum.Laws.ts
nav_order: 10
parent: Modules
---

## Enum.Laws overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getEnumLaws](#getenumlaws)

---

# utils

## getEnumLaws

**Signature**

```ts
export declare const getEnumLaws: <A>(E: Enum<A>, arb: fc.Arbitrary<A>) => Record<string, fc.IProperty<unknown>>
```

Added in v1.0.0
