import { Dayjs, dayjs } from '@utilsFn/dayjs-fn';
import gql from 'graphql-tag';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { clientAxiosApolloAdmin } from '../utils/clients/axios/client-axios-apollo-admin';
import { assertServer } from '../utils/functions/assert-server';
import { onErrorOk } from '../utils/functions/on-error';
import { sRes } from '../utils/functions/safe-res';

const handlerReservationBlockedTimes = nc<
  G.TNextApiRequest,
  G.TNextApiResponse
>({
  onError: onErrorOk
});

const GetReservationBlockedTimesGqlQuery = gql`
  query GetReservationBlockedTimesGqlQuery(
    $whereBlockedTime: blocked_time_bool_exp
    $order_byBlockedTime: [blocked_time_order_by!]
  ) {
    blocked_time(where: $whereBlockedTime, order_by: $order_byBlockedTime) {
      id
      pool
      dart
      date_number
      time_from
      time_to
      all_day
    }
  }
`;

handlerReservationBlockedTimes.post<G.IExtendedRequest>(
  async (req, res, _next) => {
    const body = req?.body as NHandlerReservationBlockedTimes.IBody;

    try {
      const client = clientAxiosApolloAdmin;

      const resBlockedTime = await client<
        GQL_gen.Queries.GetReservationBlockedTimesGqlQuery,
        GQL_gen.Queries.GetReservationBlockedTimesGqlQueryVariables
      >({
        query: GetReservationBlockedTimesGqlQuery,
        variables: body?.variablesBlockedTime || {}
      });

      const resBlockedTimesByDateNumber: G.Dictionary<{
        blockedTimes: Array<
          GQL_gen.Queries.GetReservationBlockedTimesGqlQuery['blocked_time'][0] & {
            dateFrom: Dayjs;
            dateTo: Dayjs;
            lengthTimeMinutes: number;
          }
        >;
      }> = {};

      resBlockedTime?.blocked_time?.forEach?.((item) => {
        const dateFromNumber = item?.date_number || 0;

        if (!resBlockedTimesByDateNumber?.[dateFromNumber]) {
          resBlockedTimesByDateNumber[dateFromNumber] = { blockedTimes: [] };
        }

        /* eslint-disable prettier/prettier */
        const dateFrom = dayjs(`${item?.date_number}${item?.all_day ? '00:00' : item?.time_from}`);
        const dateTo = dayjs(`${item?.date_number}${item?.all_day ? '23:55' : item?.time_to}`);
        const timeDiff = dateTo.diff(dateFrom, 'minutes');
        /* eslint-enable prettier/prettier */

        resBlockedTimesByDateNumber?.[dateFromNumber]?.blockedTimes?.push?.({
          ...item,
          dateFrom,
          dateTo,
          lengthTimeMinutes: timeDiff
        });
      });

      const blockedTimesByDateNumber: G.Dictionary<{
        blockedTimes: string[];
        allDayBlocked: boolean;
      }> = {};

      Object?.keys?.(resBlockedTimesByDateNumber)?.forEach?.((dateString) => {
        const dateBlockedTimes =
          resBlockedTimesByDateNumber?.[dateString]?.blockedTimes;

        if (!blockedTimesByDateNumber?.[dateString]) {
          blockedTimesByDateNumber[dateString] = {
            blockedTimes: [],
            allDayBlocked: false
          };
        }

        dateBlockedTimes?.forEach?.((item) => {
          // console.log({ item });
          const gapMin = body?.gapMin;
          let minuteBlocks = Math.floor(item.lengthTimeMinutes / gapMin);
          if (item.lengthTimeMinutes % gapMin) {
            minuteBlocks += 1;
          }
          // console.log({ minuteBlocks, left: item.lengthTimeMinutes % gapMin });

          Array(minuteBlocks)
            .fill(item?.dateFrom)
            .forEach?.((v: Dayjs, i) => {
              const timeFrom = v?.add(i * gapMin, 'minutes').format('HH:mm');
              blockedTimesByDateNumber?.[dateString]?.blockedTimes?.push?.(
                timeFrom
              );
            });

          if (item?.all_day) {
            blockedTimesByDateNumber[dateString].allDayBlocked = true;
          }
        });

        blockedTimesByDateNumber[dateString].blockedTimes = [
          ...(new Set(blockedTimesByDateNumber[dateString].blockedTimes) as any)
        ]?.sort();
      });

      const resPayload: NHandlerReservationBlockedTimes.TPayload = {
        blockedTimesByDateNumber
      };

      return sRes(res, StatusCodes.OK, { status: 'ok', payload: resPayload });
    } catch (error: any) {
      console.error(
        `handlerReservationBlockedTimes > ERROR: ${JSON.stringify(error)}`
      );
      assertServer(false, error?.status, error?.data);
    }
  }
);

export default handlerReservationBlockedTimes;

export namespace NHandlerReservationBlockedTimes {
  export interface IBody {
    gapMin: number;
    variablesBlockedTime: GQL_gen.Queries.GetReservationBlockedTimesGqlQueryVariables;
  }

  export type TPayload = {
    blockedTimesByDateNumber: G.Dictionary<{
      blockedTimes: string[];
      allDayBlocked: boolean;
    }>;
  };

  export type TRes = G.TApiRes<TPayload>;
}
