/* eslint-disable max-len */
import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const setLoginData = action<ST['login']>('modals-and-forms.lfc.set_login_data');
export const mergeLoginData = action<Partial<ST['login']>>('modals-and-forms.lfc.merge_login_data');
export const setPasswordChangeData = action<ST['passwordChange']>('modals-and-forms.set_password_change_data');
export const setToastData = action<ST['toast']>('modals-and-forms.set_toast_data');
export const setConfirmationData = action<ST['confirmation']>('modal-and-forms.set_confirmation_data');
export const setConfirmationData_TEST = action<ST['confirmation_TEST']>('modals-and-forms.lfc.set_confirmation_data_test');
export const setBlockedTimeData = action<ST['blockedTime']>('modals-and-forms.set_blocked_time_data');
export const SetMenuItemData = action<ST['menuItem']>('modals-and-forms.lfc.set_menu_item_data');
export const MergeMenuItemData = action<Partial<ST['menuItem']>>('modals-and-forms.lfc.merge_menu_item_data');
