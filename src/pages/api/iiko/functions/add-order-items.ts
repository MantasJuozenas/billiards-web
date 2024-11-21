import { iikoApiRoutes } from '@constants/routes';
import { IIKO_DATA_BY_LOCATION } from '@pages/api/utils/backend-constants';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';

export const AddOrderItems = async (
  props: NAddOrderItems.TProps
): Promise<NAddOrderItems.TRes> => {
  try {
    const clientIiko = await clientAxiosIiko();

    const iikoData = IIKO_DATA_BY_LOCATION?.[props?.location];

    const body: NAddOrderItems.TBody = {
      organizationId: iikoData?.IIKO_ORGANIZATION_ID,
      orderId: props.orderId,
      items: props?.orderItems
    };

    const resAddOrderItems: G.TAxiosResponse<NAddOrderItems.TRes> =
      await clientIiko.post(iikoApiRoutes['order/add_items'], body);

    return resAddOrderItems?.data;
  } catch (error) {
    console.error(`NAddOrderItems > ERROR:`, { error });

    return {} as NAddOrderItems.TRes;
  }
};

export namespace NAddOrderItems {
  export type TItem = {
    productId: string;
    modifiers?: { productId: string; amount: string }[] | null;
    type: 'Product';
    amount: string;
    price: number;
    comment?: string;
  };

  export type TProps = {
    orderId: string;
    location: GQLEnums.ELocation;
    orderItems: TItem[];
  };

  export type TBody = {
    orderId: string;
    organizationId: string;
    items: TItem[];
  };

  export type TRes = {
    correlationId: string;
  };
}
