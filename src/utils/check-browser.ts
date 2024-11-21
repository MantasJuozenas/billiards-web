export const isNotBrowser = () => {
  return !!(
    typeof window === 'undefined' ||
    localStorage === undefined ||
    typeof localStorage === 'undefined'
  );
};

export const isBrowser = () => {
  return !!(
    typeof window !== 'undefined' &&
    localStorage !== undefined &&
    typeof localStorage !== 'undefined'
  );
};
