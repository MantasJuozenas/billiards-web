import { all } from 'redux-saga/effects';

import { GetGeolocationSaga } from './get-geolocation.sagas';
import { GetIpstackSaga } from './get-ipstack.sagas';

export default function* rootSaga() {
  yield all([...GetGeolocationSaga, ...GetIpstackSaga]);
}
