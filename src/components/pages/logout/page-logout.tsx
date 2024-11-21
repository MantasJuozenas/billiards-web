import { Loaders } from '@components/utils/loaders';
import { buildPath, routes } from '@constants/routes';
import { logout } from '@store/modules/auth/actions';
import { useEffect } from '@utilsFn/hooks/use-effect';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';
import React from 'react';

export const PageLogout = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const isAuthOn = useSelector((s) => s.flags.isAuthOn);
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const authCheckComplete = useSelector((s) => s.auth.authCheckComplete);

  useEffect({
    effect: () => {
      if (!isAuthOn) {
        router.replace(buildPath(routes.home));
      } else if (authCheckComplete && !isLoggedIn) {
        router.replace(buildPath(routes.login));
      }
    },
    deps: []
  });

  useEffect({
    effect: () => {
      if (!isAuthOn) return;
      if (!isLoggedIn) return;

      dispatch(logout({ redirectPathAfterLogin: buildPath(routes.login) }));
    },
    deps: [router?.isReady, isLoggedIn]
  });

  return <Loaders isLoading />;
};
