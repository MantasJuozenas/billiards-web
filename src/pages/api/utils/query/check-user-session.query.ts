import gql from 'graphql-tag';

const CheckUserSessionGqlQuery = gql`
  query CheckUserSessionGqlQuery($whereToken: token_bool_exp) {
    token(where: $whereToken, limit: 1) {
      id
      created_at
      token
      user_id
      User {
        id
        username
        blocked
        role_id
      }
    }
  }
`;

export const CheckUserSessionQuery = async (
  body: NCheckUserSessionQuery.IBody
) => {
  const { client } = body;

  const res = await client<
    GQL_gen.Queries.CheckUserSessionGqlQuery,
    GQL_gen.Queries.CheckUserSessionGqlQueryVariables
  >({
    query: CheckUserSessionGqlQuery,
    variables: {
      whereToken: {
        token: { _eq: body?.token },
        User: {}
      }
    }
  });

  const token = res?.token?.[0];

  return { token };
};

export namespace NCheckUserSessionQuery {
  export interface IBody {
    client: G.TClientAxiosApollo;
    token: string;
  }

  export interface IRes {
    token: GQL_gen.Queries.CheckUserSessionGqlQuery['token'][0];
  }
}
