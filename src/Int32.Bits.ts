/**
 * @since 1.0.0
 */
import { Int32 } from './Int32'
import { UInt32 } from './UInt32'

/** Performs the bitwise AND operation on each pair of bits.
 *
 * @since 1.0.0
 */
export function and(a: Int32, b: Int32): Int32 {
  return Int32.unsafeFromNumber(Int32.toNumber(a) & Int32.toNumber(b))
}

/** Performs the bitwise OR operation on each pair of bits.
 *
 * @since 1.0.0
 */
export function or(a: Int32, b: Int32): Int32 {
  return Int32.unsafeFromNumber(Int32.toNumber(a) | Int32.toNumber(b))
}

/** Performs the bitwise XOR operation on each pair of bits.
 *
 * @since 1.0.0
 */
export function xor(a: Int32, b: Int32): Int32 {
  return Int32.unsafeFromNumber(Int32.toNumber(a) ^ Int32.toNumber(b))
}

/**
 * Bitwise shift left
 * Shifts the first operand the specified number of bits to the
 * left. Excess bits shifted off to the left are discarded. Zero bits are
 * shifted in from the right.
 *
 * @since 1.0.0
 */
export function shl(a: Int32, b: Int32): Int32 {
  return Int32.unsafeFromNumber(Int32.toNumber(a) << Int32.toNumber(b))
}

/**
 * Bitwise shift right.
 *
 * Shifts the first operand the specified number of bits to the
 * right. Excess bits shifted off to the right are discarded. Copies of the
 * leftmost bit are shifted in from the left. Since the new leftmost bit has
 * the same value as the previous leftmost bit, the sign bit (the leftmost bit)
 * does not change.
 *
 * @since 1.0.0
 */
export function shr(a: Int32, b: Int32): Int32 {
  return Int32.unsafeFromNumber(Int32.toNumber(a) >> Int32.toNumber(b))
}

/**
 * Bitwise zero-fill shift right.
 *
 * This operator shifts the first operand the specified number of bits to the
 * right. Excess bits shifted off to the right are discarded. Zero bits are
 * shifted in from the left. The sign bit becomes 0, so the result is always
 * non-negative.  Unlike the other bitwise operators, zero-fill right shift
 * returns an unsigned 32-bit integer.
 *
 * @since 1.0.0
 */
export function zshr(a: Int32, b: Int32): UInt32 {
  return UInt32.unsafeFromNumber(Int32.toNumber(a) >>> Int32.toNumber(b))
}

/** Performs the bitwise NOT operation on each pair of bits.
 *
 * @since 1.0.0
 */
export function complement(a: Int32): Int32 {
  return Int32.unsafeFromNumber(~Int32.toNumber(a))
}
