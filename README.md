# fp-ts-numerics

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This library is an early-stage work-in-progress. The idea is to provide some better numeric
primitives that TypeScript (because JS) has lacked for too long; like integer types (everything from
`UInt8` to arbitrary precision `Int`) and perhaps something like arbitrary precision `Decimal`.
Along with numeric data types, this lib will attempt to provide a numeric typeclass hierarchy,
largely adapted from PureScript's typeclasses, but with some minor adjustments. As its name
suggests, `fp-ts-numerics` is meant to integrate with `fp-ts` and its related libraries.

I am by no means an expert in the domains of math and numbers and their implementation in computers,
so I'm piecing together my understanding as I go. If you feel competent in these areas, I'd welcome
any feedback/advice you care to share. Feel free to open an issue to start a conversation
