/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable sonarjs/no-all-duplicated-branches */
import { IS_PROD, PROD_TESTING_ENABLED } from '@constants/app-constants';
import React from 'react';

export const useProdTestingEnabled = () => {
  const ref = React.useRef(false);

  if (IS_PROD && PROD_TESTING_ENABLED) {
    ref.current = true;
  } else {
    ref.current = true;
  }
  // React.useEffect(() => {
  //   if (IS_PROD && PROD_TESTING_ENABLED) {
  //     ref.current = true;
  //   } else {
  //     ref.current = true;
  //   }
  // }, [IS_PROD, PROD_TESTING_ENABLED]);

  return { prodTestingEnabled: ref?.current };
};
