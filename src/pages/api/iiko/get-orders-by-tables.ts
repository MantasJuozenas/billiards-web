import { assertServer } from '@pages/api/utils/functions/assert-server';
import { onErrorOk } from '@pages/api/utils/functions/on-error';
import { sRes } from '@pages/api/utils/functions/safe-res';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { GetOrdersByTable } from './functions/get-orders-by-table';

const handlerGetOrdersByTables = nc<G.TNextApiRequest, G.TNextApiResponse>({
  onError: onErrorOk
});

handlerGetOrdersByTables.post<G.IExtendedRequest>(async (req, res, _next) => {
  const body = req?.body as NHandlerGetOrdersByTables.TBody;

  try {
    const resData = await GetOrdersByTable(body);

    return sRes(res, StatusCodes.OK, { status: 'ok', payload: resData });
  } catch (error: any) {
    console.error(`NHandlerGetOrdersByTables > ERROR:`, { error });
    assertServer(false, error?.status, error);
  }
});

export default handlerGetOrdersByTables;

export namespace NHandlerGetOrdersByTables {
  export type TBody = {
    table: string;
    location: GQLEnums.ELocation;
  };

  export type TPayload = {
    correlationId: string;
  };

  export type TRes = G.TApiRes<TPayload>;
}
