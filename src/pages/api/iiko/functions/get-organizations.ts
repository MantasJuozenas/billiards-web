import { iikoApiRoutes } from '@constants/routes';
import { IIKO_API_LOGIN } from '@pages/api/utils/backend-constants';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';
import { AxiosInstance } from 'axios';

export const GetOrganizations = async (
  props: NGetOrganizations.TProps
): Promise<NGetOrganizations.TRes> => {
  try {
    const client = props?.clientAxiosIiko ?? (await clientAxiosIiko());

    const body: NGetOrganizations.TBody = {
      apiLogin: IIKO_API_LOGIN
    };

    const resOrganizations: G.TAxiosResponse<NGetOrganizations.TRes> =
      await client.post(iikoApiRoutes.organizations, body);

    return resOrganizations?.data;
  } catch (error) {
    console.error(`NGetOrganizations > ERROR:`, { error });

    return {} as NGetOrganizations.TRes;
  }
};

export namespace NGetOrganizations {
  export type TProps = {
    clientAxiosIiko?: AxiosInstance;
  };

  export type TBody = {
    apiLogin: string;
  };

  export type TOrganization = {
    responseType: string;
    id: string;
    name: string;
  };

  export type TRes = {
    correlationId: string;
    organizations: TOrganization[];
  };
}
