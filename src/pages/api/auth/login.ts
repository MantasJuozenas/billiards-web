import { authenticate } from '@api/utils/passport/strategies';
import { ELoginResError } from '@typings/custom/enum-custom';
import { serialize } from 'cookie';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { assertServer } from '../utils/functions/assert-server';
import { onErrorOk } from '../utils/functions/on-error';
import { sRes, sResHeaders } from '../utils/functions/safe-res';
import { sessionData } from '../utils/middleware/handler-auth/lib/session';
// import { hashPassword } from '../utils/sequelize/main-db/models/users';

const handlerLogin = nc<G.TNextApiRequest, G.TNextApiResponse>({
  onError: onErrorOk
});

handlerLogin.post<G.IExtendedRequest>(async (req, res, _next) => {
  // console.log('__handlerLogin');
  const body = req?.body as NHandlerLogin.IBody;

  try {
    // const pass = await hashPassword('1Admin');
    // console.log({ pass });

    if (body?.loginFrom === 'default-login') {
      await authenticate('login', req, res);
    } else if (body?.loginFrom === 'admin-login') {
      await authenticate('admin-login', req, res);
    }

    if (req?.user?.id && req?.session?.newToken) {
      sResHeaders(
        res,
        'Set-Cookie',
        serialize(
          sessionData?.name,
          req?.session?.newToken,
          sessionData?.options
        )
      );
      sResHeaders(res, 'authorization', `Bearer ${req?.session?.newToken}`);

      return sRes(res, StatusCodes.OK, {
        status: 'ok',
        payload: { user: req?.user, token: req?.session?.newToken }
      });
    }

    assertServer(
      false,
      StatusCodes.NO_CONTENT,
      ELoginResError['Netinkamas kortelės numeris']
    );
  } catch (error: any) {
    assertServer(false, error?.status, error?.data);
  }
});

export default handlerLogin;

export namespace NHandlerLogin {
  export interface IBody {
    username: string;
    password: string;
    loginFrom: G.TLoginFrom;
  }

  export type TRes = G.TApiRes<{
    user: G.ISessionUser['user'];
    token: string;
  }>;
}
