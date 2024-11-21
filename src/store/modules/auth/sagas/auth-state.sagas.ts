import { buildPath, routes } from '@constants/routes';
import { mergeLoginData } from '@store/modules/modals-and-forms/actions';
import { ELoginResError, ELoginSuccess } from '@typings/custom/enum-custom';
import { ERoles } from '@typings/graphql/enum-schema';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { put, select } from 'redux-saga/effects';

import { setAuthState, setNewAuthState, setPermissions } from '../actions';
import { TSetAuthState } from '../types';

const defaultAuthState: TSetAuthState = {
  isLoggedIn: false,
  loggedInUser: null,
  loginError: ELoginResError.noError,
  loginSuccess: ELoginSuccess.noSuccess,
  isUser: false,
  isAdministrator: false,
  isAdmin: false,
  authLevel: 'public'
};

export function* authStateSaga(action: ReturnType<typeof setAuthState>) {
  // yield console.log('__authStateSaga');

  const user = action?.payload?.user;

  if (user) {
    const state: G.IStore = yield select();
    const login = state?.modalsAndForms?.login;
    const currAuthLevel = state?.auth.authLevel || defaultAuthState.authLevel;

    const authState: TSetAuthState = {
      isLoggedIn: true,
      loggedInUser: user,
      loginError: ELoginResError.noError,
      loginSuccess: ELoginSuccess.ok,
      isUser: user?.role_id === ERoles.user,
      isAdministrator: user?.role_id === ERoles.administrator,
      isAdmin: user?.role_id === ERoles.admin,
      authLevel: currAuthLevel
    };

    yield put(setNewAuthState(authState));

    if (
      (state?.router?.location?.pathname === buildPath(routes.login) ||
        state?.router?.location?.pathname === '/login') &&
      !login?.redirectPathAfterLogin
    ) {
      const redirectPathAfterLogin = routes['profile/my-points'];
      // if (authState?.isUser) {
      //   redirectPathAfterLogin = routes.profile;
      // } else if (authState?.isAdmin) {
      //   redirectPathAfterLogin = routes.admin;
      // }

      yield put(mergeLoginData({ redirectPathAfterLogin }));
    }

    if (
      (state?.router?.location?.pathname === buildPath(routes['admin-login']) ||
        state?.router?.location?.pathname === '/admin-login') &&
      !login?.redirectPathAfterLogin
    ) {
      let redirectPathAfterLogin = routes.home;

      if (authState?.isAdministrator) {
        redirectPathAfterLogin = routes['admin/time-blocking'];
      }

      yield put(mergeLoginData({ redirectPathAfterLogin }));
    }
  } else {
    yield put(setNewAuthState(defaultAuthState));
    yield put(setPermissions(null));
  }
}

export const AuthStateSaga = [
  takeLatest(setAuthState, lifecycleSaga(authStateSaga))
];
