import { Loaders } from '@components/utils/loaders';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';
import styled, { css } from 'styled-components';

/**
 * @example
 * <Button>Test</Button>
 *
 * <Button iconPlacement="left">
 *   <SVGIconRedX />
 *   Test
 * </Button>
 *
 * <Button
 *   iconPlacement="left"
 *   btnHeight={35}
 *   btnType="text"
 *   isLoading
 * >
 *   <SVGIconRedX />
 *   Test
 * </Button>
 */

export const Button = (props: NButton.IProps) => {
  const icon = !!props?.iconPlacement;

  const classNames = [
    props?.btnColor ?? 'redFF0055',
    icon ? 'withIcon' : '',
    props?.iconPlacement || '',
    props?.isLoading ? 'isLoading' : ''
  ]?.filter?.((v) => v);

  return (
    <ContainerButton
      {...omit(props?.button || {}, 'className')}
      className={joinClasses(
        props?.button?.className || '',
        props?.btnColor,
        ...classNames
      )}
      height={props?.btnHeight || 45}
      btnType={props?.btnType || 'background'}
    >
      {props?.isLoading ? (
        <Loaders isLoading loaderName="BubbleLoader" />
      ) : (
        props?.children || null
      )}
    </ContainerButton>
  );
};

export namespace NButton {
  export type TButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

  export interface IProps {
    button?: TButton;
    children?: React.ReactNode;
    btnHeight?: 50 | 45 | 35;
    isLoading?: boolean;
    iconPlacement?: 'left' | 'right';
    btnType?: 'background' | 'border' | 'text' | 'custom';
    btnColor?: 'redFF0055' | 'grey383838';
  }

  export interface IStyle {
    height: number;
    btnType: IProps['btnType'];
  }
}

const ContainerButton = styled.button<NButton.IStyle>`
  --height: ${(props) => props?.height}px;
  --paddingLeft: 20px;
  --paddingRight: 20px;
  --colorBg: #ff0055;
  --colorBgHover: #dd024b;
  --colorBgActive: #dd024b;
  --colorText: #ffffff;
  --colorTextHover: #ffffff;
  --colorTextActive: #ffffff;
  --border: inset 0 0 0 1px transparent;
  --borderHover: inset 0 0 0 1px var(--colorBgHover);
  --borderActive: inset 0 0 0 1px var(--colorBgActive);

  &.withIcon {
    --paddingLeft: 13px;
    --paddingRight: 13px;
  }

  &.grey383838 {
    --colorBg: #383838;
    --colorBgHover: #000000;
    --colorBgActive: #000000;
  }

  cursor: pointer;
  border: none;

  height: var(--height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--paddingRight) 0 var(--paddingLeft);
  border-radius: 6px;
  background-color: var(--colorBg);
  box-shadow: var(--border);

  font: normal normal 500 16px/16px Roboto;
  letter-spacing: 0.8px;
  color: var(--colorText);

  :hover {
    background-color: var(--colorBgHover);
    box-shadow: var(--borderHover);

    color: var(--colorTextHover);
  }

  :focus {
    outline: none;
  }

  :active {
    outline: none;
    background-color: var(--colorBgActive);
    box-shadow: var(--borderActive);

    color: var(--colorTextActive);
  }

  :disabled {
    cursor: not-allowed;
    background-color: #515151;
    box-shadow: inset 0 0 0 1px #515151;

    font: normal normal 500 16px/16px Roboto;
    letter-spacing: 0.8px;
    color: #a9a9a9;
  }

  &.isLoading {
    cursor: not-allowed;
    background-color: var(--colorBg);
    box-shadow: inset 0 0 0 1px transparent;

    font: normal normal 600 16px/24px Open sans;
    letter-spacing: 0px;
    color: #cecece;
  }

  &.withIcon.left {
    svg {
      :first-child {
        margin-right: var(--paddingRight);
      }
    }
  }

  &.withIcon.right {
    svg {
      :last-child {
        margin-left: var(--paddingLeft);
      }
    }
  }

  ${(props) => {
    if (props?.height === 35) {
      return css`
        --paddingLeft: 15px;
        --paddingRight: 15px;

        &.withIcon {
          --paddingLeft: 10px;
          --paddingRight: 10px;
        }
      `;
    }
  }}

  ${(props) => {
    if (props?.btnType === 'text') {
      return css`
        --colorText: #00b8ff;
        --colorTextHover: #00b8ff;
        --colorTextActive: #00b8ff;
        --colorBg: #ffffff;
        --colorBgHover: #edfaff;
        --colorBgActive: #e0f7ff;

        .bubble_loader {
          background-color: var(--colorText);
        }

        &.red {
          --colorText: #ffffff;
          --colorTextHover: #ffffff;
          --colorTextActive: #ffffff;
          --colorBg: #ff005500;
          --colorBgHover: #dd024b11;
          --colorBgActive: #dd024b11;
          --border: inset 0 0 0 1px transparent;
          --borderHover: inset 0 0 0 1px var(--colorBg);
          --borderActive: inset 0 0 0 1px var(--colorBgActive);
        }
      `;
    }
  }}
`;
