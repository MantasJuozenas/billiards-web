import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';

import { resetPassword } from '../actions';

function* resetPasswordSagas(_action: ReturnType<typeof resetPassword>) {
  // yield console.log('__resetPasswordSagas');
}

export const ResetPasswordSagas = [
  takeLatest(resetPassword, lifecycleSaga(resetPasswordSagas))
];
