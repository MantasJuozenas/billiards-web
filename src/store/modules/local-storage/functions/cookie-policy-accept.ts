import { LOCAL_STORAGE_COOKIE_POLICY_ACCEPT } from '@constants/app-constants';
import { LocalStorage } from '@utilsFn/local-storage';

export const GetLocaleStorageCookiePolicyAccept = () => {
  const locale = LocalStorage()?.getItem(LOCAL_STORAGE_COOKIE_POLICY_ACCEPT);
  return locale === 'true';
};

export const SetLocaleStorageCookiePolicyAccept = (value: 'true' | 'false') => {
  LocalStorage()?.setItem(LOCAL_STORAGE_COOKIE_POLICY_ACCEPT, value);
  return value;
};

export const RemoveLocaleStorageCookiePolicyAccept = () => {
  LocalStorage()?.removeItem(LOCAL_STORAGE_COOKIE_POLICY_ACCEPT);
};
