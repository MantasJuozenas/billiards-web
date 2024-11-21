/* eslint-disable max-len */
import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const SetLocaleInitDone = action<ST['localeInitDone']>('translations.set_locale_init_done');
export const setDefaultLanguage = action<{lang: ST['defaultLocale']} & {hideLang?: boolean}>('translations.set_default_language');
export const setDefaultLanguage2 = action<{lang: ST['defaultLocale2']} & {hideLang?: boolean}>('translations/set_default_language_2');
/* Saga actions */
export const getDefaultLanguage = action<G.TLifecycleSaga<{locale?: ST['defaultLocale'], hideLang?: boolean}>>('translations.get_default_language');
