import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';

import { remindPassword } from '../actions';

function* remindPasswordSagas(_action: ReturnType<typeof remindPassword>) {
  // yield console.log('__remindPasswordSagas');
}

export const RemindPasswordSagas = [
  takeLatest(remindPassword, lifecycleSaga(remindPasswordSagas))
];
