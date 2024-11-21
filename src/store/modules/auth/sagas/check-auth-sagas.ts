import { NHandlerAuthCheck } from '@pages/api/auth/auth-check';
import { GetLocaleStorageRememberUser } from '@store/modules/local-storage/functions/remember-user';
import { ELoginResError } from '@typings/custom/enum-custom';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { call, put, select } from 'redux-saga/effects';

import {
  checkAuth,
  getPermissions,
  logout,
  setAuthCheckComplete,
  setAuthState,
  setLoginError
} from '../actions';
import { CheckAuthApiQuery } from '../query';
import { authStateSaga } from './auth-state.sagas';
import { getActiveUserPermissionsSaga } from './get-active-user-permissions.sagas';
import { logoutSaga } from './logout.sagas';

export function* checkAuthSaga(_action: ReturnType<typeof checkAuth>): any {
  // yield console.log('__checkAuthSaga');

  yield put(setAuthCheckComplete(false));

  const state: G.IStore = yield select();
  const { isAuthOn } = state.flags;

  if (!isAuthOn) {
    yield authStateSaga(setAuthState({ user: null }));
    yield put(setAuthCheckComplete(true));
    return;
    // return yield logoutSaga(logout({}));
  }

  try {
    const rememberMe = GetLocaleStorageRememberUser();
    if (!rememberMe || rememberMe === 'false') {
      return yield logoutSaga(logout({}));
    }

    const res: NHandlerAuthCheck.TRes = yield call(CheckAuthApiQuery);

    if (!res?.payload?.user?.id) {
      throw new Error(ELoginResError['Vartotojas nerastas']);
    }

    // if (!res?.payload?.user?.id && !res?.payload?.token) {
    //   throw new Error(ELoginResError['Vartotojas nerastas']);
    // }

    yield authStateSaga(setAuthState({ user: res?.payload?.user }));

    yield getActiveUserPermissionsSaga(getPermissions());

    yield put(setAuthCheckComplete(true));
  } catch (error: any) {
    console.error(`checkAuthSaga > ERROR: ${error?.toString?.()}`);
    yield put(setLoginError(error?.message));
    yield logoutSaga(logout({}));
  }
}

export const CheckAuthSaga = [
  takeLatest(checkAuth, lifecycleSaga(checkAuthSaga))
];
