import { isNotBrowser } from '@utilsFn/check-browser';
import { checkOS } from '@utilsFn/check-os';
import { put } from 'redux-saga/effects';
import UAParser from 'ua-parser-js';

import { setOperatingSystem, setUaInfo } from '../actions';

export function* setOperatingSystemSaga() {
  if (isNotBrowser()) return;

  const os = checkOS();
  const parser = new UAParser().getResult();

  try {
    let osActive: G.TOperatingSystem = 'web';
    if (os?.mobileAndroid) osActive = 'android';
    if (os?.mobileWin) osActive = 'winMobile';
    if (os?.mobileShittyIos) osActive = 'iOS';

    yield put(setOperatingSystem(osActive));
    yield put(setUaInfo(parser));
  } catch (error: any) {
    console.error('setOperatingSystemSaga > ERROR:', error?.toString?.());
  }
}
