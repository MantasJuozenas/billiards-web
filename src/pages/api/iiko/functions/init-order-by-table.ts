/* eslint-disable no-shadow */
import { iikoApiRoutes } from '@constants/routes';
import {
  IIKO_DATA_BY_LOCATION,
  TABLES
} from '@pages/api/utils/backend-constants';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';

export const InitOrderByTable = async (
  props: NInitOrderByTable.TProps
): Promise<NInitOrderByTable.TRes> => {
  try {
    const client = await clientAxiosIiko();

    const tableId = TABLES[props?.table]?.tableId;
    const iikoData = IIKO_DATA_BY_LOCATION[props?.location];

    if (!tableId) {
      throw new Error(
        `TableName: '${props?.table}' not associated with any tableId!`
      );
    }

    const body: NInitOrderByTable.TBody = {
      organizationId: iikoData?.IIKO_ORGANIZATION_ID,
      terminalGroupId: iikoData?.IIKO_TERMINAL_GROUP_ID,
      tableIds: [tableId]
    };

    const resOrdersByTable: G.TAxiosResponse<NInitOrderByTable.TRes> =
      await client.post(iikoApiRoutes['order/init_by_table'], body);

    return resOrdersByTable?.data;
  } catch (error) {
    console.error(`NInitOrderByTable > ERROR:`, { error });

    return {} as NInitOrderByTable.TRes;
  }
};

export namespace NInitOrderByTable {
  export type TProps = {
    table: string;
    location: GQLEnums.ELocation;
  };

  export type TBody = {
    organizationId: string;
    terminalGroupId: string;
    tableIds: string[];
  };

  export type TRes = {
    correlationId: string;
  };
}
