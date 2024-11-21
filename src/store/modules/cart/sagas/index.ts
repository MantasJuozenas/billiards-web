import { all } from 'redux-saga/effects';

import { AddRemoveCartItemSaga } from './add-remove-cart-item.sagas';
import { ChangeCartItemQuantitySaga } from './change-cart-item-quantity.sagas';
import { CreateAnOrderSaga } from './create-an-order.sagas';

export default function* rootSaga() {
  yield all([
    ...AddRemoveCartItemSaga,
    ...ChangeCartItemQuantitySaga,
    ...CreateAnOrderSaga
  ]);
}
