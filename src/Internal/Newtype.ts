/**
 * @internal
 * @since 1.0.0
 */

declare const unique_symbol: unique symbol

type EnforcedUniqueSymbol<Name extends symbol> = symbol extends Name ? typeof unique_symbol : symbol

abstract class INewtype<Name extends EnforcedUniqueSymbol<Name>, Type> {
  private Type!: Name
  private A!: Type
}

/**
 * @internal
 * @since 1.0.0
 */
export interface Newtype<Name extends EnforcedUniqueSymbol<Name>, Type>
  extends INewtype<Name, Type> {}

type GetName<T extends Newtype<any, any>> = T extends Newtype<infer Name, any> ? Name : never
type Unwrap<T extends Newtype<any, any>> = T extends Newtype<any, infer U> ? U : never

/**
 * @internal
 * @since 1.0.0
 */
export interface IsNewtype<T extends Newtype<any, any>> {
  wrap: (u: Unwrap<T>) => T
  unwrap: (t: T) => Unwrap<T>
}

/**
 * @internal
 * @since 1.0.0
 */
export function instanceIsNewtype<T extends Newtype<any, any>>(): IsNewtype<T> {
  return {
    wrap: (a) => a,
    unwrap: (a) => a as Unwrap<T>,
  }
}
