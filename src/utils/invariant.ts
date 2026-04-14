/**
 * Requires the condition to be truthy. If the condition is not truthy, this
 * function will throw an `Error` with the message provided, or if no message is
 * provided, an `Error` with a default "Invariant violated" message.
 *
 * @param condition that must be true to proceed. If condition is falsy, an
 * error will be thrown.
 * @param message Optional message for the thrown `Error`
 */
export function invariant(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || "Invariant violated");
  }
}