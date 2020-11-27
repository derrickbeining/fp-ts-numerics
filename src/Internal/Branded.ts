/**
 * @internal
 * @since 1.0.0
 */

declare const unique_symbol: unique symbol

type EnforcedUniqueSymbol<Name extends symbol> = symbol extends Name ? typeof unique_symbol : symbol

declare const Brand: unique symbol

type Brand<U, Id extends EnforcedUniqueSymbol<Id>> = {
  readonly [Brand]: [Id, U]
}

/**
 * @internal
 * @since 1.0.0
 */
export type Branded<U, Id extends EnforcedUniqueSymbol<Id>> = U & Brand<U, Id>
