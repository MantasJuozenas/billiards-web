import React from 'react';

export const usePrevious = <T>(value: T): T => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef<T>();
  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
    // eslint-disable-next-line no-inline-comments
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  // @ts-ignore
  return ref.current;
};
