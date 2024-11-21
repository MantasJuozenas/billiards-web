import { NHandlerCreateAnOrder } from '@pages/api/order/create';
import { CreateAnOrderApiQuery } from '@store/modules/order/query';
import { ELocation } from '@typings/graphql/enum-schema';
import { assert } from '@utilsFn/assert';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { lifecycleSaga, takeLatest } from '@utilsFn/sagas-helpers';
import { call, select } from 'redux-saga/effects';

import { CreateAnOrder } from '../actions';

function* createAnOrderSaga(action: ReturnType<typeof CreateAnOrder>) {
  const state: G.IStore = yield select();
  const totalAmount = state?.cart?.totalAmount;
  const cartItems = state?.cart?.cartItems || [];
  const loggedInUser = state?.auth?.loggedInUser;

  const { isKaunas } = GetRestaurantLocation();

  const resCreateAnOrder: NHandlerCreateAnOrder.TRes = yield call(
    CreateAnOrderApiQuery,
    {
      cartItems,
      totalAmount,
      fullName: action?.payload?.fullName,
      table: action?.payload?.table,
      phone: '',
      cardNumber: loggedInUser?.username || '',
      location: isKaunas ? ELocation.Kaunas : ELocation.Vilnius
    }
  );

  if (resCreateAnOrder?.status !== 'ok') {
    assert(false, `status !== 'ok'`);
  }
}

export const CreateAnOrderSaga = [
  takeLatest(CreateAnOrder, lifecycleSaga(createAnOrderSaga))
];
