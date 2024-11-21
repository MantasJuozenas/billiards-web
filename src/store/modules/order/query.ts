import { clientAxiosApi } from '@clients/axios/client-axios-api';
import { apiRoutes } from '@constants/routes';
import { NHandlerCreateAnOrder } from '@pages/api/order/create';

export const CreateAnOrderApiQuery = async (
  body: NHandlerCreateAnOrder.IBody
): Promise<NHandlerCreateAnOrder.TRes> => {
  try {
    const response: G.TAxiosResponse<NHandlerCreateAnOrder.TRes> =
      await clientAxiosApi().post(apiRoutes['order/create'], body);

    return response?.data;
  } catch (error: any) {
    console.error(`CreateAnOrderApiQuery > ERROR: ${error?.toString?.()}`);
    return error;
  }
};
