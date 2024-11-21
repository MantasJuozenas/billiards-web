import { createReducer as reducer, merge, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  authCheckComplete: reducer<ST['authCheckComplete']>(ds.authCheckComplete,
    reduce(A.setAuthCheckComplete, set)),
  isLoggedIn: reducer<ST['isLoggedIn']>(ds.isLoggedIn,
    reduce(A.setIsLoggedIn, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.isLoggedIn)),
  loggedInUser: reducer<ST['loggedInUser']>(ds.loggedInUser,
    reduce(A.setLoggedInUser, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.loggedInUser)),
  loginError: reducer<ST['loginError']>(ds.loginError,
    reduce(A.setLoginError, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.loginError)),
  loginSuccess: reducer<ST['loginSuccess']>(ds.loginSuccess,
    reduce(A.setLoginSuccess, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.loginSuccess)),
  isUser: reducer<ST['isUser']>(ds.isUser,
    reduce(A.setIsUser, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.isUser)),
  isAdministrator: reducer<ST['isAdministrator']>(ds.isAdministrator,
    reduce(A.setIsAdministrator, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.isAdministrator)),
  isAdmin: reducer<ST['isAdmin']>(ds.isAdmin,
    reduce(A.setIsAdmin, set),
    reduce(A.setNewAuthState, (s, { payload: pl }) => pl?.isAdmin)),
  authLevel: reducer<ST['authLevel']>(ds.authLevel,
    reduce(A.setAuthLevel, set),
    reduce(A.setNewAuthState, (s, {payload: pl}) => pl?.authLevel)),
  permissions: reducer<ST['permissions']>(ds.permissions,
    reduce(A.setPermissions, set),
    // @ts-ignore
    reduce(A.mergePermissions, merge))
});