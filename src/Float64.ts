/**
 *
 * *WARNING:*
 * `Float64` cannot be a fully law-abiding member of several classes due
 * to the potential for arithmetic overflows and the presence of `NaN` and
 * `Infinity` values. Behaviour is unspecified in these cases.
 *
 * @since 1.0.0
 */

import * as fc from 'fast-check'
import { bounded, eq, ord, show as fptsShow } from 'fp-ts'

import * as commutativeRing from './CommutativeRing'
import * as divisionRing from './DivisionRing'
import * as euclideanRing from './EuclideanRing'
import * as field from './Field'
import * as hasAdd from './HasAdd'
import * as hasMul from './HasMul'
import * as hasOne from './HasOne'
import * as hasSub from './HasSub'
import * as hasZero from './HasZero'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import * as ring from './Ring'
import * as semiring from './Semiring'

type HasAdd<T> = hasAdd.HasAdd<T>
type HasMul<T> = hasMul.HasMul<T>
type HasOne<T> = hasOne.HasOne<T>
type HasSub<T> = hasSub.HasSub<T>
type HasZero<T> = hasZero.HasZero<T>
type Bounded<T> = bounded.Bounded<T>
type CommutativeRing<T> = commutativeRing.CommutativeRing<T>
type DivisionRing<T> = divisionRing.DivisionRing<T>
type Eq<T> = eq.Eq<T>
type EuclideanRing<T> = euclideanRing.EuclideanRing<T>
type Field<T> = field.Field<T>
type Ord<T> = ord.Ord<T>
type Ring<T> = ring.Ring<T>
type Semiring<T> = semiring.Semiring<T>
type Show<T> = fptsShow.Show<T>

/**
 * Alias of the native JavaScript `number` type, which is in double-precision
 * 64-bit binary format IEEE 754
 *
 * @since 1.0.0
 */
export type Float64 = number

/**
 * @since 1.0.0
 */
export function add(x: Float64, y: Float64): Float64 {
  return x + y
}

/**
 * @since 1.0.0
 */
export function mul(x: Float64, y: Float64): Float64 {
  return x * y
}

/**
 * @since 1.0.0
 */
export function sub(x: Float64, y: Float64): Float64 {
  return x - y
}

/**
 * @since 1.0.0
 */
export function degree(_: Float64): Natural {
  return Natural.one
}

/**
 * @since 1.0.0
 */
export function div(dvd: Float64, dvr: NonZero<Float64>): Float64 {
  return dvd / dvr
}

/**
 * @since 1.0.0
 */
export function mod(_: Float64, __: NonZero<Float64>): Float64 {
  return zero
}

/**
 * @since 1.0.0
 */
export function recip(n: NonZero<Float64>): Float64 {
  return div(one, n)
}

/**
 * @since 1.0.0
 */
export const one: Float64 = 1

/**
 * @since 1.0.0
 */
export const zero: Float64 = 0

/**
 * `Arbitrary<Float64>` instance from `fast-check`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Arbitrary: fc.Arbitrary<Float64> = fc.double()

/**
 * Instance of [[Bouned]] for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Bounded: Bounded<Float64> = bounded.boundedNumber

/**
 * Instance of `Eq` for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Eq: Eq<Float64> = eq.eqNumber

/**
 * Instance of `Ord` for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ord: Ord<Float64> = ord.ordNumber

/**
 * Instance of `Ord` for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Show: Show<Float64> = fptsShow.showNumber

/**
 * Instance of [[Semiring]] for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Semiring: Semiring<Float64> = {
  add,
  mul,
  one,
  zero,
}

/**
 * Instance of [[Ring]] for `Float64`
 *
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Ring: Ring<Float64> = {
  add,
  mul,
  one,
  zero,
  sub,
}

/**
 * Instance of [[CommutativeRing]] for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const CommutativeRing: CommutativeRing<Float64> = Ring

/**
 * Instance of [[EuclideanRing]] for `Float64`
 *
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const EuclideanRing: EuclideanRing<Float64> = {
  add,
  mul,
  one,
  zero,
  sub,
  degree,
  div,
  mod,
}

/**
 * Instance of [[DivisionRing]] for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const DivisionRing: DivisionRing<Float64> = {
  add,
  mul,
  one,
  zero,
  sub,
  recip,
}

/**
 * Instance of [[Field]] for `Float64`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const Field: Field<Float64> = {
  add,
  mul,
  one,
  zero,
  sub,
  degree,
  div,
  mod,
  recip,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasZero: HasZero<Float64> = {
  zero,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasOne: HasOne<Float64> = {
  one,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasAdd: HasAdd<Float64> = {
  add,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasSub: HasSub<Float64> = {
  sub,
}

/**
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const HasMul: HasMul<Float64> = {
  mul,
}

/**
 * @since 1.0.0
 */
export const equals = Eq.equals

/**
 * @since 1.0.0
 */
export const compare = Ord.compare

/**
 * @since 1.0.0
 */
export const show = Show.show

/**
 * @since 1.0.0
 */
export const top = Bounded.top

/**
 * @since 1.0.0
 */
export const bottom = Bounded.bottom

/**
 * @since 1.0.0
 */
export const Float64: Bounded<Float64> &
  CommutativeRing<Float64> &
  DivisionRing<Float64> &
  Eq<Float64> &
  EuclideanRing<Float64> &
  Field<Float64> &
  HasAdd<Float64> &
  HasMul<Float64> &
  HasOne<Float64> &
  HasSub<Float64> &
  HasZero<Float64> &
  Ord<Float64> &
  Ring<Float64> &
  Semiring<Float64> &
  Show<Float64> & {
    Arbitrary: typeof Arbitrary
    Bounded: typeof Bounded
    CommutativeRing: typeof CommutativeRing
    DivisionRing: typeof DivisionRing
    Eq: typeof Eq
    EuclideanRing: typeof EuclideanRing
    Field: typeof Field
    HasAdd: typeof HasAdd
    HasMul: typeof HasMul
    HasOne: typeof HasOne
    HasSub: typeof HasSub
    HasZero: typeof HasZero
    Ord: typeof Ord
    Ring: typeof Ring
    Semiring: typeof Semiring
    Show: typeof Show
  } = {
  add,
  Arbitrary,
  bottom,
  Bounded,
  CommutativeRing,
  compare,
  degree,
  div,
  DivisionRing,
  Eq,
  equals,
  EuclideanRing,
  Field,
  HasAdd,
  HasMul,
  HasOne,
  HasSub,
  HasZero,
  mod,
  mul,
  one,
  Ord,
  recip,
  Ring,
  Semiring,
  Show,
  show,
  sub,
  top,
  zero,
}
