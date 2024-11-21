import { med } from '@utilsFn/breakpoint';
import { joinClasses } from '@utilsFn/join-classes';
import React from 'react';
import styled, { css } from 'styled-components';

import { NCustomModal } from '../custom-modal';
import { MainContent } from '.';

export const CustomModalContent = (props: NCustomModalContent.IProps) => {
  const { classNames = [''] } = props;

  const refHeaderDiv = React.useRef<HTMLDivElement>();
  const [requiredIdDivHeight, setRequiredIdDivHeight] = React.useState(0);

  /* eslint-disable prettier/prettier */
  const classNamesCustomModalContent = joinClasses(props?.classNameCustomModalContent, ...classNames);
  const classNamesHeaderDiv = joinClasses(props?.classNameHeaderDiv, ...classNames);
  const classNamesTitleDiv = joinClasses(props?.classNameTitleDiv, ...classNames);
  const classNamesTitleH2Drag = joinClasses(props?.classNameTitleH2Drag, ...classNames);
  const classNamesCloseBtnDiv = joinClasses(props?.classNameCloseBtnDiv, ...classNames);
  const classNamesCustomHeader = joinClasses(props?.classNameCustomHeader, ...classNames);
  /* eslint-enable prettier/prettier */

  const handlerGetHeaderHeight = () => {
    if (refHeaderDiv?.current) {
      const headerHeight =
        refHeaderDiv?.current?.getBoundingClientRect?.()?.height || 0;
      const requiredIdDivHeightFinal =
        (props?.modalMaxHeight || 0) - headerHeight;
      setRequiredIdDivHeight(requiredIdDivHeightFinal);
    }
  };

  React.useEffect(() => {
    handlerGetHeaderHeight();
  }, [refHeaderDiv?.current, props?.modalMaxHeight]);

  return (
    <ContainerCustomModalContent
      className={classNamesCustomModalContent}
      modalType={props?.modalType || 'stickyHeaderAndFooter'}
      requiredIdOne={props?.requiredIdOne}
      // @ts-ignore
      requiredIdDivHeight={requiredIdDivHeight}
      classNameHeaderDiv={props?.classNameHeaderDiv}
      classNameTitleDiv={props?.classNameTitleDiv}
      classNameTitleH2Drag={props?.classNameTitleH2Drag}
      classNameCloseBtnDiv={props?.classNameCloseBtnDiv}
      classNameButtonsDiv={props?.classNameButtonsDiv}
      classNameCustomHeader={props?.classNameCustomHeader}
      modalBackgroundColor={props?.modalBackgroundColor}
      headerBackgroundColor={props?.headerBackgroundColor}
      btnDivBackgroundColor={props?.btnDivBackgroundColor}
      lineBorderStyleTop={props?.lineBorderStyleTop}
      lineBorderStyleBottom={props?.lineBorderStyleBottom}
      isModalMobile={props?.isModalMobile}
      modalCloseBtnPosition={props?.modalCloseBtnPosition}
    >
      <MainContent
        classNamesIdModal={props?.classNamesIdModal || ''}
        classNameCustomHeader={props?.classNameCustomHeader || ''}
        classNameModal={props?.classNameModal || ''}
        classNameTitleH2Drag={props?.classNameTitleH2Drag || ''}
        classNamesCloseBtnDiv={classNamesCloseBtnDiv}
        classNamesCustomHeader={classNamesCustomHeader}
        classNamesHeaderDiv={classNamesHeaderDiv}
        classNamesTitleDiv={classNamesTitleDiv}
        classNamesTitleH2Drag={classNamesTitleH2Drag}
        customCloseBtn={props?.customCloseBtn}
        customHeader={props?.customHeader}
        isModalMoveable={!!props?.isModalMoveable}
        onReqClose={props?.onReqClose}
        showCloseBtn={!!props?.showCloseBtn}
        title={props?.title}
        closeBtnIconType={props?.closeBtnIconType}
        // @ts-ignore
        ref={refHeaderDiv}
        modalCloseBtnPosition={props?.modalCloseBtnPosition || 'right'}
      >
        {props?.children}
      </MainContent>
    </ContainerCustomModalContent>
  );
};

export namespace NCustomModalContent {
  export interface IProps extends NCustomModal.IProps {
    modalMaxHeight: number;
    classNames: string[];
  }

