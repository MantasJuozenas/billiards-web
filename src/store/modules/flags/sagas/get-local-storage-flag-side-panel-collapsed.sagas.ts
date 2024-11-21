import { GetLocaleStorageFlagSidePanelCollapsed } from '@store/modules/local-storage/functions/flag-side-panel-collapsed';
import { put } from 'redux-saga/effects';

import { flag_setNavbarSidePanelCollapsed } from '../actions';

export function* getLocalStorageFlagSidePanelCollapsedSaga() {
  try {
    const sidePanelCollapsed = GetLocaleStorageFlagSidePanelCollapsed();

    yield put(flag_setNavbarSidePanelCollapsed(sidePanelCollapsed));
  } catch (error: any) {
    console.error(
      'getLocalStorageFlagSidePanelCollapsedSaga > ERROR:',
      error?.toString?.()
    );
  }
}

// export const GetLocalStorageFlagSidePanelCollapsedSaga = [
//   fork(getLocalStorageFlagSidePanelCollapsedSaga)
// ];
