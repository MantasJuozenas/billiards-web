import { iikoApiRoutes } from '@constants/routes';
import { clientAxiosIiko } from '@pages/api/utils/clients/axios/client-axios-iiko';
import { AxiosInstance } from 'axios';

export const GetMenuList = async (
  props: NGetMenuList.TProps
): Promise<NGetMenuList.TRes> => {
  try {
    const client = props?.clientAxiosIiko ?? (await clientAxiosIiko());

    const body: NGetMenuList.TBody = {
      organizationId: props?.organizationId
    };

    const resMenuList: G.TAxiosResponse<NGetMenuList.TRes> = await client.post(
      iikoApiRoutes.nomenclature,
      body
    );

    return resMenuList?.data;
  } catch (error) {
    console.error(`NGetMenuList > ERROR:`, { error });

    return {} as NGetMenuList.TRes;
  }
};

export namespace NGetMenuList {
  export type TProps = {
    clientAxiosIiko?: AxiosInstance;
    organizationId: string;
  };

  export type TBody = {
    organizationId: string;
  };

  export type TGroups = {
    imageLinks: string[];
    parentGroup: string | null;
    order: number;
    isIncludedInMenu: boolean;
    isGroupModifier: boolean;
    id: string;
    code: string;
    name: string;
    description: string | null;
    additionalInfo: string | null;
    tags: string[];
    isDeleted: boolean;
    seoDescription: string | null;
    seoText: string | null;
    seoKeywords: string | null;
    seoTitle: string | null;
  };

  export type TProductCategories = {
    id: string;
    name: string;
    isDeleted: boolean;
  };

  export type TProductsSizePrices = {
    sizeId: string;
    price: {
      currentPrice: number;
      isIncludedInMenu: boolean;
      nextPrice: number;
      nextIncludedInMenu: boolean;
      nextDataPrice: string;
    };
  };

  export type TProductsModifiers = {
    id: string;
    defaultAmount: number;
    minAmount: number;
    maxAmount: number;
    required: boolean;
    hideIfDefaultAmount: boolean;
    splittable: boolean;
    freeOfChargeAmount: number;
  };

  export type TProductsGroupModifiersChildModifiers = {
    id: string;
    defaultAmount: number;
    minAmount: number;
    maxAmount: number;
    required: boolean;
    hideIfDefaultAmount: boolean;
    splittable: boolean;
    freeOfChargeAmount: number;
  };

  export type TProductsGroupModifiers = {
    id: string;
    minAmount: number;
    maxAmount: number;
    required: boolean;
    childModifiersHaveMinMaxRestrictions: boolean;
    childModifiers: TProductsGroupModifiersChildModifiers[];
    hideIfDefaultAmount: boolean;
    defaultAmount: number;
    splittable: boolean;
    freeOfChargeAmount: number;
  };

  export type TProducts = {
    fatAmount: number;
    proteinsAmount: number;
    carbohydratesAmount: number;
    energyAmount: number;
    fatFullAmount: number;
    proteinsFullAmount: number;
    carbohydratesFullAmount: number;
    energyFullAmount: number;
    weight: number;
    groupId: string;
    productCategoryId: string;
    type: string;
    orderItemType: 'Product' | 'Compound';
    modifierSchemaId: string;
    modifierSchemaName: string;
    splittable: boolean;
    measureUnit: string;
    sizePrices: TProductsSizePrices[];
    modifiers: TProductsModifiers[];
    groupModifiers: TProductsGroupModifiers[];
    imageLinks: string[];
    doNotPrintInCheque: boolean;
    parentGroup: string;
    order: number;
    fullNameEnglish: string;
    useBalanceForSell: boolean;
    canSetOpenPrice: boolean;
    id: string;
    code: string;
    name: string;
    description: string;
    additionalInfo: string;
    tags: string[];
    isDeleted: boolean;
    seoDescription: string;
    seoText: string;
    seoKeywords: string;
    seoTitle: string;
  };

  export type TSizes = {
    //
  };

  export type TRes = {
    correlationId: string;
    groups: TGroups[];
    productCategories: TProductCategories[];
    products: TProducts[];
    sizes: TSizes[];
    revision: string;
  };
}
