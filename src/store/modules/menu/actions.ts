import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const SetTable = action<ST['table']>('menu.set-table');
export const SetMenuList = action<ST['menuList']>('menu.set-menu-list');
export const MergeMenuList = action<Partial<ST['menuList']>>('menu.merge-menu-list');
export const ResetMenuList = action('menu.reset-menu-list');
/* Saga actions */
export const GetMenuList = action<G.TLifecycleSaga>('menu.get-menu-list');