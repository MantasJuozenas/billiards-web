import { SVGIconClose1 } from '@styles/global-icons/icons/svg-icon-close-1';
import React from 'react';

export const ModalCloseBtn = (props: NModalCloseBtn.IProps) => {
  return (
    <div className={props?.classNamesCloseBtnDiv} onClick={props?.onReqClose}>
      {props?.customCloseBtn || <SVGIconClose1 />}
    </div>
  );
};

export namespace NModalCloseBtn {
  export interface IProps {
    classNamesCloseBtnDiv: string;
    onReqClose: () => void;
    customCloseBtn: React.ReactNode;
    closeBtnIconType: React.ReactNode | null;
  }
}
