import { createReducer as reducer, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import { SetLocaleStorageLocale } from '../local-storage/functions/locale';
import * as A from './actions';
import { defaultState as ds, IState as ST, localesEn } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  localeInitDone: reducer<ST['localeInitDone']>(ds.localeInitDone,
    reduce(A.SetLocaleInitDone, set)),
  defaultLocale: reducer<ST['defaultLocale']>(ds.defaultLocale,
    reduce(A.setDefaultLanguage, (_, {payload: pl}) => {
      const { lang } = pl;

      SetLocaleStorageLocale(lang)

      return lang;
    })
  ),
  defaultLocale2: reducer<ST['defaultLocale2']>(ds.defaultLocale2,
    reduce(A.setDefaultLanguage2, (_, {payload: pl}) => pl?.lang),
    reduce(A.setDefaultLanguage, (_, {payload: pl}) => {
      const { lang } = pl;

      const localeEN = localesEn?.find(locale => locale === lang);
      // eslint-disable-next-line sonarjs/prefer-immediate-return
      const langCode = localeEN ? 'en' : lang;

      return langCode
    })),
  locales: () => (ds.locales),
  localesEn: () => (ds.localesEn),
  languageNames: () => (ds.languageNames)
});
