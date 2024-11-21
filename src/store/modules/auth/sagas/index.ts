import { all } from 'redux-saga/effects';

import { AuthStateSaga } from './auth-state.sagas';
import { CheckAuthSaga } from './check-auth-sagas';
import { GetActiveUserPermissionsSaga } from './get-active-user-permissions.sagas';
import { LoginSaga } from './login-sagas';
import { LogoutSaga } from './logout.sagas';
import { ReCheckAuthSaga } from './re-check-auth-sagas';
import { RememberLoginSaga } from './remember-login.sagas';
import { RemindPasswordSagas } from './remind-password.sagas';
import { ResetPasswordSagas } from './reset-password.sagas';

export default function* rootSaga() {
  yield all([
    ...GetActiveUserPermissionsSaga,
    ...AuthStateSaga,
    ...RememberLoginSaga,
    ...CheckAuthSaga,
    ...ReCheckAuthSaga,
    ...LoginSaga,
    ...RemindPasswordSagas,
    ...ResetPasswordSagas,
    ...LogoutSaga
  ]);
}
