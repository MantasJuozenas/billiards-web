import { takeLatest } from '@utilsFn/sagas-helpers';
import { delay, put } from 'redux-saga/effects';

import { setToastData } from '../actions';

export function* setToastDataSaga(action: ReturnType<typeof setToastData>) {
  if (!action.payload.openModalType) return;
  if (!action.payload.autoCloseAfter) return;
  yield delay(action.payload.autoCloseAfter);
  yield put(setToastData({ ...action.payload, openModalType: null }));
}

export const SetToastDataSaga = [takeLatest(setToastData, setToastDataSaga)];
