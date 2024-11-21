import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { replace } from 'connected-next-router';
import { call, put } from 'redux-saga/effects';

import {
  logout,
  rememberLogin,
  setAuthCheckComplete,
  setAuthState
} from '../actions';
import { LogoutApiQuery } from '../query';
import { authStateSaga } from './auth-state.sagas';
import { rememberLoginSaga } from './remember-login.sagas';

export function* logoutSaga(action: ReturnType<typeof logout>) {
  // yield console.log('__logoutSaga');

  yield put(setAuthCheckComplete(false));

  yield rememberLoginSaga(rememberLogin({ remember: false }));

  try {
    yield call(LogoutApiQuery);
  } catch (error: any) {
    console.error(`logoutSaga > ERROR: ${error?.toString?.()}`);
  } finally {
    if (action?.payload?.redirectPathAfterLogin) {
      yield put(replace(action?.payload?.redirectPathAfterLogin));
    }
    yield authStateSaga(setAuthState({ user: null }));
    yield put(setAuthCheckComplete(true));
  }
}

export const LogoutSaga = [takeLatest(logout, lifecycleSaga(logoutSaga))];
