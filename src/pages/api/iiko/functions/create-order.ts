import { iikoApiRoutes } from '@constants/routes';
import {
  IIKO_DATA_BY_LOCATION,
  TABLES
} from '@pages/api/utils/backend-constants';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';

export const CreateOrder = async (
  props: NCreateOrder.TProps
): Promise<NCreateOrder.TRes> => {
  try {
    const clientIiko = await clientAxiosIiko();

    const iikoData = IIKO_DATA_BY_LOCATION?.[props?.location];

    const tableId = TABLES?.[props?.table]?.tableId;
    if (!tableId)
      throw new Error(
        `TableName: '${props?.table}' not associated with any tableId!`
      );

    const body: NCreateOrder.TBody = {
      organizationId: iikoData?.IIKO_ORGANIZATION_ID,
      terminalGroupId: iikoData?.IIKO_TERMINAL_GROUP_ID,
      order: {
        items: props?.orderItems,
        tableIds: [tableId]
      }
    };

    const resCreateOrder: G.TAxiosResponse<NCreateOrder.TRes> =
      await clientIiko.post(iikoApiRoutes['order/create'], body);

    return resCreateOrder?.data;
  } catch (error) {
    console.error(`NCreateOrder > ERROR:`, { error });

    return {} as NCreateOrder.TRes;
  }
};

export namespace NCreateOrder {
  export type TItem = {
    productId: string;
    modifiers?: { productId: string; amount: string }[] | null;
    type: 'Product';
    amount: string;
    comment?: string;
  };

  export type TProps = {
    table: string;
    location: GQLEnums.ELocation;
    orderItems: TItem[];
  };

  export type TBody = {
    organizationId: string;
    terminalGroupId: string;
    order: {
      items: TItem[];
      tableIds: string[];
    };
  };

  export type TRes = {
    correlationId: string;
    orderInfo: {
      id: string;
      posId: string | null;
      externalNumber: string | null;
      organizationId: string;
      timestamp: number;
      creationStatus: 'InProgress' | string;
      errorInfo: null;
      order: null;
    };
  };
}
