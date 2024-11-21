import {
  getUrlFilterValue,
  setUrlFilterValue
} from '@utilsFn/url-params-filter';
import { useRouter } from 'next/router';
import React from 'react';

export interface IUsePagerProps {
  setInitial?: boolean;
  urlStartFromZero?: boolean;
}
/**
 * @example
 * const [page, setPage] = usePager({ urlStartFromZero: false });
 *
 * // Max page apribojimas
 * React.useEffect(() => {
 *  const lastPage = Math.ceil(totalCount / PAGE_SIZE_LIMIT);
 *  const clampedPage = Math.min(page, lastPage - 1);
 *
 *  if (loading) return;
 *  if (clampedPage === page) return;
 *  setPage(clampedPage);
 * }, [page, totalCount, loading]);
 */
export const usePager = (
  props?: IUsePagerProps
): [
  page: number,
  setPage: (page: number) => void,
  maxPageClamp: (pageCount: number, totalCount: number) => void
] => {
  const { urlStartFromZero = true } = props || {};

  const isMounted = React.useRef(false);
  const router = useRouter();
  const urlPage = getUrlFilterValue(router.query, 'page').valueNumber || 0;
  const page = Math.max(urlStartFromZero ? urlPage : urlPage - 1, 0);

  const setPage = React.useCallback(
    (nextPage: number) => {
      const offsetPage = urlStartFromZero ? nextPage : nextPage + 1;
      const clampedPage = Math.max(offsetPage, 0);
      setUrlFilterValue(router, { ...router?.query, page: clampedPage });
    },
    [urlStartFromZero]
  );
  const clampMax = React.useCallback(
    (pageSize: number, totalCount: number) => {
      const lastPage = Math.ceil(totalCount / pageSize);
      const clampedPage = Math.max(Math.min(page, lastPage - 1), 0);
      if (page > clampedPage) setPage(clampedPage);
    },
    [page, setPage]
  );

  React.useEffect(() => {
    if (props?.setInitial && !isMounted.current) {
      setPage(page);
    }

    isMounted.current = true;
  }, [page]);

  return [page, setPage, clampMax];
};
