// /* eslint-disable no-shadow */
import { StatusCodes } from 'http-status-codes';

import {
  GetCustomerInfo,
  NGetCustomerInfo
} from '../iiko/functions/get-customer-info';
import { assertServer } from '../utils/functions/assert-server';
import { sRes } from '../utils/functions/safe-res';
import { handlerAuth } from '../utils/middleware/handler-auth';

export default handlerAuth().post(async (req, res) => {
  try {
    const customer = await GetCustomerInfo({
      username: req?.body?.username
    });

    const resData: NHandlerGetCardData.IRes = {
      status: 'ok',
      payload: {
        card: customer?.cards?.[0],
        walletBalance: {
          balance: customer?.walletBalances?.[0]?.balance || 0
        }
      }
    };

    return sRes(res, StatusCodes.OK, resData);
  } catch (error: any) {
    console.error(`NHandlerGetCardData > ERROR`, { error });
    assertServer(false, error?.status, error?.data);
  }
});

export namespace NHandlerGetCardData {
  export interface IBody {
    username: string;
  }

  export interface IPayload {
    card: NGetCustomerInfo.TRes['cards'][0];
    walletBalance: Pick<NGetCustomerInfo.TRes['walletBalances'][0], 'balance'>;
  }

  export type IRes = G.TApiRes<IPayload>;
}
