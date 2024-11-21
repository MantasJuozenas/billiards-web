// import { routerReducer } from '@store/middleware/connected-router';
import { routerReducer } from 'connected-next-router';
import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import cart from './modules/cart/reducer';
import device from './modules/device/reducer';
import flags from './modules/flags/reducer';
import geoLocationDb from './modules/geo-location-db/reducer';
import global from './modules/global/reducer';
import menu from './modules/menu/reducer';
import modalsAndForms from './modules/modals-and-forms/reducer';
import translations from './modules/translations/reducer';

const rootReducer = combineReducers({
  device,
  flags,
  global,
  router: routerReducer,
  geoLocationDb,
  translations,
  auth,
  modalsAndForms,
  cart,
  menu
});

export default rootReducer;
