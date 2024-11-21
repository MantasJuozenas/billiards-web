import { buildPath, routes } from '@constants/routes';
import { NextRouter } from 'next/router';

import { HandlerCheckRouteForPermissions } from './handler-check-route-for-permissions';

export const HandlerUnauthorizedAccess = (
  props: NHandlerUnauthorizedAccess.IProps
) => {
  const {
    router,
    isLoggedIn,
    authLevelOk,
    permissions,
    isPublicRoute,
    authCheckComplete
  } = props;

  const params = router?.query as G.IQueryParams;

  if (authCheckComplete) {
    if (!isLoggedIn) {
      if (!isPublicRoute) {
        return router?.push?.(buildPath(routes.home, { ...params }));
      }
    } else {
      /**
       * If routePermission returns null it will do default route auth check
       * else it will do route auth check by permissions
       * (that you have to do in HandlerCheckRouteForPermissions())
       * DON'T DO ANYTHING HERE, WITHOUT TELLING!!!
       * ALL MUST BE DONE IN HandlerCheckRouteForPermissions()
       */
      const { routePermission, redirectTo } = HandlerCheckRouteForPermissions({
        permissions,
        pathname: router?.pathname
      });

      if (typeof routePermission === 'boolean') {
        if (!routePermission) {
          return router?.push?.(buildPath(redirectTo, { ...params }));
        }
      } else if (!authLevelOk) {
        return router?.push?.(buildPath(routes.home, { ...params }));
      }
    }
  }
};

export namespace NHandlerUnauthorizedAccess {
  export interface IProps {
    router: NextRouter;
    isLoggedIn: boolean;
    authLevelOk: boolean;
    isPublicRoute: boolean;
    authCheckComplete: boolean;
    permissions: G.IStore['auth']['permissions'];
  }
}
