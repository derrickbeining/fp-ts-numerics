# fp-ts-numerics

===

This library is an early-stage work-in-progress. The idea is to provide some better numeric primitives that TypeScript (because JS) has lacked for too long; like integer types (everything from `UInt8` to arbitrary precision `Int`) and perhaps something like arbitrary precision `Decimal`. Along with
numeric data types, this lib will attempt to provide a numeric typeclass hierarchy, largely adapted from PureScript's typeclasses, but with some
minor adjustments. As its name suggests, `fp-ts-numerics` is meant to integrate with `fp-ts` and its related libraries.

I am by no means an expert in the domains of math and numbers and their implementation in computers, so I'm piecing together my understanding as I go. If you feel competent in these areas, I'd welcome any feedback/advice you care to share. Feel free to open an issue to start a conversation

## TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
