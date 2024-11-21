import { createReducer as reducer, merge, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  login: reducer<ST['login']>(ds.login,
    reduce(A.setLoginData, set),
    reduce(A.mergeLoginData, merge)),
  passwordChange: reducer<ST['passwordChange']>(ds.passwordChange,
    reduce(A.setPasswordChangeData, set)),
  toast: reducer<ST['toast']>(ds.toast,
    reduce(A.setToastData, set)),
  confirmation: reducer<ST['confirmation']>(ds.confirmation,
    reduce(A.setConfirmationData, set)),
  confirmation_TEST: reducer<ST['confirmation_TEST']>(ds.confirmation_TEST,
    reduce(A.setConfirmationData_TEST, set)),
	blockedTime: reducer<ST['blockedTime']>(ds.blockedTime,
		reduce(A.setBlockedTimeData, set)),
  menuItem: reducer<ST['menuItem']>(ds.menuItem,
    reduce(A.SetMenuItemData, set),
    reduce(A.MergeMenuItemData, merge))
})