import { InitOrderByTable } from '@pages/api/iiko/functions/init-order-by-table';
import { assertServer } from '@pages/api/utils/functions/assert-server';
import { onErrorOk } from '@pages/api/utils/functions/on-error';
import { sRes } from '@pages/api/utils/functions/safe-res';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

const handlerInitOrders = nc<G.TNextApiRequest, G.TNextApiResponse>({
  onError: onErrorOk
});

handlerInitOrders.post<G.IExtendedRequest>(async (req, res, _next) => {
  const body = req?.body as NHandlerInitOrders.TBody;

  try {
    const resData = await InitOrderByTable(body);

    return sRes(res, StatusCodes.OK, { status: 'ok', payload: resData });
  } catch (error: any) {
    console.error(`NHandlerInitOrders > ERROR:`, { error });
    assertServer(false, error?.status, error);
  }
});

export default handlerInitOrders;

export namespace NHandlerInitOrders {
  export type TBody = {
    table: string;
    location: GQLEnums.ELocation;
  };

  export type TPayload = {
    correlationId: string;
  };

  export type TRes = G.TApiRes<TPayload>;
}
