import { flag_SetCartMenuOpen } from '@store/modules/flags/actions';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import lodCloneDeep from 'lodash/cloneDeep';
import { put, select } from 'redux-saga/effects';

import {
  AddRemoveCartItem,
  SetCartItems,
  SetTotalAmount,
  SetTotalCount
} from '../actions';

function* addRemoveCartItemSaga(action: ReturnType<typeof AddRemoveCartItem>) {
  const state: G.IStore = yield select();

  const products = state?.menu?.menuList?.products;
  const product = products?.[action?.payload?.productId];
  const productData =
    products?.[action?.payload?.productId]?.ikos_product_json?.product;
  const productPrice = productData?.sizePrices?.[0]?.price?.currentPrice || 0;
  const modifiers = state?.modalsAndForms?.menuItem?.modifiers;

  const cartItems = state?.cart?.cartItems;
  let newCartItems = lodCloneDeep(cartItems);

  if (action?.payload?.action === 'add') {
    const indexOfProduct = newCartItems?.findIndex?.(
      (item) =>
        item?.product?.ikko_id === product?.ikko_id &&
        JSON.stringify(item?.modifiers || null) ===
          JSON.stringify(modifiers || null)
    );

    if (indexOfProduct >= 0) {
      newCartItems[indexOfProduct].quantity += 1;
      newCartItems[indexOfProduct].totalAmount += productPrice;
    } else {
      newCartItems?.push?.({
        dbProductId: product?.id,
        product,
        price: productPrice,
        quantity: 1,
        totalAmount: productPrice,
        modifiers: modifiers || null
      });
    }
  } else if (action?.payload?.action === 'remove') {
    newCartItems = newCartItems?.filter?.(
      (item, i) =>
        // item?.product?.ikko_id !== product?.ikko_id &&
        i !== (action?.payload?.index || 0)
    );
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

  if (action?.payload?.action === 'add' && !cartItems?.length) {
    yield put(flag_SetCartMenuOpen(true));
  }
}

export const AddRemoveCartItemSaga = [
  takeLatest(AddRemoveCartItem, lifecycleSaga(addRemoveCartItemSaga))
];
