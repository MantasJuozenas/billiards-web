import { createReducer as reducer, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  geo: reducer<ST['geo']>(ds.geo,
    reduce(A.setGeoLocation, set)),
  ipstack: reducer<ST['ipstack']>(ds.ipstack,
    reduce(A.setIpstack, set)),
  isUSA: reducer<ST['isUSA']>(ds.isUSA,
    reduce(A.setGeoLocation, (_, {payload: pl}) => {
      const country_code = pl?.country_code
      return country_code?.toLowerCase() === 'us';
    }),
    reduce(A.setIpstack, (_, {payload: pl}) => {
      const country_code = pl?.country_code
      return country_code?.toLowerCase() === 'us';
    })),
  isLT: reducer<ST['isLT']>(ds.isLT,
    reduce(A.setGeoLocation, (_, {payload: pl}) => {
      const country_code = pl?.country_code
      return country_code?.toLowerCase() === 'lt';
    }),
    reduce(A.setIpstack, (_, {payload: pl}) => {
      const country_code = pl?.country_code
      return country_code?.toLowerCase() === 'lt';
    }))
});