  export interface IStyle {
    modalType: NCustomModal.TModalTypes;
    requiredIdOne: string;
    requiredIdDivHeight: number;
    classNameHeaderDiv: string;
    classNameTitleDiv: string;
    classNameTitleH2Drag: string;
    classNameCloseBtnDiv: string;
    classNameButtonsDiv: string;
    classNameCustomHeader: string;
    modalBackgroundColor: string;
    headerBackgroundColor: string;
    btnDivBackgroundColor: string;
    lineBorderStyleTopAndBottom?: string;
    lineBorderStyleTop?: string;
    lineBorderStyleBottom?: string;
    isModalMobile?: boolean;
    modalCloseBtnPosition: 'left' | 'right';
  }
}

const ContainerCustomModalContent = styled.div<NCustomModalContent.IProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
  overflow: auto;

  .${(props) => props?.classNameHeaderDiv} {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props?.headerBackgroundColor};
    flex: 0 0 auto;
    border-bottom: ${(props) => props?.lineBorderStyleTop};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    ${(props) => {
      // just because of ios
      if (props?.isModalMobile) {
        return css`
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1;
        `;
      }
    }}
  }

  .${(props) => props?.classNameTitleDiv} {
    display: flex;
    width: 100%;
    flex: 1;
    align-items: left;
    justify-content: flex-end;
  }

  .${(props) => props.classNameTitleH2Drag} {
    width: 100%;
    margin: 0px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    padding: 20px 0px 20px 20px;
    word-break: break-word;
    cursor: unset;

    &.__Modal__Moveable__ {
      cursor: move;
    }

    ${(props) => {
      if (props?.modalCloseBtnPosition === 'left') {
        return css`
          padding: 20px 20px 20px 0px;
        `;
      }
    }}
  }

  .${(props) => props?.classNameCloseBtnDiv} {
    display: flex;
    padding: 21px 26px 21px 20px;
    align-self: flex-start;

    > svg {
      cursor: pointer;
    }

    ${(props) => {
      if (props?.modalCloseBtnPosition === 'left') {
        return css`
          padding: 21px 20px 21px 26px;
          margin-right: auto;
        `;
      }
    }}
  }

  .${(props) => props?.classNameCustomHeader} {
    /* width: 100%; */
    cursor: unset;
    &.__Modal__Moveable__ {
      cursor: move;
    }
  }

  #${(props) => props?.requiredIdOne} {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;

    > div:not(:last-child) {
      width: 100%;
      flex: 1 1 0%;
      /* padding: 0 25px; */
    }

    ${(props) => {
      // just because of ios
      if (props?.isModalMobile) {
        return css`
          flex: 0 0 auto;
          /* flex: 1 1 0%; */
          > div:not(:last-child) {
            flex: 0 0 auto;
          }
        `;
      }
    }}

    ${(props) => {
      switch (props?.modalType) {
        case 'stickyHeader':
          return css`
            overflow: auto;
          `;
        case 'stickyHeaderAndFooter':
          return css`
            overflow: auto;
            > div:not(:last-child) {
              overflow: auto;
            }
          `;
        default:
          break;
      }
    }}
  }

  .${(props) => props?.classNameButtonsDiv} {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${(props) => props?.btnDivBackgroundColor};
    padding: 10px 30px 30px 30px;
    border-top: ${(props) => props?.lineBorderStyleBottom};

    button {
      :not(:last-child) {
        margin-right: 15px;
      }
    }

    ${(props) => {
      switch (props?.modalType) {
        case 'stickyFooter':
          return css`
            position: sticky;
            bottom: 0;
          `;
        default:
          break;
      }
    }}
  }

  // mobile styles
  ${med.max.sm} {
    .${(props) => props?.classNameButtonsDiv} {
      padding: 15px 15px 30px 15px;

      button {
        :last-child {
          width: 100%;
        }
      }
    }
  }
`;

/* ${med.max.sm)} {
    .${(props) => props.classNameTitleH2Drag} {
      padding: 20px 10px 15px 10px;
      * {
        text-decoration: underline;
        text-underline-offset: 3px;
        /* text-decoration-thickness: 2px; //
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: 0px;
        font-family: 'Segoe UI SemiBold', sans-serif;
      }
      > div {
        display: flex;
        align-items: center;
        > svg {
          margin: 0 0 0 10px;
          height: 20px;
          min-height: 20px;
          width: 20px;
          min-width: 20px;
        }
      }
    }
    .${(props) => props?.classNameCloseBtnDiv} {
      /* padding: 20px 10px 15px 0px; //
    }
    #${(props) => props?.requiredIdOne} {
      > div:not(:last-child) {
        padding: 0 10px;
        height: 100%;
      }
    }
    .${(props) => props?.classNameButtonsDiv} {
      padding: 20px 10px;
    }
  } */
