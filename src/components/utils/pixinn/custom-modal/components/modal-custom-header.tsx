import { dragElement } from '@utilsFn/drag-element';
import React from 'react';

export const ModalCustomHeader = (props: NModalCustomHeader.IProps) => {
  return (
    <div
      className={props?.classNamesCustomHeader}
      onMouseEnter={() => {
        if (props?.isModalMoveable) {
          dragElement(props?.classNameModal, props?.classNameCustomHeader);
        }
      }}
      onMouseDown={() => {
        if (props?.isModalMoveable) {
          const docOverlayArr = document.querySelectorAll(
            `.__React_Modal_Custom_Overlay__`
          );
          let docOverlay: Element;
          docOverlayArr?.forEach((item) => {
            if (item?.classList?.contains(props?.classNamesIdModal)) {
              docOverlay = item;
            }
          });

          if (
            // @ts-ignore
            docOverlay &&
            !docOverlay?.classList?.contains(
              '.__React_Modal_Custom_Overlay__Move__'
            )
          ) {
            docOverlay?.classList.add('__React_Modal_Custom_Overlay__Move__');
          }

          const docModal = document.getElementById(props?.classNamesIdModal);
          if (
            docModal &&
            !docModal?.classList?.contains('.ReactModal__Content_Move')
          ) {
            docModal?.classList.add('ReactModal__Content_Move');
          }
        }
      }}
    >
      {props?.customHeader}
    </div>
  );
};

export namespace NModalCustomHeader {
  export interface IProps {
    classNamesIdModal: string;
    classNamesCustomHeader: string;
    isModalMoveable: boolean;
    classNameModal: string;
    classNameCustomHeader: string;
    customHeader: React.ReactNode;
  }
}
