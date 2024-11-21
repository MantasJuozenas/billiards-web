import { setToastData } from '@store/modules/modals-and-forms/actions';
import { TMAFToast } from '@store/modules/modals-and-forms/types';
import { DispatchProp } from 'react-redux';

import { omit } from './omit';

export const HandlerShowToast = (props: NHandlerShowToast.IProps) => {
  const { toastType, toastCode, toastStrings } = props;

  const tostData: G.IStore['modalsAndForms']['toast'] = {
    ...omit(props, 'dispatch', 'toastType', 'toastCode', 'toastStrings'),
    openModalType: props?.toastType,
    // @ts-ignore
    title: toastStrings?.[toastCode]?.[toastType]?.title,
    // @ts-ignore
    msg: toastStrings?.[toastCode]?.[toastType]?.msg
  };

  props?.dispatch?.(setToastData(tostData));
};

export namespace NHandlerShowToast {
  export type TToastColor = 'green' | 'red' | 'yellow' | 'blue';

  export interface IProps extends Omit<TMAFToast, 'openModalType'> {
    dispatch: (call: any) => DispatchProp<any>;
    toastType: G.TOpenModalTypes;
    toastCode: 'ok' | 'error';
    toastStrings: G.IToastStrings;
  }
}
