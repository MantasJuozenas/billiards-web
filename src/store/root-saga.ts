import { all, fork } from 'redux-saga/effects';

import auth from './modules/auth/sagas';
import cart from './modules/cart/sagas';
import device from './modules/device/sagas';
import flags from './modules/flags/sagas';
import geoLocationDb from './modules/geo-location-db/sagas';
import global from './modules/global/sagas';
import menu from './modules/menu/sagas';
import modalsAndForms from './modules/modals-and-forms/sagas';
import onLoad from './modules/on-load/sagas';
import translations from './modules/translations/sagas';

function* rootSaga() {
  yield all([
    fork(onLoad),
    fork(device),
    fork(flags),
    fork(global),
    fork(geoLocationDb),
    fork(translations),
    fork(auth),
    fork(modalsAndForms),
    fork(cart),
    fork(menu)
  ]);
}

export default rootSaga;
