import { flag_SetCartMenuOpen } from '@store/modules/flags/actions';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import lodCloneDeep from 'lodash/cloneDeep';
import { put, select } from 'redux-saga/effects';

import {
  ChangeCartItemQuantity,
  SetCartItems,
  SetTotalAmount,
  SetTotalCount
} from '../actions';

function* changeCartItemQuantitySaga(
  action: ReturnType<typeof ChangeCartItemQuantity>
) {
  const state: G.IStore = yield select();

  const products = state?.menu?.menuList?.products;
  const product = products?.[action?.payload?.productId];
  const productData =
    products?.[action?.payload?.productId]?.ikos_product_json?.product;
  const productPrice = productData?.sizePrices?.[0]?.price?.currentPrice || 0;

  const cartItems = state?.cart?.cartItems;
  const newCartItems = lodCloneDeep(cartItems);
  const indexOfProduct = newCartItems?.findIndex?.(
    (item, i) =>
      item?.product?.ikko_id === product?.ikko_id &&
      i === action?.payload?.index
  );

  if (indexOfProduct < 0) return;

  if (action?.payload?.action === '+') {
    newCartItems[indexOfProduct].quantity += 1;
    newCartItems[indexOfProduct].totalAmount += productPrice;
  } else if (action?.payload?.action === '-') {
    newCartItems[indexOfProduct].quantity -= 1;
    newCartItems[indexOfProduct].totalAmount -= productPrice;

    if (!newCartItems[indexOfProduct].quantity) {
      newCartItems?.splice?.(indexOfProduct, 1);
    }
  }

  let newTotalCount = 0;
  let newTotalAmount = 0;

  newCartItems?.forEach?.((item) => {
    newTotalCount += item?.quantity || 0;
    // eslint-disable-next-line no-unsafe-optional-chaining
    newTotalAmount += +(item?.totalAmount || 0)?.toFixed?.(2);
  });

  yield put(SetCartItems(newCartItems));
  yield put(SetTotalCount(newTotalCount));
  yield put(SetTotalAmount(newTotalAmount));

  if (!newCartItems?.length) {
    yield put(flag_SetCartMenuOpen(false));
  }
}

export const ChangeCartItemQuantitySaga = [
  takeLatest(ChangeCartItemQuantity, lifecycleSaga(changeCartItemQuantitySaga))
];
