import gql from 'graphql-tag';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { clientAxiosApolloAdmin } from '../utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '../utils/functions/assert-server';
import { onErrorOk } from '../utils/functions/on-error';
import { sRes } from '../utils/functions/safe-res';

const handlerReservationBlockedDays = nc<G.TNextApiRequest, G.TNextApiResponse>(
  {
    onError: onErrorOk
  }
);

const GetReservationBlockedDaysGqlQuery = gql`
  query GetReservationBlockedDaysGqlQuery(
    $whereBlockedTime: blocked_time_bool_exp
  ) {
    blocked_time(where: $whereBlockedTime, distinct_on: [date_number]) {
      date_number
    }
  }
`;

handlerReservationBlockedDays.post<G.IExtendedRequest>(
  async (req, res, _next) => {
    const body = req?.body as NHandlerReservationBlockedDays.IBody;

    try {
      const client = clientAxiosApolloAdmin;

      const resBlockedTime = await client<
        GQL_gen.Queries.GetReservationBlockedDaysGqlQuery,
        GQL_gen.Queries.GetReservationBlockedDaysGqlQueryVariables
      >({
        query: GetReservationBlockedDaysGqlQuery,
        variables: body?.variablesBlockedTime || {}
      });

      const blockedDays: number[] = [];
      resBlockedTime?.blocked_time?.forEach?.((item) =>
        blockedDays?.push?.(item?.date_number || 0)
      );

      const resPayload: NHandlerReservationBlockedDays.TPayload = {
        blockedDays
      };

      return sRes(res, StatusCodes.OK, { status: 'ok', payload: resPayload });
    } catch (error: any) {
      console.error(
        `handlerReservationBlockedDays > ERROR: ${JSON.stringify(error)}`
      );
      assertServer(false, error?.status, error?.data);
    }
  }
);

export default handlerReservationBlockedDays;

export namespace NHandlerReservationBlockedDays {
  export interface IBody {
    variablesBlockedTime: GQL_gen.Queries.GetReservationBlockedDaysGqlQueryVariables;
  }

  export type TPayload = {
    blockedDays: number[];
  };

  export type TRes = G.TApiRes<TPayload>;
}
