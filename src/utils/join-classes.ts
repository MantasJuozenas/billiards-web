export const joinClasses = (
  ...c: Array<string | boolean | undefined | [any, string]>
): string => {
  const classes: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const part of c) {
    if (typeof part === 'string') {
      classes.push(part);
    } else if (Array.isArray(part) && !!part[0]) {
      classes.push(part[1]);
    }
  }
  return classes.join(' ');
};
