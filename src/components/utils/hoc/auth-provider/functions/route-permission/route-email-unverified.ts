import { routes } from '@constants/routes';

export const RouteEmailUnverified = (
  pathname: string,
  _permissions: G.IStore['auth']['permissions']
) => {
  let allowed = true;

  // allowed = !(pathname !== routes.lang && pathname !== routes.password_change);
  allowed = !(pathname !== routes.home);

  return allowed;
};
