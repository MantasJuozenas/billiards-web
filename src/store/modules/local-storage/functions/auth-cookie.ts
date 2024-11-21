import { LOCAL_STORAGE_AUTH_COOKIE_NAME } from '@constants/app-constants';
import { LocalStorage } from '@utilsFn/local-storage';

export const GetLocaleStorageAuthCookie = () => {
  return LocalStorage()?.getItem(LOCAL_STORAGE_AUTH_COOKIE_NAME);
};

export const SetLocaleStorageAuthCookie = (value: string) => {
  LocalStorage()?.setItem(LOCAL_STORAGE_AUTH_COOKIE_NAME, value);
  return value;
};

export const RemoveLocaleStorageAuthCookie = () => {
  LocalStorage()?.removeItem(LOCAL_STORAGE_AUTH_COOKIE_NAME);
};
