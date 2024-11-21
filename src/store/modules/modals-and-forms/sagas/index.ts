import { all } from 'redux-saga/effects';

import { mafLifecycleController } from './maf-lifecycle.sagas';
import { SetToastDataSaga } from './set-toast-data.sagas';

export default function* rootSaga() {
  yield mafLifecycleController();
  yield all([...SetToastDataSaga]);
}
