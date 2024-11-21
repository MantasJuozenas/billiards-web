import { put, select } from '@redux-saga/core/effects';
import { GetLocaleStorageLocale } from '@store/modules/local-storage/functions/locale';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';

import * as A from '../actions';

export function* getDefaultLanguageSaga(
  action: ReturnType<typeof A.getDefaultLanguage>
) {
  const state: G.IStore = yield select();
  const { localeInitDone, defaultLocale, languageNames } = state.translations;

  try {
    let userLocale = GetLocaleStorageLocale();

    if (action?.payload?.locale) {
      userLocale = action?.payload?.locale;
    } else if (defaultLocale !== userLocale) {
      userLocale = languageNames[userLocale] ? userLocale : defaultLocale;
    }

    yield action?.payload?.hideLang
      ? put(
          A.setDefaultLanguage({
            lang: action?.payload?.locale as any,
            hideLang: !!action?.payload?.hideLang
          })
        )
      : put(
          A.setDefaultLanguage({
            lang: userLocale,
            hideLang: !!action?.payload?.hideLang
          })
        );

    if (!localeInitDone) {
      yield put(A.SetLocaleInitDone(true));
    }
  } catch (error: any) {
    console.error('getDefaultLanguageSaga > ERROR:', error?.toString?.());
  }
}

export const GetDefaultLanguageSaga = [
  takeLatest(A.getDefaultLanguage, lifecycleSaga(getDefaultLanguageSaga))
];
