import { useEffect } from '@utilsFn/hooks/use-effect';
import { useDispatch } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';

import { HandlerPathnameChange } from '../functions/handler-pathname-change';

export const usePathnameChange = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect({
    effect: () => {
      // if (!localeInitDone) return;

      // console.log('____HandlerPathnameChanges');
      HandlerPathnameChange({ router, dispatch });
    },
    // deps: [localeInitDone, router?.pathname]
    deps: [router?.pathname]
  });
};
