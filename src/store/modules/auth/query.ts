import { clientAxiosApi } from '@clients/axios/client-axios-api';
import { apiRoutes } from '@constants/routes';
import { NHandlerAuthCheck } from '@pages/api/auth/auth-check';
import { NHandlerLogin } from '@pages/api/auth/login';
import { NHandlerLogout } from '@pages/api/auth/logout';

import {
  GetLocaleStorageAuthCookie,
  RemoveLocaleStorageAuthCookie,
  SetLocaleStorageAuthCookie
} from '../local-storage/functions/auth-cookie';

export const LoginApiQuery = async (
  body: NHandlerLogin.IBody
): Promise<NHandlerLogin.TRes> => {
  try {
    const response: G.TAxiosResponse<NHandlerLogin.TRes> =
      await clientAxiosApi().post(apiRoutes['auth/login'], body);

    // console.log('__LoginApiQuery', { response });
    if (response?.data?.status === 'ok' && response?.data?.payload?.token) {
      SetLocaleStorageAuthCookie(response?.data?.payload?.token);
    }

    return response?.data;
  } catch (error: any) {
    console.error(`LoginApiQuery > ERROR: ${error?.toString?.()}`);
    return error;
  }
};

export const LogoutApiQuery = async (): Promise<NHandlerLogout.TRes> => {
  try {
    const token = GetLocaleStorageAuthCookie();

    if (token) {
      clientAxiosApi().delete(apiRoutes['auth/logout'], {
        params: { authLogout: true }
      });

      RemoveLocaleStorageAuthCookie();

      return {} as any;

      // const response: G.TAxiosResponse<NHandlerLogout.TRes> =
      //   await clientAxiosApi().delete(apiRoutes['/auth/logout'], {
      //     params: { authLogout: true }
      //   });

      // console.log('__LogoutApiQuery', { response });
      // if (response?.data?.status === 'ok' && response?.data?.payload?.token) {
      //   SetLocaleStorageAuthCookie(response?.data?.payload?.token);
      // }

      // return response?.data;
    }

    return {} as any;
  } catch (error: any) {
    console.error(`LogoutApiQuery > ERROR: ${error?.toString?.()}`);
    return error;
  }
};

export const CheckAuthApiQuery = async (
  params?: NHandlerAuthCheck.TParams
): Promise<NHandlerAuthCheck.TRes> => {
  const authCheck = params?.authCheck ?? true;

  try {
    const response: G.TAxiosResponse<NHandlerAuthCheck.TRes> =
      await clientAxiosApi().get(apiRoutes['auth/auth-check'], {
        params: { ...params, authCheck }
      });

    // console.log('__CheckAuthApiQuery', { response });
    if (response?.data?.status === 'ok' && response?.data?.payload?.token) {
      SetLocaleStorageAuthCookie(response?.data?.payload?.token);
    }

    return response?.data;
  } catch (error: any) {
    console.error(`CheckAuthApiQuery > ERROR: ${error?.toString?.()}`);
    return error;
  }
};
