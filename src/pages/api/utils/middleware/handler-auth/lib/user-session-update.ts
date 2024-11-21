import { clientAxiosApolloAdmin } from '@pages/api/utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '@pages/api/utils/functions/assert-server';
import { sNext } from '@pages/api/utils/functions/safe-next';
import { sResHeaders } from '@pages/api/utils/functions/safe-res';
import { EditTokenGqlMutation } from '@store/modules/token/gql-documents';
import { serialize } from 'cookie';
import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { createLoginSession, sessionData } from './session';

export const userSessionUpdate = async (
  req: G.IExtendedRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const { name, options: cookieOpts } = sessionData;

  const params = req?.query;
  /**
   * Only create new token if authCheck = true
   */
  if (!params?.authCheck) return sNext(res, next);

  try {
    /**
     * Create new token and set to 'req.session.newToken' for further use
     */
    const newToken = createLoginSession(req?.session);
    if (req?.session) req.session.newToken = newToken;
  } catch (error: any) {
    assertServer(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to create login session. ${error?.toString()}`
    );
  }

  assertServer(
    req?.session?.newToken,
    StatusCodes.NOT_FOUND,
    `New session token not found.`
  );

  let token: GQL_gen.Queries.EditTokenGqlMutation;

  try {
    /**
     * Update Token DB with new token
     */
    const client = clientAxiosApolloAdmin;

    token = await client<
      GQL_gen.Queries.EditTokenGqlMutation,
      GQL_gen.Queries.EditTokenGqlMutationVariables
    >({
      query: EditTokenGqlMutation,
      variables: {
        whereEditToken: { token: { _eq: req?.session?.currToken } },
        _setEditToken: { token: req?.session?.newToken }
      }
    });
  } catch (error: any) {
    assertServer(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Failed to update session in database. ${error?.toString()}`
    );
  }

  assertServer(
    token?.update_token?.returning?.[0]?.id,
    StatusCodes.NOT_FOUND,
    `Session was not updated in database.`
  );
  /**
   * Set new token to response headers
   */
  sResHeaders(
    res,
    'Set-Cookie',
    serialize(name, req?.session?.newToken, cookieOpts)
  );
  sResHeaders(res, 'authorization', `Bearer ${req?.session?.newToken}`);

  return sNext(res, next);
};
