import { BubbleLoader } from '@components/utils/loaders/components/bubble-loader';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import { uuid } from '@utilsFn/uuid';
import React from 'react';
import styled from 'styled-components';

export const CustomIconButton = (props: NCustomIconButton.IProps) => {
  const {
    styleType = 'text',
    color = 'grey',
    borderRadius = 'borderRadius3',
    size = 'height30',
    iconFullWidthAndHeight = true
  } = props;
  const id = React.useMemo(() => props.id ?? uuid(), []);

  // eslint-disable-next-line prettier/prettier
  const isIconFullWidthAndHeight = iconFullWidthAndHeight ? 'icon_Full_Width_And_Height' : ''
  // eslint-disable-next-line prettier/prettier
  const classNames = [styleType, color, borderRadius, size, isIconFullWidthAndHeight];

  const buttonId = joinClasses(props?.id || id);
  const buttonClassName = joinClasses(id, ...classNames, props?.className);

  return (
    <ContainerCustomIconButton
      {...omit(
        props,
        'styleType',
        'color',
        'borderRadius',
        'size',
        'isLoading',
        'iconFullWidthAndHeight'
      )}
      id={buttonId}
      className={buttonClassName}
    >
      {props?.isLoading ? <BubbleLoader /> : props?.children}
    </ContainerCustomIconButton>
  );
};

export namespace NCustomIconButton {
  export type TStyleType = 'background' | 'text';
  export type TColor = 'grey' | 'red' | 'green' | 'blue';
  export type TBorderRadius =
    | 'borderRadius0'
    | 'borderRadius3'
    | 'borderRadius50';
  export type TButtonSize =
    | 'height22'
    | 'height28'
    | 'height30'
    | 'height37'
    | 'height44';
  export interface IProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styleType?: TStyleType;
    color?: TColor;
    borderRadius?: TBorderRadius;
    size?: TButtonSize;
    isLoading?: boolean;
    iconFullWidthAndHeight?: boolean;
  }
}

const ContainerCustomIconButton = styled.button`
  width: fit-content;
  outline: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &.icon_Full_Width_And_Height {
    > svg,
    > img {
      width: 100%;
      min-width: 100%;
      height: 100%;
      min-height: 100%;
    }
  }
  &.height22 {
    height: 22px;
    min-height: 22px;
    width: 22px;
    min-width: 22px;
    padding: 3px;
  }
  &.height28 {
    height: 28px;
    min-height: 28px;
    width: 28px;
    min-width: 28px;
    padding: 5px;
  }
  &.height30 {
    height: 30px;
    min-height: 30px;
    width: 30px;
    min-width: 30px;
    padding: 5px;
  }
  &.height37 {
    height: 37px;
    min-height: 37px;
    width: 37px;
    min-width: 37px;
    padding: 5px;
  }
  &.height44 {
    height: 44px;
    min-height: 44px;
    width: 44px;
    min-width: 44px;
    padding: 5px;
  }
  &.borderRadius0 {
    border-radius: 0px;
  }
  &.borderRadius3 {
    border-radius: 3px;
  }
  &.borderRadius50 {
    border-radius: 50%;
  }
  &.background {
    &.green {
      background-color: ${({ theme }) => theme.colors.green81C};
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.whiteFFF};
        }
      }
      :hover:enabled {
        box-shadow: 0px 1px 3px #00000029;
      }
      :active:enabled {
        background-color: ${({ theme }) => theme.colors.green81C};
        box-shadow: none;
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.whiteFFF};
          }
        }
      }
      :disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.colors.greyE6E};
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey969};
          }
        }
      }
    }
    &.grey {
      background-color: ${({ theme }) => theme.colors.greyE6E};
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.black000};
        }
      }
      :hover:enabled {
        box-shadow: 0px 1px 3px #00000029;
      }
      :active:enabled {
        background-color: ${({ theme }) => theme.colors.green81C};
        box-shadow: none;
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.whiteFFF};
          }
        }
      }
      :disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.colors.whiteFFF};
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey969};
          }
        }
      }
    }
    &.red {
      background-color: ${({ theme }) => theme.colors.pinkFFD};
      border: 1px solid ${({ theme }) => theme.colors.pinkFFD};
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.redEF3};
        }
      }
      :hover:enabled {
        box-shadow: 0px 1px 3px #00000029;
      }
      :active:enabled {
        box-shadow: none;
        border: 1px solid ${({ theme }) => theme.colors.redEF3};
      }
      :disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.colors.whiteFFF};
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey969};
          }
        }
      }
    }
  }
  &.text {
    &.green {
      background-color: transparent;
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.black000};
        }
      }
      :hover:enabled {
        background-color: ${({ theme }) => theme.colors.green81C};
      }
      :active:enabled {
        background-color: ${({ theme }) => theme.colors.green00A};
      }
      :disabled {
        cursor: not-allowed;
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey8A8};
          }
        }
      }
    }
    &.grey {
      background-color: transparent;
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.black000};
        }
      }
      :hover:enabled {
        background-color: ${({ theme }) => theme.colors.whiteFFF};
      }
      :active:enabled {
        background-color: ${({ theme }) => theme.colors.greyC9C};
      }
      :disabled {
        cursor: not-allowed;
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey8A8};
          }
        }
      }
    }
    &.red {
      background-color: transparent;
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.redEF3};
        }
      }
      :hover:enabled {
        background-color: ${({ theme }) => theme.colors.pinkFFD};
      }
      :active:enabled {
        background-color: ${({ theme }) => theme.colors.greyC9C};
      }
      :disabled {
        cursor: not-allowed;
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey8A8};
          }
        }
      }
    }
    &.blue {
      background-color: transparent;
      > svg {
        path {
          fill: ${({ theme }) => theme.colors.blue006};
        }
      }
      :hover:enabled {
        background-color: ${({ theme }) => theme.colors.whiteFFF};
      }
      :active:enabled {
        background-color: ${({ theme }) => theme.colors.greyC9C};
      }
      :disabled {
        cursor: not-allowed;
        > svg {
          path {
            fill: ${({ theme }) => theme.colors.grey8A8};
          }
        }
      }
    }
  }
`;
