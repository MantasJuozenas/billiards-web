import { NHandlers } from '@components/modals-and-forms/add-or-edit-blocked-time/gql-documents';
import { NPageTimeBlocking } from '@components/pages/admin/time-blocking/page-time-blocking';
import { NHandlerShowToast } from '@utilsFn/handler-show-toast';
import React from 'react';

export type TMAFLogin = G.TMAFState<{
  loginFrom: G.TLoginFrom;
  redirectPathAfterLogin?: string;
}>;

export type TMAFToast = G.TMAFState<{
  color?: NHandlerShowToast.TToastColor;
  title?: string;
  msg?: string;
  compCustomToast?: React.ReactNode;
  width?: 'fit-content' | number;
  /** Automatically close/remove toast after {{autoCloseAfter}} milliseconds */
  autoCloseAfter?: number;
  toastTypeFor?: '';
}>;

export type IMAFConfirmationData = G.TMAFState<{
  modalTitle?: string;
  isOpen?: boolean;
  onReqClose?: () => void;
  children?: React.ReactNode;
  requiredIdOne?: string;
  component?: React.ReactNode | null;
}>;

export type TMAFConfirmationData_TEST = G.TMAFState<{
  requiredIdOne?: string;
  component?: React.ReactNode | null;
}>;

export type IMAFBlockedTime = G.TMAFState<
  {
    start?: Date;
    end?: Date;
    data?: NPageTimeBlocking.RBCEvent;
  },
  NHandlers.IDoneProps,
  NHandlers.IErrorProps
>;

export type TMAFMenuItem = G.TMAFState<{
  productId?: string;
  modifiers?: G.Dictionary<{
    productId: string;
    amount: string;
    productGroupId?: string | null;
  }> | null;
}>;

export interface IState {
  login: TMAFLogin;
  passwordChange: any;
  toast: TMAFToast;
  confirmation: IMAFConfirmationData;
  confirmation_TEST: TMAFConfirmationData_TEST;
  blockedTime: IMAFBlockedTime;
  menuItem: TMAFMenuItem;
}

export const defaultState: IState = {
  login: { openModalType: null },
  passwordChange: { openModalType: null },
  toast: { openModalType: null },
  confirmation: { openModalType: null },
  confirmation_TEST: { openModalType: null },
  blockedTime: { openModalType: null },
  menuItem: { openModalType: null }
};
