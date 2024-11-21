import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const SetIsAppReady = action<ST['isAppReady']>('global.set_is_app_ready');
export const setNewApolloClient = action<ST['ApolloClient']>('global.set_new_apollo_client');
/* Saga actions */
export const setApolloClient = action<G.TLifecycleSaga<{client: ST['ApolloClient']}>>('global.set_apollo_client');