import { routes } from '@constants/routes';

// import { RouteEmailUnverified } from './route-permission/route-email-unverified';

/**
 * Here we add custom auth logic for specific route, we must return boolean value
 * (true or false but not null, if null is returned it will do default route auth check)
 * also there is an option to pass custom redirect if auth fails for current route check
 *
 * Ex:
 *
 * if (pathname === routes.schedule) {
 * we must create custom function like RouteSchedule() (in DIR: route-permission/route-<route name>.ts)
 * there we do our checks and then we return boolean
 * routePermission = RouteSchedule(permissions);
 * }
 */
export const HandlerCheckRouteForPermissions = (
  _props: NHandlerCheckRouteForPermissions.IProps
) => {
  // const { pathname, permissions } = props;

  const routePermission: null | boolean = null;
  const redirectTo = routes.home;

  // if (!emailVerified) {
  //   routePermission = RouteEmailUnverified(pathname, permissions);
  //   return { routePermission, redirectTo };
  // }

  return { routePermission, redirectTo };
};

export namespace NHandlerCheckRouteForPermissions {
  export interface IProps {
    pathname: string;
    permissions: G.IStore['auth']['permissions'];
  }
}
