import { NHandlerLogin } from '@pages/api/auth/login';
import { AddTokenGqlMutation } from '@store/modules/token/gql-documents';
import { AddUserGqlMutation } from '@store/modules/user/gql-documents';
import { ELoginResError } from '@typings/custom/enum-custom';
import { ERoles } from '@typings/graphql/enum-schema';
import { omit } from '@utilsFn/omit';
import { StatusCodes } from 'http-status-codes';
import { Strategy } from 'passport-local';

import { LOGIN_PASSWORD } from '../../backend-constants';
import { clientAxiosApolloAdmin } from '../../clients/axios/client-axios-apollo-admin';
import { assertServer } from '../../functions/assert-server';
import { GetHasuraAuth } from '../../functions/get-hasura-auth';
import { createLoginSession } from '../../middleware/handler-auth/lib/session';
import { GetAuthUserQuery } from '../../query/get-auth-user.query';
import {
  comparePasswords,
  hashPassword
} from '../../sequelize/main-db/models/users';

export const loginStrategy = new Strategy(
  {
    session: false,
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req: G.IExpressExtendedRequest, username, password, next) => {
    const body = req?.body as NHandlerLogin.IBody;

    const client = clientAxiosApolloAdmin;

    try {
      /**
       * Find basic info about user and profile
       */
      const resAuthUser = await GetAuthUserQuery({
        client,
        username,
        withPassword: true
      });

      let userJSON = resAuthUser?.user;
      const customerJSON = resAuthUser?.customer;

      // eslint-disable-next-line prettier/prettier
      assertServer(customerJSON?.id, StatusCodes.NOT_FOUND, ELoginResError['Netinkamas kortelės numeris']);

      if (!userJSON?.id) {
        /* eslint-disable prettier/prettier */
        const passwordIsValid = password === LOGIN_PASSWORD;
        assertServer(passwordIsValid, StatusCodes.UNAUTHORIZED, ELoginResError['Netinkamas kodas'])
        /* eslint-enable prettier/prettier */
        /** Need to create if user from customer */
        const passHash = await hashPassword(password);

        const addUser: GQL_gen.Queries.AddUserGqlMutationVariables['objectsAddUser'] =
          {
            username,
            password: passHash,
            role_id: ERoles.user,
            blocked: false,
            name: '',
            email: ''
          };

        const newUser = await client<
          GQL_gen.Queries.AddUserGqlMutation,
          GQL_gen.Queries.AddUserGqlMutationVariables
        >({
          query: AddUserGqlMutation,
          variables: { objectsAddUser: addUser }
        });

        userJSON = {
          id: newUser?.insert_user?.returning?.[0]?.id,
          ...addUser
        } as typeof userJSON;
      }

      /* eslint-disable prettier/prettier */
      assertServer(userJSON?.id, StatusCodes.NOT_FOUND, ELoginResError['Netinkamas kortelės numeris']);
      const passwordIsValid = await comparePasswords(password, userJSON?.password || '');
      assertServer(passwordIsValid, StatusCodes.UNAUTHORIZED, ELoginResError['Netinkamas kodas'])
      assertServer(!userJSON.blocked, StatusCodes.FORBIDDEN, ELoginResError['Kortelė užblokuota']);
      /* eslint-enable prettier/prettier */
      /**
       * Generate new token
       */
      const { hasuraAuth } = GetHasuraAuth({
        userId: `${userJSON?.id}`,
        userRoleId: userJSON?.role_id
      });

      const newToken = createLoginSession({
        hasura: { claims: hasuraAuth },
        user: {
          id: userJSON?.id,
          username: userJSON?.username,
          role_id: userJSON?.role_id,
          loginFrom: body?.loginFrom
        }
      });
      // eslint-disable-next-line prettier/prettier
      assertServer(newToken, StatusCodes.INTERNAL_SERVER_ERROR, ELoginResError['Vartotojo token false']);

      /**
       * Insert new token to Token DB and set to 'req.session.newToken' for further use
       */
      await client<
        GQL_gen.Queries.AddTokenGqlMutation,
        GQL_gen.Queries.AddTokenGqlMutationVariables
      >({
        query: AddTokenGqlMutation,
        variables: {
          objectsAddToken: { token: newToken, user_id: userJSON?.id }
        }
      });

      req.session = {};
      req.session.newToken = newToken;
      /**
       * Fetch data to return or return from basic info fetch
       */
      next(null, { ...omit(userJSON, 'password') });
    } catch (error: any) {
      next(error);
    }
  }
);
