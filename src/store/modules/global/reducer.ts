import { createReducer as reducer, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  isAppReady: reducer<ST['isAppReady']>(ds.isAppReady,
    reduce(A.SetIsAppReady, set)),
  ApolloClient: reducer<ST['ApolloClient']>(ds.ApolloClient,
    reduce(A.setNewApolloClient, set))
});