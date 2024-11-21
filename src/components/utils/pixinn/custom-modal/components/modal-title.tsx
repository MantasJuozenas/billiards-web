import { dragElement } from '@utilsFn/drag-element';
import React from 'react';

export const ModalTitle = (props: NModalTitle.IProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <h2
      className={props?.classNamesTitleH2Drag}
      onMouseEnter={() => {
        if (props?.isModalMoveable) {
          dragElement(props?.classNameModal, props?.classNameTitleH2Drag);
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
      {props?.title}
    </h2>
  );
};

export namespace NModalTitle {
  export interface IProps {
    classNamesIdModal: string;
    classNamesTitleH2Drag: string;
    isModalMoveable: boolean;
    classNameModal: string;
    classNameTitleH2Drag: string;
    title: React.ReactNode;
  }
}
