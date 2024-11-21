import React from 'react';

import { ModalCloseBtn, ModalCustomHeader, ModalTitle } from '.';

export const MainContent = React.forwardRef(
  (props: NMainContent.IProps, refHeaderDiv: any) => (
    <>
      {props?.title || props?.showCloseBtn || props?.customHeader ? (
        <div className={props?.classNamesHeaderDiv} ref={refHeaderDiv}>
          {props?.title || props?.showCloseBtn ? (
            <div className={props?.classNamesTitleDiv}>
              {props?.showCloseBtn &&
              props?.modalCloseBtnPosition === 'left' ? (
                <ModalCloseBtn {...props} />
              ) : null}

              {props?.title ? <ModalTitle {...props} /> : null}

              {props?.customHeader ? <ModalCustomHeader {...props} /> : null}

              {props?.showCloseBtn &&
              props?.modalCloseBtnPosition === 'right' ? (
                <ModalCloseBtn {...props} />
              ) : null}
            </div>
          ) : null}

          {props?.customHeader && !props?.title && !props?.showCloseBtn ? (
            <ModalCustomHeader {...props} />
          ) : null}
        </div>
      ) : null}
      {props?.children}
    </>
  )
);

export namespace NMainContent {
  export interface IProps {
    title: React.ReactNode;
    showCloseBtn: boolean;
    customHeader: React.ReactNode;
    classNamesIdModal: string;
    classNamesHeaderDiv: string;
    classNamesTitleDiv: string;
    children: React.ReactNode;
    classNamesTitleH2Drag: string;
    isModalMoveable: boolean;
    classNameModal: string;
    classNameTitleH2Drag: string;
    classNamesCloseBtnDiv: string;
    onReqClose: () => void;
    customCloseBtn: React.ReactNode;
    classNamesCustomHeader: string;
    classNameCustomHeader: string;
    closeBtnIconType: React.ReactNode | null;
    modalCloseBtnPosition: 'left' | 'right';
  }
}
