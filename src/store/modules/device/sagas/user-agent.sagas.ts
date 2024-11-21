import { put } from 'redux-saga/effects';
import UAParser from 'ua-parser-js';

import { setUaInfo } from '../actions';

export function* userAgentSaga() {
  const parser = new UAParser().getResult();
  yield put(setUaInfo(parser));
}
