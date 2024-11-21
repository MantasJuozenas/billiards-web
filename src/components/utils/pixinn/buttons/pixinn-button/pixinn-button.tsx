import { Loaders } from '@components/utils/loaders';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';
import styled, { css } from 'styled-components';

/**
 * @example
 * <PixinnButton>Test</PixinnButton>
 *
 * <PixinnButton iconPlacement="left">
 *   <SVGIconRedX />
 *   Test
 * </PixinnButton>
 *
 * <PixinnButton
 *   iconPlacement="left"
 *   btnHeight={35}
 *   btnType="text"
 *   isLoading
 * >
 *   <SVGIconRedX />
 *   Test
 * </PixinnButton>
 */

export const PixinnButton = (props: NPixinnButton.IProps) => {
  const icon = !!props?.iconPlacement;

  const classNames = [
    icon ? 'withIcon' : '',
    props?.iconPlacement || '',
    props?.isLoading ? 'isLoading' : ''
  ]?.filter?.((v) => v);

  return (
    <ContainerPixinnButton
      {...omit(props?.button || {}, 'className')}
      className={joinClasses(props?.button?.className || '', ...classNames)}
      height={props?.btnHeight || 45}
      btnType={props?.btnType || 'background'}
    >
      {props?.isLoading ? (
        <Loaders isLoading loaderName="BubbleLoader" />
      ) : (
        props?.children || null
      )}
    </ContainerPixinnButton>
  );
};

export namespace NPixinnButton {
  export type TButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

  export interface IProps {
    button?: TButton;
    children?: React.ReactNode;
    btnHeight?: 45 | 35;
    isLoading?: boolean;
    iconPlacement?: 'left' | 'right';
    btnType?: 'background' | 'border' | 'text' | 'custom';
  }

  export interface IStyle {
    height: number;
    btnType: IProps['btnType'];
  }
}

const ContainerPixinnButton = styled.button<NPixinnButton.IStyle>`
  --height: ${(props) => props?.height}px;
  --paddingLeft: 25px;
  --paddingRight: 25px;
  --colorBg: #00b8ff;
  --colorBgHover: #ffffff;
  --colorBgActive: #009bd6;
  --colorText: #ffffff;
  --colorTextHover: #00b8ff;
  --colorTextActive: #ffffff;
  --border: inset 0 0 0 1px transparent;
  --borderHover: inset 0 0 0 1px var(--colorBg);
  --borderActive: inset 0 0 0 1px var(--colorBgActive);

  &.withIcon {
    --paddingLeft: 13px;
    --paddingRight: 13px;
  }

  cursor: pointer;
  border: none;

  height: var(--height);
  display: flex;
  align-items: center;
  padding: 0 var(--paddingRight) 0 var(--paddingLeft);
  border-radius: 4px;
  background-color: var(--colorBg);
  box-shadow: var(--border);

  font: normal normal 600 16px/24px Open sans;
  letter-spacing: 0px;
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
    background-color: #fafafa;
    box-shadow: inset 0 0 0 1px #cecece;

    font: normal normal 600 16px/24px Open sans;
    letter-spacing: 0px;
    color: #cecece;
  }

  &.isLoading {
    cursor: not-allowed;
    background-color: #fafafa;
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
        --border: inset 0 0 0 1px transparent;
        --borderHover: inset 0 0 0 1px var(--colorBg);
        --borderActive: inset 0 0 0 1px var(--colorBgActive);

        .bubble_loader {
          background-color: var(--colorText);
        }
      `;
    }
  }}
`;
