import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const setGeoLocation = action<ST['geo']>('geolocation-db.set_geolocation');
export const setIpstack = action<ST['ipstack']>('geolocation-db.set_ipstack');
/* Saga actions */
export const getGeoLocation = action<G.TLifecycleSaga<{calledFromError?: boolean}>>('geolocation-db.get_geolocation');
export const getIpstack = action<G.TLifecycleSaga<{calledFromError?: boolean}>>('geolocation-db.get_ipstack');
