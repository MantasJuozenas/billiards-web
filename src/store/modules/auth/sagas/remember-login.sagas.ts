import {
  RemoveLocaleStorageRememberUser,
  SetLocaleStorageRememberUser
} from '@store/modules/local-storage/functions/remember-user';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';

import { rememberLogin } from '../actions';

export function* rememberLoginSaga(action: ReturnType<typeof rememberLogin>) {
  //   yield console.log('__rememberLoginSaga');

  yield action?.payload?.remember
    ? SetLocaleStorageRememberUser(action?.payload?.remember)
    : RemoveLocaleStorageRememberUser();
}

export const RememberLoginSaga = [
  takeLatest(rememberLogin, lifecycleSaga(rememberLoginSaga))
];
