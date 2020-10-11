/**
 *
 * *WARNING:*
 * `number` cannot be a fully law-abiding member of several classes due
 * to the potential for arithmetic overflows and the presence of NaN and
 * Infinity values. Behaviour is unspecified in these cases.
 *
 * @since 1.0.0
 */

import { Bounded } from 'fp-ts/lib/Bounded'
import { Eq, eqNumber as fptsEqNumber } from 'fp-ts/lib/Eq'
import { Ord, ordNumber as fptsOrdNumber } from 'fp-ts/lib/Ord'
import { Show, showNumber } from 'fp-ts/lib/Show'

import { CommutativeRing, instanceCommutativeRing } from './CommutativeRing'
import { DivisionRing, instanceDivisionRing } from './DivisionRing'
import { EuclideanRing, instanceEuclideanRing } from './EuclideanRing'
import { Field, instanceField } from './Field'
import { Natural } from './Natural'
import { NonZero } from './NonZero'
import { instanceRing, Ring } from './Ring'
import { instanceSemiring, Semiring } from './Semiring'

/**
 * @since 1.0.0
 */
export function add(x: number, y: number): number {
  return x + y
}

/**
 * @since 1.0.0
 */
export function mul(x: number, y: number): number {
  return x * y
}

/**
 * @since 1.0.0
 */
export function sub(x: number, y: number): number {
  return x - y
}

/**
 * @since 1.0.0
 */
export function degree(_: number): Natural {
  return Natural.one
}

/**
 * @since 1.0.0
 */
export function div(dvd: number, dvr: NonZero<number>): number {
  return dvd / dvr
}

/**
 * @since 1.0.0
 */
export function mod(_: number, __: NonZero<number>): number {
  return zero
}

/**
 * @since 1.0.0
 */
export function recip(n: NonZero<number>): number {
  return div(one, n)
}

/**
 * @since 1.0.0
 */
export const one: number = 1

/**
 * @since 1.0.0
 */
export const zero: number = 0

/**
 * Instance of `Eq` for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const eqNumber: Eq<number> = {
  ...fptsEqNumber,
}

/**
 * Instance of `Ord` for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ordNumber: Ord<number> = {
  ...eqNumber,
  compare: fptsOrdNumber.compare,
}

/**
 * Instance of [[Semiring]] for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const boundedNumber: Bounded<number> = {
  ...ordNumber,
  bottom: -Infinity,
  top: Infinity,
}

/**
 * Instance of [[Semiring]] for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const semiringNumber = instanceSemiring<number>({
  add,
  mul,
  one,
  zero,
})

/**
 * Instance of [[Ring]] for `number`
 *
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const ringNumber = instanceRing<number>({
  ...semiringNumber,
  sub,
})

/**
 * Instance of [[CommutativeRing]] for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const commutativeRingNumber = instanceCommutativeRing<number>(ringNumber)

/**
 * Instance of [[EuclideanRing]] for `number`
 *
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const euclideanRingNumber = instanceEuclideanRing<number>({
  ...commutativeRingNumber,
  degree,
  div,
  mod,
})

/**
 * Instance of [[DivisionRing]] for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const divisionRingNumber = instanceDivisionRing<number>({
  ...ringNumber,
  recip,
})

/**
 * Instance of [[Field]] for `number`
 * @category Typeclass Instance
 * @since 1.0.0
 */
export const fieldNumber = instanceField<number>({
  ...euclideanRingNumber,
  ...divisionRingNumber,
})

/**
 * @since 1.0.0
 */
export const number: Bounded<number> &
  CommutativeRing<number> &
  DivisionRing<number> &
  Eq<number> &
  EuclideanRing<number> &
  Field<number> &
  Ord<number> &
  Ring<number> &
  Semiring<number> &
  Show<number> = {
  ...commutativeRingNumber,
  ...divisionRingNumber,
  ...eqNumber,
  ...fieldNumber,
  ...ordNumber,
  ...showNumber,
  ...boundedNumber,
  ...euclideanRingNumber,
  ...fieldNumber,
  ...ringNumber,
  ...semiringNumber,
}
