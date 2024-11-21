import { isBrowser } from '@utilsFn/check-browser';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import { uuid } from '@utilsFn/uuid';
import React from 'react';
import Modal, { Props } from 'react-modal';

import { CustomModalContent } from './components';

Modal.setAppElement('#__next');

export const CustomModal = (props: NCustomModal.IProps) => {
  const modalUniqueId = React.useMemo(() => props?.id || uuid(), []);

  const {
    idModal = `${modalUniqueId}`,
    classNameModal = `__Modal_Drag_Div__${modalUniqueId}`,
    classNameCustomModalContent = `__Container_Custom_Modal_Content__${modalUniqueId}`,
    classNameHeaderDiv = `__Modal_Header_Div__${modalUniqueId}`,
    classNameTitleDiv = `__Modal_Title_Div__${modalUniqueId}`,
    classNameTitleH2Drag = `__Modal_Drag_Title_H2__${modalUniqueId}`,
    classNameCloseBtnDiv = `__Modal_Close_Btn_Div__${modalUniqueId}`,
    classNameButtonsDiv = `__Modal_Buttons_Div__`,
    classNameCustomHeader = `__Modal_Custom_Header_Div__${modalUniqueId}`,
    modalType = 'stickyHeaderAndFooter',
    isModalResizeable = false,
    isModalMoveable = false,
    isModalFullscreen = false,
    isModalMobile = false,
    showCloseBtn = false,
    modalMarginTop = 54,
    modalMarginTopAndBottom = 50,
    modalMaxWidth = `100%`,
    modalWidth = `fit-content`,
    modalBackgroundColor = '#181818',
    headerBackgroundColor = modalBackgroundColor,
    btnDivBackgroundColor = modalBackgroundColor,
    lineBorderStyleTopAndBottom = 'none',
    lineBorderStyleTop = lineBorderStyleTopAndBottom,
    lineBorderStyleBottom = lineBorderStyleTopAndBottom,
    shouldCloseOnOverlayClick = true,
    closeBtnIconType = null,
    modalCloseBtnPosition = 'right'
  } = props;

  // const [, setWidth] = React.useState(isBrowser() ? window.innerWidth : 0);
  const [height, setHeight] = React.useState(
    isBrowser() ? window.innerHeight : 0
  );

  const nameModalMoveable = isModalMoveable ? '__Modal__Moveable__' : '';
  const nameModalResizeable = isModalResizeable ? '__Modal__Resizable__' : '';
  // eslint-disable-next-line prettier/prettier
  const nameModalFullscreen = isModalFullscreen || isModalMobile ? '__Modal__Fullscreen__' : '';
  const nameModalMobile = isModalMobile ? '__Modal__Mobile__' : '';
  // eslint-disable-next-line prettier/prettier
  const classNames = [modalType, nameModalMoveable, nameModalResizeable, nameModalFullscreen, nameModalMobile];

  /* eslint-disable prettier/prettier */
  const classNameOverlay = joinClasses(`__React_Modal_Custom_Overlay__`, modalUniqueId);
  const classNamesIdModal = idModal;
  const classNamesModal = joinClasses(classNameModal, ...classNames);
  
  let modalMaxHeight = height - modalMarginTopAndBottom;
  let modalHeight = 'auto';
  let modalWidtH = modalWidth;
  /* eslint-enable prettier/prettier */

  if (isModalFullscreen) {
    modalMaxHeight = height - 1;
    modalHeight = `${height}px`;
    modalWidtH = '100vw';
  }

  if (isModalMobile) {
    modalMaxHeight = height - modalMarginTop;
    modalHeight = `auto`;
    modalWidtH = '100vw';
  }

  const customStyles: Modal.Styles = {
    content: {
      maxWidth: modalMaxWidth,
      width: modalWidtH,
      maxHeight: `${modalMaxHeight}px`,
      height: modalHeight,
      backgroundColor: modalBackgroundColor
    }
  };

  const updateWidthAndHeight = () => {
    if (isBrowser()) {
      // setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  }, []);

  return (
    <Modal
      isOpen={props?.isOpen}
      onRequestClose={() => props?.onReqClose?.()}
      htmlOpenClassName="ReactModal__Body--open"
      overlayClassName={classNameOverlay}
      style={{
        content: { ...customStyles?.content, ...props?.style?.content },
        overlay: { ...customStyles?.overlay, ...props?.style?.overlay }
      }}
      id={classNamesIdModal}
      className={classNamesModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      {...(omit(
        props,
        'style',
        'id',
        'className',
        'isOpen',
        'onRequestClose',
        'onReqClose',
        'children',
        'requiredIdOne',
        'title',
        'idModal',
        'classNameModal',
        'classNameCustomModalContent',
        'classNameHeaderDiv',
        'classNameTitleDiv',
        'classNameTitleH2Drag',
        'classNameCloseBtnDiv',
        'classNameButtonsDiv',
        'classNameCustomHeader',
        'modalType',
        'isModalResizeable',
        'isModalMoveable',
        'isModalFullscreen',
        'isModalMobile',
        'showCloseBtn',
        'modalMarginTop',
        'modalMarginTopAndBottom',
        'modalMaxWidth',
        'modalWidth',
        'modalBackgroundColor',
        'headerBackgroundColor',
        'btnDivBackgroundColor',
        'lineBorderStyleTopAndBottom',
        'lineBorderStyleTop',
        'lineBorderStyleBottom',
        'customCloseBtn',
        'customHeader',
        'closeBtnIconType'
      ) as any)}
    >
      <CustomModalContent
        {...{
          ...props,
          modalType,
          modalMaxHeight,
          classNames,
          classNamesIdModal,
          classNameModal,
          classNameCustomModalContent,
          classNameHeaderDiv,
          classNameTitleDiv,
          classNameTitleH2Drag,
          classNameCloseBtnDiv,
          classNameButtonsDiv,
          classNameCustomHeader,
          isModalMoveable,
          showCloseBtn,
          modalBackgroundColor,
          headerBackgroundColor,
          btnDivBackgroundColor,
          lineBorderStyleTopAndBottom,
          lineBorderStyleTop,
          lineBorderStyleBottom,
          closeBtnIconType,
          modalCloseBtnPosition
        }}
      />
    </Modal>
  );
};

export namespace NCustomModal {
  export type TModalTypes =
    | 'default'
    | 'stickyHeader'
    | 'stickyFooter'
    | 'stickyHeaderAndFooter';

  export interface IProps extends Props {
    isOpen: boolean;
    onReqClose: () => void;
    children: JSX.Element;
    requiredIdOne: string;
    title?: React.ReactNode;
    idModal?: string;
    classNamesIdModal?: string;
    classNameModal?: string;
    classNameCustomModalContent?: string;
    classNameHeaderDiv?: string;
    classNameTitleDiv?: string;
    classNameTitleH2Drag?: string;
    classNameCloseBtnDiv?: string;
    /**
     * This class name and your
     * form submit button class
     * needs to be the same
     */
    classNameButtonsDiv?: string;
    classNameCustomHeader?: string;
    modalType?: TModalTypes;
    isModalResizeable?: boolean;
    isModalMoveable?: boolean;
    isModalFullscreen?: boolean;
    isModalMobile?: boolean;
    showCloseBtn?: boolean;
    modalMarginTop?: number;
    modalMarginTopAndBottom?: number;
    modalMaxWidth?: string;
    modalWidth?: string;
    modalBackgroundColor?: string;
    headerBackgroundColor?: string;
    btnDivBackgroundColor?: string;
    lineBorderStyleTopAndBottom?: string;
    lineBorderStyleTop?: string;
    lineBorderStyleBottom?: string;
    customCloseBtn?: JSX.Element;
    customHeader?: JSX.Element;
    closeBtnIconType?: React.ReactNode | null;
    modalCloseBtnPosition?: 'left' | 'right';
  }
}
