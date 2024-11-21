import { GetLocaleStorageLocale } from '@store/modules/local-storage/functions/locale';
import { getDefaultLanguage } from '@store/modules/translations/actions';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { call, put, select } from 'redux-saga/effects';

import { getGeoLocation, getIpstack, setGeoLocation } from '../actions';
import { GetGeolocationQuery } from '../query';
import { IGeoLocation } from '../types';

export function* getGeolocationSaga(action: ReturnType<typeof getGeoLocation>) {
  const state: G.IStore = yield select();
  const { defaultLocale, languageNames } = state.translations;
  // const { hideLang } = state.flags;
  let userLocale = GetLocaleStorageLocale();

  try {
    const res: IGeoLocation = yield call(GetGeolocationQuery);

    if (!res) throw new Error('getGeolocationQuery > error');

    if (res?.country_code && !userLocale) {
      /* eslint-disable prettier/prettier */
      const countryCodeLowerCase = res?.country_code?.toLowerCase();
      const countryCode = countryCodeLowerCase === 'us' ? 'en-us' : countryCodeLowerCase;
      // @ts-ignore
      userLocale = (languageNames?.[countryCode] ? countryCode : defaultLocale) as G.TDefaultLocales;
      /* eslint-enable prettier/prettier */
    } else if (defaultLocale !== userLocale) {
      userLocale = languageNames?.[userLocale] ? userLocale : defaultLocale;
    }

    // eslint-disable-next-line no-inline-comments
    const HIDE_LANG = false; // res?.country_code?.toLowerCase() === 'us';
    const DEFAULT_LOCALE = defaultLocale;

    // if (HIDE_LANG) DEFAULT_LOCALE = 'en-us';

    yield HIDE_LANG
      ? put(
          getDefaultLanguage({
            locale: DEFAULT_LOCALE,
            hideLang: HIDE_LANG
          })
        )
      : put(
          getDefaultLanguage({
            locale: userLocale,
            hideLang: HIDE_LANG
          })
        );
    yield put(setGeoLocation(res));
  } catch (error: any) {
    console.error(`getGeolocationSaga > error`, error?.toString());
    // eslint-disable-next-line prettier/prettier
      if (!action?.payload?.calledFromError) yield put(getIpstack({ calledFromError: true }));
  }
}

export const GetGeolocationSaga = [
  takeLatest(getGeoLocation, lifecycleSaga(getGeolocationSaga))
];
