import { all } from 'redux-saga/effects';

import { GetMenuListSaga } from './get-menu-list.sagas';

export default function* rootSaga() {
  yield all([...GetMenuListSaga]);
}
