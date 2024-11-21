/* eslint-disable no-promise-executor-return */
export function delay(milliseconds: number) {
  return new Promise((res) => setTimeout(res, milliseconds));
}
