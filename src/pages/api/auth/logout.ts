import { DeleteTokenGqlMutation } from '@store/modules/token/gql-documents';
import { StatusCodes } from 'http-status-codes';

import { clientAxiosApolloAdmin } from '../utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '../utils/functions/assert-server';
import { sRes } from '../utils/functions/safe-res';
import { handlerAuth } from '../utils/middleware/handler-auth';

export default handlerAuth().delete<G.IExtendedRequest>(
  async (req, res, _next) => {
    try {
      // console.log('__handlerLogout');

      if (req?.session?.newToken || req?.session?.currToken) {
        const client = clientAxiosApolloAdmin;

        await client<
          GQL_gen.Queries.DeleteTokenGqlMutation,
          GQL_gen.Queries.DeleteTokenGqlMutationVariables
        >({
          query: DeleteTokenGqlMutation,
          variables: {
            whereDeleteToken: {
              _or: [
                { token: { _eq: req?.session?.newToken || '' } },
                { token: { _eq: req?.session?.currToken || '' } }
              ]
            }
          }
        });
      }
      req.session = {};

      return sRes(res, StatusCodes.OK, {
        status: 'ok',
        payload: {}
      });

      // assertServer(
      //   false,
      //   StatusCodes.OK,
      //   'handlerLogout > generate public token'
      // );
    } catch (error: any) {
      assertServer(false, error?.status, error?.data);
    }
  }
);

export namespace NHandlerLogout {
  export type TRes = G.TApiRes;
  // export type TRes = G.TApiRes<{
  //   token: string;
  // }>;
}
