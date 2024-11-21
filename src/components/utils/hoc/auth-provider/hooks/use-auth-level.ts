import { useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';

import { HandlerUnauthorizedAccess } from '../functions/handler-unauthorized-access';

const AuthHierarchy: G.TAuthLevel[] = [
  'public',
  'user',
  'administrator',
  'super-admin'
];

const DefaultLevelIndex = 999;
const DefaultState: NUseAuthLevel.TState = {
  pageAuthLevelIndex: DefaultLevelIndex,
  userAuthLevelIndex: 0,
  authLevelOk: true,
  isPublicRoute: true,
  isAuthRoute: false,
  showLoader: false
};

export const useAuthLevel = (props: NUseAuthLevel.TProps) => {
  const defaultProps = props?.pageDefaultProps;

  const router = useRouter();

  const authLevel = useSelector((s) => s.auth.authLevel);
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const isAppReady = useSelector((s) => s.global.isAppReady);
  const permissions = useSelector((s) => s.auth.permissions);
  const authCheckComplete = useSelector((s) => s.auth.authCheckComplete);

  let state = { ...DefaultState };
  // console.log('__state_prev', { state });

  /**
   * authLevel
   */
  let pageAuthLevelIndex = DefaultLevelIndex;
  const userAuthLevelIndex = AuthHierarchy?.indexOf(authLevel);

  if (defaultProps?.authLevel) {
    const authLevelIndex = AuthHierarchy?.indexOf?.(defaultProps?.authLevel);
    if (authLevelIndex >= 0) pageAuthLevelIndex = authLevelIndex;
  }

  if (defaultProps?.authLevelDic?.[authLevel]) {
    const authLevelIndex = AuthHierarchy?.indexOf?.(authLevel);
    if (authLevelIndex >= 0) pageAuthLevelIndex = authLevelIndex;
  }

  const authLevelOk = pageAuthLevelIndex <= userAuthLevelIndex;
  const isPublicRoute = pageAuthLevelIndex === 0;
  const isAuthRoute = !isPublicRoute;
  const showLoader = !!(isAuthRoute && !authCheckComplete) || !authLevelOk;

  state = {
    ...state,
    pageAuthLevelIndex,
    userAuthLevelIndex,
    authLevelOk,
    isPublicRoute,
    isAuthRoute,
    showLoader
  };

  if (
    isAppReady &&
    // localeInitDone &&
    authCheckComplete
  ) {
    HandlerUnauthorizedAccess({
      router,
      isLoggedIn,
      authLevelOk,
      permissions,
      isPublicRoute,
      authCheckComplete
    });
  }

  // console.log('__state_new', { state });

  return { state };
};

export namespace NUseAuthLevel {
  export type TProps = {
    // pageDefaultProps: G.TExtendedAppProps['Component']['defaultProps'];
    pageDefaultProps: G.IExtendedAppProps['Component']['defaultProps'];
  };

  export type TState = {
    pageAuthLevelIndex: number;
    userAuthLevelIndex: number;
    authLevelOk: boolean;
    isPublicRoute: boolean;
    isAuthRoute: boolean;
    showLoader: boolean;
  };
}
