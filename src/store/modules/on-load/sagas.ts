import { onLoad } from '@utilsFn/sagas-helpers';
import { all } from 'redux-saga/effects';

import { checkAuthSaga } from '../auth/sagas/check-auth-sagas';
import { userAgentSaga } from '../device/sagas/user-agent.sagas';
import { getLocalStorageFlagSidePanelCollapsedSaga } from '../flags/sagas/get-local-storage-flag-side-panel-collapsed.sagas';
import { getGeolocationSaga } from '../geo-location-db/sagas/get-geolocation.sagas';

export default function* rootSaga() {
  yield all([
    onLoad(checkAuthSaga),
    onLoad(userAgentSaga),
    // IS_PROD ? onLoad(getIpstackSaga) : onLoad(getGeolocationSaga),
    onLoad(getGeolocationSaga),
    onLoad(getLocalStorageFlagSidePanelCollapsedSaga)
  ]);
}
