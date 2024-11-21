/* eslint-disable sonarjs/cognitive-complexity */
import { clientAxiosApollo } from '@clients/axios/client-axios-apollo';
import { ELocation } from '@typings/graphql/enum-schema';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import gql from 'graphql-tag';
import { call, put, select } from 'redux-saga/effects';

import { GetMenuList, SetMenuList } from '../actions';

const GetGroupAndProductGqlQuery = gql`
  query GetGroupAndProductGqlQuery(
    $whereGroup: group_bool_exp
    $whereProduct: product_bool_exp
  ) {
    group(where: $whereGroup) {
      id
      ikko_id
      name
      ikos_group_json
    }

    product(where: $whereProduct) {
      id
      ikko_id
      ikos_product_json
    }
  }
`;

function* getMenuListSaga(_action: ReturnType<typeof GetMenuList>) {
  const state: G.IStore = yield select();

  const client = clientAxiosApollo;

  const { isKaunas } = GetRestaurantLocation();

  const resMenuList: GQL_gen.Queries.GetGroupAndProductGqlQuery = yield call(
    client,
    {
      query: GetGroupAndProductGqlQuery,
      variables: {
        whereGroup: {
          deleted_at: { _is_null: true },
          location: { _eq: isKaunas ? ELocation.Kaunas : ELocation.Vilnius },
          is_included_in_menu: { _eq: true }
        },

        whereProduct: {
          deleted_at: { _is_null: true },
          location: { _eq: isKaunas ? ELocation.Kaunas : ELocation.Vilnius }
        }
      }
    }
  );

  const Groups = resMenuList?.group || [];
  const Products = resMenuList?.product || [];

  const newState: G.IStore['menu']['menuList'] = {
    whoDidId: 3,
    isLoading: state?.menu?.menuList?.isLoading,
    groupModifierIds: [],
    groupModifiers: {},
    mainGroupIds: [],
    mainGroups: {},
    parentGroupIds: [],
    parentGroups: {},
    productIds: [],
    products: {},
    groupIds: [],
    group: {}
  };

  Groups?.forEach?.((group) => {
    const groupId = group?.ikos_group_json?.group?.id || '';
    const parentGroupId = group?.ikos_group_json?.group?.parentGroup || '';
    const isGroupModifier = !!group?.ikos_group_json?.group?.isGroupModifier;
    const isIncludedInMenu = !!group?.ikos_group_json?.group?.isIncludedInMenu;

    if (!isIncludedInMenu) return;

    if (isGroupModifier) {
      newState?.groupModifierIds?.push?.(groupId);
      newState.groupModifiers[groupId] = group;
    } else if (groupId && !parentGroupId) {
      newState?.mainGroupIds?.push?.(groupId);
      newState.mainGroups[groupId] = group;

      newState?.groupIds?.push?.(groupId);
      newState.group[groupId] = {
        hasProducts: false,
        parentGroupIds: [],
        parentGroup: {}
      };
    } else {
      newState?.parentGroupIds?.push?.(groupId);
      newState.parentGroups[groupId] = group;
    }
  });

  newState?.parentGroupIds?.forEach?.((pgId) => {
    const parentGroup = newState?.parentGroups?.[pgId];
    const mainGroupId = parentGroup?.ikos_group_json?.group?.parentGroup || '';
    if (
      newState?.group?.[mainGroupId] &&
      !newState?.group?.[mainGroupId]?.parentGroup?.[pgId]
    ) {
      newState?.group?.[mainGroupId]?.parentGroupIds?.push?.(pgId);
      newState.group[mainGroupId].parentGroup[pgId] = {
        hasProducts: false,
        productIds: []
      };
    }
  });

  Products?.forEach?.((product) => {
    const productId = product?.ikos_product_json?.product?.id || '';
    const parentGroupId =
      product?.ikos_product_json?.product?.parentGroup || '';
    const mainGroupId =
      newState?.parentGroups?.[parentGroupId]?.ikos_group_json?.group
        ?.parentGroup || '';

    newState?.productIds?.push?.(productId);
    newState.products[productId] = product;

    if (newState?.group?.[mainGroupId]?.parentGroup?.[parentGroupId]) {
      newState.group[mainGroupId].hasProducts = true;
      newState.group[mainGroupId].parentGroup[parentGroupId].hasProducts = true;
      newState?.group?.[mainGroupId]?.parentGroup?.[
        parentGroupId
      ]?.productIds?.push?.(productId);
    }
  });

  // console.log({ newState });

  newState?.groupIds?.sort?.((a, b) => {
    const aItem = newState?.mainGroups?.[a];
    const bItem = newState?.mainGroups?.[b];
    return (
      (aItem?.ikos_group_json?.group?.order || 0) -
      (bItem?.ikos_group_json?.group?.order || 0)
    );
  });

  newState?.groupIds?.forEach?.((id) => {
    const mainGroup = newState?.group?.[id];

    mainGroup?.parentGroupIds?.sort?.((a, b) => {
      const aItem = newState?.parentGroups?.[a];
      const bItem = newState?.parentGroups?.[b];

      return (
        (aItem?.ikos_group_json?.group?.order || 0) -
        (bItem?.ikos_group_json?.group?.order || 0)
      );
    });

    mainGroup?.parentGroupIds?.forEach?.((pgId) => {
      const parentGroup = mainGroup?.parentGroup?.[pgId];

      parentGroup?.productIds?.sort((a, b) => {
        const aItem = newState?.products?.[a];
        const bItem = newState?.products?.[b];

        return (
          (aItem?.ikos_product_json?.product?.order || 0) -
          (bItem?.ikos_product_json?.product?.order || 0)
        );
      });
    });
  });

  yield put(SetMenuList(newState));
}

export const GetMenuListSaga = [
  takeLatest(GetMenuList, lifecycleSaga(getMenuListSaga))
];
