/* eslint-disable sonarjs/no-duplicated-branches */
import {
  GetCustomerInfo,
  NGetCustomerInfo
} from '@pages/api/iiko/functions/get-customer-info';
import gql from 'graphql-tag';

const GetAuthUserGqlQuery = gql`
  query GetAuthUserGqlQuery(
    $whereUser: user_bool_exp
    $withPassword: Boolean!
  ) {
    user(where: $whereUser, limit: 1) {
      username
      blocked
      created_at
      email
      id
      name
      password @include(if: $withPassword)
      role_id
      updated_at
    }
  }
`;

export const GetAuthUserQuery = async (
  body: NGetAuthUserQuery.IBody
): Promise<NGetAuthUserQuery.IRes> => {
  const {
    client,
    withPassword = false,
    userId = 0,
    email = '',
    username = '',
    loginFrom = 'default-login'
  } = body;

  let user: NGetAuthUserQuery.IRes['user'] = null as any;
  const customer = userId ? (null as any) : await GetCustomerInfo({ username });

  if (loginFrom === 'default-login' && (customer?.id || userId)) {
    const resUser = await client<
      GQL_gen.Queries.GetAuthUserGqlQuery,
      GQL_gen.Queries.GetAuthUserGqlQueryVariables
    >({
      query: GetAuthUserGqlQuery,
      variables: {
        withPassword,
        whereUser: userId
          ? { id: { _eq: userId } }
          : email
          ? { email: { _eq: email } }
          : { username: { _eq: username } }
      }
    });

    user = resUser?.user?.[0];
  } else if (loginFrom === 'admin-login' && (username || userId)) {
    const resUser = await client<
      GQL_gen.Queries.GetAuthUserGqlQuery,
      GQL_gen.Queries.GetAuthUserGqlQueryVariables
    >({
      query: GetAuthUserGqlQuery,
      variables: {
        withPassword,
        whereUser: userId
          ? { id: { _eq: userId } }
          : email
          ? { email: { _eq: email } }
          : { username: { _eq: username } }
      }
    });

    user = resUser?.user?.[0];
  }

  return { user, customer };
};

export namespace NGetAuthUserQuery {
  export interface IBody {
    client: G.TClientAxiosApollo;
    withPassword?: boolean;
    userId?: number;
    email?: string;
    username?: string;
    loginFrom?: G.TLoginFrom;
  }

  export interface IRes {
    user: GQL_gen.Queries.GetAuthUserGqlQuery['user'][0];
    customer: NGetCustomerInfo.TRes;
  }
}
