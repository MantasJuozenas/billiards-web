import { defaultState as auth } from './modules/auth/types';
import { defaultState as cart } from './modules/cart/types';
import { defaultState as device } from './modules/device/types';
import { defaultState as flags } from './modules/flags/types';
import { defaultState as geoLocationDb } from './modules/geo-location-db/types';
import { defaultState as global } from './modules/global/types';
import { defaultState as menu } from './modules/menu/types';
import { defaultState as modalsAndForms } from './modules/modals-and-forms/types';
import { defaultState as translations } from './modules/translations/types';
import rootReducer from './root-reducer';

export type IStore = ReturnType<typeof rootReducer>;

export const defaultStore: IStore = {
  device,
  flags,
  global,
  router: { location: { href: '/', pathname: '/', hash: '', search: '' } },
  geoLocationDb,
  translations,
  auth,
  modalsAndForms,
  cart,
  menu
};
