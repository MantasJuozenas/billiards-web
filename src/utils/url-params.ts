import { buildPath } from '@constants/routes';
import { NextRouter } from 'next/router';

export const setUrlValue = <T>(router: NextRouter, obj: T) => {
  const { replace, pathname } = router;
  const newParams = obj as any;

  if (newParams?.lang) {
    replace(buildPath(pathname, newParams, true, true), undefined, {
      shallow: true
    });
  }
};

export const getUrlValue = <T, K extends keyof T>(obj: T, key: K) => {
  const value = decodeURIComponent((obj?.[key] as any) || '');
  let valueBoolean = false;
  let valueNumber = 0;

  if (value === 'true') valueBoolean = true as any;
  if (value === 'false') valueBoolean = false as any;
  if (!Number?.isNaN(Number(value))) valueNumber = Number(value);

  return { value, valueBoolean, valueNumber };
};