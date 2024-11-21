/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/prefer-ternary */
import { NHandlerLogin } from '@pages/api/auth/login';
import { ELoginResError } from '@typings/custom/enum-custom';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { replace } from 'connected-next-router';
import { call, put, select } from 'redux-saga/effects';

import {
  getPermissions,
  login,
  rememberLogin,
  setAuthCheckComplete,
  setAuthState,
  setLoginError
} from '../actions';
import { LoginApiQuery } from '../query';
import { authStateSaga } from './auth-state.sagas';
import { getActiveUserPermissionsSaga } from './get-active-user-permissions.sagas';
import { rememberLoginSaga } from './remember-login.sagas';

export function* authenticateSaga(props: {
  username: string;
  password: string;
  redirectPathAfterLogin?: string;
  loginFrom: G.TLoginFrom;
}): any {
  const loginFrom = props?.loginFrom;

  const state: G.IStore = yield select();
  const { isAuthOn } = state.flags;

  yield authStateSaga(setAuthState({ user: null }));

  if (isAuthOn) {
    const res: NHandlerLogin.TRes = yield call(LoginApiQuery, {
      username: props?.username,
      password: props?.password,
      loginFrom
    });

    if (res?.status === 'error') throw new Error(res?.error?.msg);

    if (
      res?.status === 'ok' &&
      (loginFrom === 'default-login' || loginFrom === 'admin-login')
    ) {
      yield authStateSaga(setAuthState({ user: res?.payload?.user || null }));
    }

    yield getActiveUserPermissionsSaga(getPermissions());

    if (props?.redirectPathAfterLogin) {
      yield put(replace(props?.redirectPathAfterLogin));
    } else {
      //
    }
  } else {
    yield authStateSaga(setAuthState({ user: null }));

    if (props?.redirectPathAfterLogin) {
      yield put(replace(props?.redirectPathAfterLogin));
    }
  }
}

function* loginSaga(action: ReturnType<typeof login>) {
  // yield console.log('__loginSaga');

  try {
    yield put(setAuthCheckComplete(false));

    yield call(authenticateSaga, {
      username: action?.payload?.username,
      password: action?.payload?.password,
      redirectPathAfterLogin: action?.payload?.redirectPathAfterLogin,
      loginFrom: action?.payload?.loginFrom
    });

    yield rememberLoginSaga(
      rememberLogin({ remember: action?.payload?.rememberMe })
    );
  } catch (error: any) {
    console.error(`loginSaga > ERROR: ${error?.toString?.()}`);
    yield authStateSaga(setAuthState({ user: null }));
    // @ts-ignore
    const knownError = ELoginResError?.[(error?.message || '') as string];

    if (knownError) {
      yield put(setLoginError(error?.message));
    } else {
      yield put(setLoginError(ELoginResError['Įvyko klaida']));
    }
  } finally {
    yield put(setAuthCheckComplete(true));
  }
}

export const LoginSaga = [takeLatest(login, lifecycleSaga(loginSaga))];
