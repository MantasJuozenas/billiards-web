import { LOCAL_STORAGE_REMEMBER_USER } from '@constants/app-constants';
import { LocalStorage } from '@utilsFn/local-storage';

export const GetLocaleStorageRememberUser = () => {
  return LocalStorage()?.getItem(LOCAL_STORAGE_REMEMBER_USER);
};

export const SetLocaleStorageRememberUser = (value: boolean) => {
  LocalStorage()?.setItem(LOCAL_STORAGE_REMEMBER_USER, value?.toString());
  return value;
};

export const RemoveLocaleStorageRememberUser = () => {
  LocalStorage()?.removeItem(LOCAL_STORAGE_REMEMBER_USER);
};
