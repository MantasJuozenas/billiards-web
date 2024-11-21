export function omit<T extends object, K extends [...Array<keyof T>]>(
  value: T,
  ...keys: K
): { [R in Exclude<keyof T, K[number]>]: T[R] } {
  value = { ...value };
  keys.forEach((key) => {
    delete value[key];
  });
  return value;
}
export function pick<T extends object, K extends keyof T>(
  value: T,
  ...keys: K[]
): Pick<T, K> {
  return keys.reduce((a, b) => {
    (a as any)[b] = value[b];
    return a;
  }, {}) as any;
}
