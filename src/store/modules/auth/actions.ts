import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST, TSetAuthState } from './types';

export * from './permissions/actions';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const setIsLoggedIn = action<ST['isLoggedIn']>('auth.set_logged_in');
export const setAuthCheckComplete = action<ST['authCheckComplete']>('auth.set_auth_check_complete');
export const setLoginError = action<ST['loginError']>('auth.set_login_error');
export const setLoginSuccess = action<ST['loginSuccess']>('auth.set_login_success');
export const setLoggedInUser = action<ST['loggedInUser']>('auth.set_logged_in_user');

export const setIsUser = action<ST['isUser']>('auth.set_is_user');
export const setIsAdministrator = action<ST['isAdministrator']>('auth.set_is_administrator');
export const setIsAdmin = action<ST['isAdmin']>('auth.set_is_admin');

export const setAuthLevel = action<ST['authLevel']>('auth.set_auth_level');

export const setAuthState = action<G.TLifecycleSaga<{user: ST['loggedInUser']}>>('auth.set_auth_state');
export const setNewAuthState = action<TSetAuthState>('auth.set_new_auth_state');

export const loginWasSuccess = action('auth.login_was_success');
/* Saga actions */
export const login = action<G.TLifecycleSaga<Form.FLogin & {redirectPathAfterLogin: string; loginFrom: G.TLoginFrom;}>>('auth.login');
export const logout = action<G.TLifecycleSaga<{redirectPathAfterLogin?: string}>>('auth.logout');
// export const checkAuth = action('auth.check_auth');
export const checkAuth = action<G.TLifecycleSaga>('auth.check_auth');
export const reCheckAuth = action<G.TLifecycleSaga>('auth.re_check_auth');
export const remindPassword = action<G.TLifecycleSaga<Form.FRemindPassword>>('auth.remind_password');
export const resetPassword = action<G.TLifecycleSaga<Form.FChangePassword>>('auth.reset_password');
export const rememberLogin = action<G.TLifecycleSaga<{remember: boolean}>>('auth.remember_login');