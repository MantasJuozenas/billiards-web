import { buildPath } from '@constants/routes';
import { NextRouter } from 'next/router';

// eslint-disable-next-line no-inline-comments
export const setUrlFilterValue = <T /* , K extends keyof T */>(
  router: NextRouter,
  obj: T
  // key: K,
  // value: T[K]
) => {
  const { replace, pathname } = router;
  const newParams = obj as any;

  // if (newParams?.lang) {
  //   replace(buildPath(pathname, newParams, true, true), undefined, {
  //     shallow: true
  //   });
  // }
  replace(buildPath(pathname, newParams, true, true), undefined, {
    shallow: true
  });
};

export const getUrlFilterValue = <T, K extends keyof T>(obj: T, key: K) => {
  const value = decodeURIComponent((obj?.[key] as any) || '');
  let valueBoolean = false;
  let valueNumber = 0;

  if (value === 'true') valueBoolean = true as any;
  if (value === 'false') valueBoolean = false as any;
  if (!Number?.isNaN(Number(value))) valueNumber = Number(value);

  return { value, valueBoolean, valueNumber };
};
