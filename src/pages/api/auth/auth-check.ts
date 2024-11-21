import { sRes } from '@apiUtilsFn/safe-res';
import { handlerAuth } from '@pages/api/utils/middleware/handler-auth';
import { StatusCodes } from 'http-status-codes';

import { clientAxiosApolloAdmin } from '../utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '../utils/functions/assert-server';
import {
  GetAuthUserQuery,
  NGetAuthUserQuery
} from '../utils/query/get-auth-user.query';

export default handlerAuth().get<G.IExtendedRequest>(
  async (req, res, _next) => {
    let resAuthUser: NGetAuthUserQuery.IRes;

    try {
      /**
       * Fetch data to return
       */
      const client = clientAxiosApolloAdmin;

      resAuthUser = await GetAuthUserQuery({
        client,
        userId: req?.session?.user?.id,
        loginFrom: req?.session?.user?.loginFrom
      });
    } catch (error: any) {
      assertServer(false, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }

    if (resAuthUser?.user?.id) {
      return sRes(res, StatusCodes.OK, {
        status: 'ok',
        payload: { user: resAuthUser?.user, token: req?.session?.newToken }
      });
    }

    return sRes(res, StatusCodes.NOT_FOUND, { status: 'ok' });
  }
);

export namespace NHandlerAuthCheck {
  export type TParams = G.IExtendedRequest['query'] & {
    userId?: string;
  };

  export type TRes = G.TApiRes<{
    user: NGetAuthUserQuery.IRes['user'];
    token: string;
  }>;
}
