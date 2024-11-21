import { clientAxiosApi } from '@clients/axios/client-axios-api';
import { apiRoutes } from '@constants/routes';
import { NHandlerGetCardData } from '@pages/api/customer/get-card-data';

export const GetCustomerCardDataApiQuery = async (
  body: NHandlerGetCardData.IBody
): Promise<NHandlerGetCardData.IRes> => {
  try {
    const res: G.TAxiosResponse<NHandlerGetCardData.IRes> =
      await clientAxiosApi().post(apiRoutes['customer/get-card-data'], body);

    return res?.data;
  } catch (error: any) {
    console.error(`GetCustomerCardDataApiQuery > ERROR: ${error}`);
    return error;
  }
};
