import { GetLocaleStorageLocale } from '@store/modules/local-storage/functions/locale';

import { DEFAULT_LOCALE } from './app-constants';
import { appRoutes } from './app-routes';
import { regexBetweenSquareBrackets } from './regex';

export const routes = appRoutes.en;

export const apiRoutes = {
  'auth/auth-check': '/api/auth/auth-check',
  'auth/login': '/api/auth/login',
  'auth/logout': '/api/auth/logout',

  'customer/get-card-data': '/api/customer/get-card-data',
  'product/upsert-product-list': '/api/product/upsert-product-list',

  'reservation/create-reservation': `/api/reservation/create-reservation`,
  'reservation/reservation-blocked-days': `/api/reservation/reservation-blocked-days`,
  'reservation/reservation-blocked-times': `/api/reservation/reservation-blocked-times`,

  'order/create': `/api/order/create`
};

export const backendRoutes = {};

export const iikoApiRoutes = {
  nomenclature: `/nomenclature`,
  organizations: `/organizations`,
  'order/create': `/order/create`,
  'order/init_by_table': '/order/init_by_table',
  'order/by_table': '/order/by_table',
  'order/add_items': '/order/add_items',
  'loyalty/iiko/customer/info': `/loyalty/iiko/customer/info`
};

export const buildPath = (
  path: string,
  params?: { [key: string]: string | number },
  addLeftOver = false,
  deleteEmpty = false,
  routerLocale = DEFAULT_LOCALE
) => {
  const locale = GetLocaleStorageLocale() || routerLocale;

  const isHomeRoute = path === '/';
  const fixedPath = path?.replace?.('/', '');
  // eslint-disable-next-line prettier/prettier
  const newPath = isHomeRoute ? path : (appRoutes as any)?.[locale]?.[fixedPath];

  // console.log({ fixedPath, newPath });
  path = newPath;

  const pathParams: any = { ...params };

  const used = new Set();
  // Replace the parts in [xxx]
  path = path?.replace(regexBetweenSquareBrackets, (_match, p1) => {
    used.add(p1);
    // eslint-disable-next-line prettier/prettier
    return p1 in pathParams ? encodeURIComponent(pathParams[p1]) : '';
  });

  // Add query string if there are any left over
  if (addLeftOver) {
    const qstr = Object.entries(pathParams)
      .filter(([key, value]) => {
        if (deleteEmpty) return value && !used.has(key);
        return !used.has(key);
      })
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
      )
      .join('&');

    return path + (qstr && `?${qstr}`);
  }
  return path;
};
