/* eslint-disable no-shadow */
import { iikoApiRoutes } from '@constants/routes';
import {
  IIKO_DATA_BY_LOCATION,
  TABLES
} from '@pages/api/utils/backend-constants';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';

export const GetOrdersByTable = async (
  props: NGetOrdersByTable.TProps
): Promise<NGetOrdersByTable.TRes> => {
  try {
    const client = await clientAxiosIiko();

    const tableId = TABLES[props?.table]?.tableId;
    const iikoData = IIKO_DATA_BY_LOCATION[props?.location];

    if (!tableId) {
      throw new Error(
        `TableName: '${props?.table}' not associated with any tableId!`
      );
    }

    const body: NGetOrdersByTable.TBody = {
      organizationIds: [iikoData?.IIKO_ORGANIZATION_ID],
      tableIds: [tableId],
      statuses: [EOrderStatus.New]
    };

    const resOrdersByTable: G.TAxiosResponse<NGetOrdersByTable.TRes> =
      await client.post(iikoApiRoutes['order/by_table'], body);

    return resOrdersByTable?.data;
  } catch (error) {
    console.error(`NGetOrdersByTable > ERROR:`, { error });

    return {} as NGetOrdersByTable.TRes;
  }
};

export enum EItemStatus {
  Added = 'Added',
  PrintedNotCooking = 'PrintedNotCooking',
  CookingStarted = 'CookingStarted',
  CookingCompleted = 'CookingCompleted',
  Served = 'Served'
}

export enum EOrderStatus {
  New = 'New',
  Bill = 'Bill',
  Closed = 'Closed',
  Deleted = 'Deleted'
}

export namespace NGetOrdersByTable {
  export type TProps = {
    table: string;
    location: GQLEnums.ELocation;
  };

  export type TBody = {
    organizationIds: string[];
    tableIds: string[];
    statuses?: EOrderStatus[];
  };

  interface IItem {
    type: 'Product' | 'Compound' | 'Service';
    product: { id: string; name: string };
    status: EItemStatus;
    modifiers: null;
    price: number;
    cost: number;
    pricePredefined: boolean;
    positionId: string;
    taxPercent: number;
    resultSum: number;
    deleted: null;
    amount: number;
    comment: string | null;
    whenPrinted: string | null;
    size: null;
    comboInformation: null;
  }

  interface IOrder {
    tableIds: string[];
    customer: null;
    phone: string | null;
    status: EOrderStatus;
    whenCrated: string;
    waiter: null;
    tabName: null;
    splitOrderBetweenCashRegisters: null;
    menuId: null;
    sum: number;
    number: number;
    sourceKey: null;
    whenBillPrinted: string | null;
    whenClosed: string | null;
    conception: null;
    guestsInfo: {
      count: number;
      splitBetweenPersons: boolean;
    };
    items: IItem[];
    combos: null;
    payments: null;
    tips: null;
    discounts: null;
    orderType: {
      id: string;
      name: string;
      orderServiceType: 'Common' | 'DeliveryByCourier' | 'DeliveryByClient';
    } | null;
    terminalGroupId: string;
    processedPaymentsSum: number;
    loayaltyInfo: {
      coupon: string | null;
      appliedManualConditions: string | null;
    } | null;
    externalData: null;
  }

  export type TRes = {
    correlationId: string;
    orders: {
      id: string;
      posId: string | null;
      externalNumber: string | null;
      organizationId: string;
      timestamp: number;
      creationStatus: 'InProgress' | string;
      errorInfo: null;
      order: IOrder;
    }[];
  };
}
