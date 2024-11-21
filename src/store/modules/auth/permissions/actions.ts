import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from '../types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const setPermissions = action<ST['permissions']>('auth.set-permissions');
export const mergePermissions = action<Partial<ST['permissions']>>('auth.merge-permissions');
/* Saga actions */
export const getPermissions = action('auth.get-permissions');
