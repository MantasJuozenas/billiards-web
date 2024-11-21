/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { UpsertGroupGqlMutation } from '@store/modules/group/gql-documents';
import { UpsertProductGqlMutation } from '@store/modules/product/gql-documents';
import { UpsertProductCategoryGqlMutation } from '@store/modules/product-category/gql-documents';
import { ELocation } from '@typings/graphql/enum-schema';
import combineQuery from 'graphql-combine-query';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { GetMenuList, NGetMenuList } from '../iiko/functions/get-menu-list';
import {
  GetOrganizations,
  NGetOrganizations
} from '../iiko/functions/get-organizations';
import { IIKO_ORGANIZATION_ID } from '../utils/backend-constants';
import { clientAxiosApolloAdmin } from '../utils/clients/axios/client-axios-apollo-admin';
import { clientAxiosIiko } from '../utils/clients/axios/client-axios-iiko';
import { assertServer } from '../utils/functions/assert-server';
import { onErrorOk } from '../utils/functions/on-error';
import { sRes } from '../utils/functions/safe-res';

const THIS_SECRET = 'lk5as67tauk7shdk74ddgi33o79dm387geg';

const handlerUpsertProductList = nc<G.TNextApiRequest, G.TNextApiResponse>({
  onError: onErrorOk
});

handlerUpsertProductList.get<G.IExtendedRequest>(async (req, res, _next) => {
  try {
    const params = req?.query as NHandlerUpsertProductList.TParams;

    if (params?.thisSecret !== THIS_SECRET) {
      assertServer(false, StatusCodes.OK, 'Well done!');
    }

    const clientIiko = await clientAxiosIiko();

    const resOrganizations = await GetOrganizations({
      clientAxiosIiko: clientIiko
    });

    const dataByOrganization: G.Dictionary<{
      organization: NGetOrganizations.TOrganization;
      menuList: NGetMenuList.TRes;
    }> = {};

    for (const organization of resOrganizations?.organizations || []) {
      const resMenuList = await GetMenuList({
        clientAxiosIiko: clientIiko,
        organizationId: organization?.id
      });

      dataByOrganization[organization?.id] = {
        organization,
        menuList: resMenuList
      };
    }

    const upsertProductCategory: GQL_gen.Queries.UpsertProductCategoryGqlMutationVariables[] =
      [];
    const upsertGroup: GQL_gen.Queries.UpsertGroupGqlMutationVariables[] = [];
    const upsertProduct: GQL_gen.Queries.UpsertProductGqlMutationVariables[] =
      [];

    resOrganizations?.organizations?.forEach?.((organization) => {
      const isKaunas = organization?.id === IIKO_ORGANIZATION_ID;
      //   const isVilnius = organization?.id !== IIKO_ORGANIZATION_ID;

      const organizationData = dataByOrganization?.[organization?.id];

      organizationData?.menuList?.productCategories?.forEach?.(
        (productCategory) => {
          upsertProductCategory?.push?.({
            objectsUpsertProductCategory: {
              organization_id: organization.id,
              location: isKaunas ? ELocation.Kaunas : ELocation.Vilnius,
              deleted_at: productCategory?.isDeleted ? new Date() : null,
              ikko_id: productCategory?.id,
              name: productCategory?.name,
              is_included_in_menu: true,
              ikko_product_category_json: { productCategory }
            },
            on_conflictUpsertProductCategory: {
              constraint: 'product_categorie_ikko_id_key',
              update_columns: [
                'organization_id',
                'location',
                'deleted_at',
                'name',
                'ikko_product_category_json'
              ]
            }
          });
        }
      );

      organizationData?.menuList?.groups?.forEach?.((group) => {
        upsertGroup?.push?.({
          objectsUpsertGroup: {
            organization_id: organization.id,
            location: isKaunas ? ELocation.Kaunas : ELocation.Vilnius,
            deleted_at: group?.isDeleted ? new Date() : null,
            ikko_id: group?.id,
            name: group?.name,
            is_included_in_menu: group?.isIncludedInMenu,
            ikos_group_json: { group }
          },
          on_conflictUpsertGroup: {
            constraint: 'group_ikko_id_key',
            update_columns: [
              'organization_id',
              'location',
              'name',
              'is_included_in_menu',
              'ikos_group_json',
              'deleted_at'
            ]
          }
        });
      });

      organizationData?.menuList?.products?.forEach?.((product) => {
        // const finalId = `${product?.id || ''}_${product?.parentGroup || ''}`;

        upsertProduct?.push?.({
          objectsUpsertProduct: {
            organization_id: organization.id,
            location: isKaunas ? ELocation.Kaunas : ELocation.Vilnius,
            deleted_at: product?.isDeleted ? new Date() : null,
            ikko_id: product?.id,
            // ikko_id: finalId,
            weight: product?.weight,
            price: product?.sizePrices?.[0]?.price?.currentPrice,
            code: product?.code,
            name: product?.name,
            ikos_product_json: { product }
          },
          on_conflictUpsertProduct: {
            constraint: 'product_ikko_id_key',
            update_columns: [
              'organization_id',
              'location',
              'weight',
              'price',
              'code',
              'name',
              'ikos_product_json',
              'deleted_at'
            ]
          }
        });
      });
    });

    const combinedQuery = combineQuery('UpsertProductList')
      .addN<GQL_gen.Queries.UpsertProductCategoryGqlMutationVariables>(
        UpsertProductCategoryGqlMutation,
        upsertProductCategory
      )
      .addN<GQL_gen.Queries.UpsertGroupGqlMutationVariables>(
        UpsertGroupGqlMutation,
        upsertGroup
      )
      .addN<GQL_gen.Queries.UpsertProductGqlMutationVariables>(
        UpsertProductGqlMutation,
        upsertProduct
      );

    type TCombinedQuery = G.TGQLCombine<typeof combinedQuery>;

    const client = clientAxiosApolloAdmin;
    await client<TCombinedQuery['data'], TCombinedQuery['variables']>({
      query: combinedQuery.document,
      variables: combinedQuery.variables
    });

    return sRes(res, StatusCodes.OK, {
      status: 'ok',
      payload: { done: true, resOrganizations, dataByOrganization }
    });
  } catch (error: any) {
    console.error(`NHandlerUpsertProductList > ERROR`, { error });

    assertServer(false, error?.status, error?.data);
  }
});

export default handlerUpsertProductList;

export namespace NHandlerUpsertProductList {
  export type TParams = {
    thisSecret?: string;
  };
}
