import { NHandlerAuthCheck } from '@pages/api/auth/auth-check';
import { ELoginResError } from '@typings/custom/enum-custom';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { call, select } from 'redux-saga/effects';

import { getPermissions, reCheckAuth, setAuthState } from '../actions';
import { CheckAuthApiQuery } from '../query';
import { authStateSaga } from './auth-state.sagas';
import { getActiveUserPermissionsSaga } from './get-active-user-permissions.sagas';

function* reCheckAuthSaga(_action: ReturnType<typeof reCheckAuth>): any {
  // yield console.log('__reCheckAuthSaga');

  try {
    const state: G.IStore = yield select();

    const loggedInUser = state.auth?.loggedInUser;
    const userId = loggedInUser?.id;

    if (!userId) return;

    const res: NHandlerAuthCheck.TRes = yield call(CheckAuthApiQuery, {
      userId: `${userId}`
    });

    if (!res?.payload?.user?.id) {
      throw new Error(ELoginResError['Vartotojas nerastas']);
    }

    // if (!res?.payload?.user?.id && !res?.payload?.token) {
    //   throw new Error(ELoginResError['Vartotojas nerastas']);
    // }

    yield authStateSaga(setAuthState({ user: res?.user }));

    yield getActiveUserPermissionsSaga(getPermissions());
  } catch (error: any) {
    console.error(`reCheckAuthSaga > ERROR: ${error?.toString?.()}`);
    // yield put(setLoginError(error?.message));
    // yield logoutSaga(logout({}));
  }
}

export const ReCheckAuthSaga = [
  takeLatest(reCheckAuth, lifecycleSaga(reCheckAuthSaga))
];
