import { all } from 'redux-saga/effects';

import { GetDefaultLanguageSaga } from './get-default-language.sagas';

export default function* rootSaga() {
  yield all([...GetDefaultLanguageSaga]);
}
