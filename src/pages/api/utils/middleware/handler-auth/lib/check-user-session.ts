import { clientAxiosApolloAdmin } from '@pages/api/utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '@pages/api/utils/functions/assert-server';
import { GetHasuraAuth } from '@pages/api/utils/functions/get-hasura-auth';
import { sNext } from '@pages/api/utils/functions/safe-next';
import {
  CheckUserSessionQuery,
  NCheckUserSessionQuery
} from '@pages/api/utils/query/check-user-session.query';
import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export const checkUserSession = async (
  req: G.IExtendedRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  // console.log('__checkUserSession');

  assertServer(
    req?.session?.currToken,
    StatusCodes.NOT_FOUND,
    `Session token not found`
  );

  let token: NCheckUserSessionQuery.IRes['token'] | undefined;

  try {
    /**
     * Find token in Token DB
     */
    const client = clientAxiosApolloAdmin;

    token = await CheckUserSessionQuery({
      client,
      token: req?.session?.currToken || ''
    }).then((rollData) => rollData?.token || '');
  } catch (error: any) {
    assertServer(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      `tokenDB. ${error?.toString()}`
    );
  }

  assertServer(token?.id, StatusCodes.NOT_FOUND, `Token not found in database`);
  assertServer(
    token?.user_id === req?.session?.user?.id,
    StatusCodes.CONFLICT,
    `Token userId !== session userId`
  );
  assertServer(
    !token?.User?.blocked,
    StatusCodes.UNAUTHORIZED,
    `User is blocked`
  );
  /**
   * Token found
   */
  /**
   * Updated data set to 'req.session.user' for further use
   */
  const { hasuraAuth } = GetHasuraAuth({
    userId: `${token?.User?.id}`,
    userRoleId: token?.User?.role_id
  });

  req.session = {
    ...req.session,
    hasura: { claims: hasuraAuth },
    user: {
      id: token?.User?.id,
      username: token?.User?.username,
      role_id: token?.User?.role_id,
      loginFrom: req?.session?.user?.loginFrom
    }
  };

  return sNext(res, next);
};
