/* eslint-disable no-shadow */
import { iikoApiRoutes } from '@constants/routes';
import { IIKO_ORGANIZATION_ID } from '@pages/api/utils/backend-constants';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';

export const GetCustomerInfo = async (
  props: NGetCustomerInfo.TProps
): Promise<NGetCustomerInfo.TRes> => {
  try {
    const client = await clientAxiosIiko();

    const body: NGetCustomerInfo.TBody = {
      organizationId: IIKO_ORGANIZATION_ID,
      cardNumber: props?.username || '',
      type: 'cardNumber'
    };

    const redCustomerInfo: G.TAxiosResponse<NGetCustomerInfo.TRes> =
      await client.post(iikoApiRoutes['loyalty/iiko/customer/info'], body);

    return redCustomerInfo?.data;
  } catch (error) {
    console.error(`NGetCustomerInfo > ERROR:`, { error });

    return {} as NGetCustomerInfo.TRes;
  }
};

export enum EWalletBalanceType {
  depositNutrition = 1,
  bonusProgram,
  productsProgram,
  discountProgram,
  certificateProgram
}

export namespace NGetCustomerInfo {
  export type TProps = {
    username: string;
  };

  export type TBody = {
    organizationId: string;
    cardNumber: string;
    type: 'cardNumber';
  };

  export type TRes = {
    id: string;
    referrerId: string | null;
    name: string;
    surname: string | null;
    middleName: string | null;
    comment: string | null;
    phone: string;
    cultureName: string;
    birthday: any;
    email: string | null;
    sex: number;
    consentStatus: number;
    anonymized: boolean;
    cards: {
      id: string;
      track: string;
      number: string;
      validToDate: Date | null;
    }[];
    categories: {
      id: string;
      name: string;
      isActive: boolean;
      isDefaultForNewGuests: boolean;
    }[];
    walletBalances: {
      id: string;
      name: string;
      type: EWalletBalanceType;
      balance: number;
    }[];
    userData: any;
    shouldReceivePromoActionsInfo: boolean;
    shouldReceiveLoyaltyInfo: boolean;
    shouldReceiveOrderStatusInfo: boolean;
    personalDataConsentFrom: Date;
    personalDataConsentTo: any;
    personalDataProcessingFrom: any;
    personalDataProcessingTo: any;
    isDeleted: boolean;
  };
}
