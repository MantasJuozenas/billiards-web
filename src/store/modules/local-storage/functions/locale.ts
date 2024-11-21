import { LOCAL_STORAGE_LOCALE } from '@constants/app-constants';
import { defaultLocale } from '@store/modules/translations/types';
import { LocalStorage } from '@utilsFn/local-storage';

export const GetLocaleStorageLocale = () => {
  return (
    (LocalStorage()?.getItem(LOCAL_STORAGE_LOCALE) as G.TDefaultLocales) ||
    defaultLocale
  );
};

export const SetLocaleStorageLocale = (locale: G.TDefaultLocales) => {
  LocalStorage()?.setItem(LOCAL_STORAGE_LOCALE, locale);
  return locale;
};

export const RemoveLocaleStorageLocale = () => {
  LocalStorage()?.removeItem(LOCAL_STORAGE_LOCALE);
};
