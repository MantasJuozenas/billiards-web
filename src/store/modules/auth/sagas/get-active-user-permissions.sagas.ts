import { clientAxiosApollo } from '@clients/axios/client-axios-apollo';
import { ERoles } from '@typings/graphql/enum-schema';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { call, put, select } from 'redux-saga/effects';

import { getPermissions, setAuthLevel, setPermissions } from '../actions';
import {
  GetPermissionsGqlQuery,
  NGetPermissionsGqlQuery
} from '../permissions/query';

export function* getActiveUserPermissionsSaga(
  _action: ReturnType<typeof getPermissions>
) {
  //   yield console.log('__getActiveUserPermissionsSaga');

  const state: G.IStore = yield select();

  const userId = state.auth?.loggedInUser?.id;
  if (!userId) return;

  try {
    let { authLevel } = state.auth;
    const user = state.auth.loggedInUser;
    const client = clientAxiosApollo;

    if (user?.role_id === ERoles.user) authLevel = 'user';
    if (user?.role_id === ERoles.administrator) authLevel = 'administrator';
    if (user?.role_id === ERoles.admin) authLevel = 'super-admin';

    yield put(setAuthLevel(authLevel));

    const { permissions }: NGetPermissionsGqlQuery.IReturn = yield call(
      GetPermissionsGqlQuery,
      { client, userId }
    );

    if (permissions) {
      yield put(setPermissions(permissions));
    }
  } catch (error: any) {
    console.error(
      `getActiveUserPermissionsSaga > ERROR: ${error?.toString?.()}`
    );

    yield put(setAuthLevel('public'));
    yield put(setPermissions(null));
  }
}

export const GetActiveUserPermissionsSaga = [
  takeLatest(getPermissions, lifecycleSaga(getActiveUserPermissionsSaga))
];
