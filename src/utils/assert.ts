/* eslint-disable max-classes-per-file */
/** Assertion error class to identify assertion errors */
export declare class AssertError extends Error {}
/**
 * Asserts given condition. If condition is invalid, error is trown.
 * @param condition valid value condition.
 * @param msg error message to throw, when condition is invalid.
 * @throws {AssertError} assertion error with assertion error message.
 */
export declare function assert(condition: any, msg?: string): asserts condition;
export declare type AssertionBlockType = [() => any, () => void];
/**
 * Assertor class which can call multiple assertions and instead of firing exception
 * keeps error state in memory.
 */
export declare class Assertor {
  private _valid;

  /**
   * Indicator showing if error has occured.
   */
  get valid(): boolean;

  constructor();

  /**
   * Asserts condition without throwing error.
   * @param condition - condition to check
   * @param callback - callback to call, if error occured.
   */
  assertCallback(condition: any, callback: () => void): void;

  /**
   * Asserts array of conditions. Stops after first error encounter.
   * @param assertions [condition, callback] - condition and callback pair.
   */
  assertionBlock(...assertions: AssertionBlockType[]): void;

  /**
   * If exception during assertion was raised, then this function raises it.
   * @param error
   */
  throwInvalid(error?: string): void;
}
