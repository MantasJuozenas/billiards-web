import { all, fork } from 'redux-saga/effects';

import { breakpointFlowSaga } from './breakpoint-flow.sagas';
import { serviceWorkerFlowSaga } from './service-worker-flow.sagas';

export default function* rootSaga() {
  yield all([fork(serviceWorkerFlowSaga), fork(breakpointFlowSaga)]);
}
