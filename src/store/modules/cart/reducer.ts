import { createReducer as reducer, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  orderIsLoading: reducer<ST['orderIsLoading']>(ds.orderIsLoading, 
    reduce(A.SetOrderIsLoading, set)),
  cartItems: reducer<ST['cartItems']>(ds.cartItems, 
    reduce(A.SetCartItems, set)),
  totalCount: reducer<ST['totalCount']>(ds.totalCount, 
    reduce(A.SetTotalCount, set)),
  totalAmount: reducer<ST['totalAmount']>(ds.totalAmount, 
    reduce(A.SetTotalAmount, set))
});