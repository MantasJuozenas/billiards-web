import { GetLocaleStorageAuthCookie } from '@store/modules/local-storage/functions/auth-cookie';
import { isBrowser } from '@utilsFn/check-browser';
import axios from 'axios';

export const clientAxiosApi = () => {
  const token = GetLocaleStorageAuthCookie() || '';

  let instance = axios.create({
    // baseURL: API_URL,
    timeout: 300_000,
    withCredentials: true,
    headers: { authorization: `Bearer ${token}` }
  });

  if (isBrowser()) {
    instance = axios.create({
      baseURL: window.location.origin,
      timeout: 300_000,
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` }
    });
  }

  return instance;
};
