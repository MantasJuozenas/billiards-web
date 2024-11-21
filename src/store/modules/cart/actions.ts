/* eslint-disable max-len */
import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const SetCartItems = action<ST['cartItems']>('cart.set_cart_items');
export const SetTotalCount = action<ST['totalCount']>('cart.set_total_count');
export const SetTotalAmount = action<ST['totalAmount']>('cart.set_total_amount');
export const SetOrderIsLoading = action<ST['orderIsLoading']>('cart.set_order_is_loading');
/* Saga actions */
export const AddRemoveCartItem = action<G.TLifecycleSaga<{productId: string; action: 'add' | 'remove', index?: number;}>>('cart.add_remove_cart_item');
export const ChangeCartItemQuantity = action<G.TLifecycleSaga<{productId: string; index: number; action: '+' | '-'}>>('cart.change_cart_item_quantity');
export const CreateAnOrder = action<G.TLifecycleSaga<{fullName: string; table: string}>>('cart.create_an_order');