/**
 * A type alias for functions, used improve how type signatures are displayed
 * for higher-order functions in the documentation. Otherwise, they just get
 * rendered as `function` or `(Anonymous function)`
 */
export type Fn<A extends Array<unknown>, R> = (...args: A) => R
