export function sg<T, K = T>(getter: () => T, defaultValue: K): T | K {
  try {
    return getter();
  } catch {
    return defaultValue;
  }
}
