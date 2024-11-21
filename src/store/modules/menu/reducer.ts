import { createReducer as reducer, merge, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  table: reducer<ST['table']>(ds.table,
    reduce(A.SetTable, set)),
  menuList: reducer<ST['menuList']>(ds.menuList,
    reduce(A.SetMenuList, set),
    reduce(A.MergeMenuList, merge),
    reduce(A.ResetMenuList, () => ds.menuList))
});