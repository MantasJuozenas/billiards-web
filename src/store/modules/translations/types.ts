import { DEFAULT_LOCALE } from '@constants/app-constants';
import { omit } from '@utilsFn/omit';

export const defaultLocale = DEFAULT_LOCALE;
export const defaultLocale2 = DEFAULT_LOCALE;

export const languageNames = {
  en: 'English',
  lt: 'Lietuvių'
};
export const languageNames2 = omit(languageNames);

export type TDefaultLocales = keyof typeof languageNames;
export type TDefaultLocales2 = keyof typeof languageNames2;

export const locales: TDefaultLocales[] = ['en', 'lt'];
export const localesEn: Omit<TDefaultLocales2, 'lt'>[] = ['en'];

export interface IState {
  localeInitDone: boolean;
  defaultLocale: TDefaultLocales;
  defaultLocale2: TDefaultLocales2;
  locales: typeof locales;
  localesEn: typeof localesEn;
  languageNames: typeof languageNames;
}

export const defaultState: IState = {
  localeInitDone: false,
  defaultLocale,
  defaultLocale2,
  locales,
  localesEn,
  languageNames
};

// export function isLocale(tested: string): tested is typeof locales[number] {
//   return locales.some(locale => locale === tested);
// }

// export function getInitialLocale(): typeof locales[number] {
//   const localSetting = localStorage.getItem('locale');
//   if (localSetting && isLocale(localSetting)) {
//     return localSetting;
//   }

//   const [browserSetting] = navigator.language.split('-');
//   if (isLocale(browserSetting)) {
//     return browserSetting;
//   }

//   return defaultLocale;
// }
