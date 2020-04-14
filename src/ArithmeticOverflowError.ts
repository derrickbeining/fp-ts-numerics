/**
 * @since 1.0.0
 */
export class ArithmeticOverflowError extends Error {
  constructor(
    type: string,
    operation: string,
    operand1: unknown,
    operand2: unknown
  ) {
    super(
      `The result of ${type}.${operation}(${operand1}, ${operand2}) exceeds the bounds of type ${type}.`
    )
  }
}
