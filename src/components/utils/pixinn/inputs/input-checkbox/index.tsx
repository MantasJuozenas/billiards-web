import { SVGIconCheck } from '@styles/global-icons/icons/svg-icon-check';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import { uuid } from '@utilsFn/uuid';
import React from 'react';
import styled from 'styled-components';

export const InputCheckbox = (props: NInputCheckbox.IProps) => {
  const { checkboxPlacement = 'right', fontStyle = 'normal' } = props;
  const id = React.useMemo(() => props?.id ?? uuid(), []);

  const isDisabled = props?.disabled ? 'disabled' : '';
  const classNames = [id, isDisabled, checkboxPlacement, fontStyle];
  return (
    <ContainerInputCheckbox
      className={joinClasses(props?.classNameContainer, ...classNames)}
    >
      <span className={joinClasses('input_checkbox_span_main', ...classNames)}>
        <span className={joinClasses('input_checkbox_span', ...classNames)}>
          <input
            {...omit(
              props,
              'classNameContainer',
              'type',
              'onChange',
              'placeholder',
              'checkboxPlacement',
              'fontStyle'
            )}
            type="checkbox"
            onChange={(e) => {
              if (props?.onChange) {
                props?.onChange(e?.target?.checked, e);
              }
            }}
          />
          <span
            className={joinClasses('input_checkbox_span_svg', ...classNames)}
          >
            <SVGIconCheck />
          </span>
        </span>
        {!props?.placeholder ? null : (
          <span
            className={joinClasses('input_checkbox_span_label', ...classNames)}
          >
            {props?.placeholder}
          </span>
        )}
      </span>
      {!props?.error ? null : <p>{props?.error}</p>}
    </ContainerInputCheckbox>
  );
};

export namespace NInputCheckbox {
  export interface IProps
    extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'placeholder'
    > {
    classNameContainer?: string;
    onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: React.ReactNode;
    checkboxPlacement?: 'left' | 'right';
    fontStyle?: 'normal' | 'bold';
  }
}

const ContainerInputCheckbox = styled.label`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .input_checkbox_span_main {
    display: flex;
    align-items: center;
    cursor: pointer;
    &.right {
      flex-direction: row-reverse;
    }
    &.disabled {
      cursor: not-allowed;
    }
  }
  .input_checkbox_span {
    position: relative;
    width: 18px;
    min-width: 18px;
    height: 18px;
    min-height: 18px;
    > input {
      top: 0;
      left: 0;
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      :hover {
        //
      }
      :focus {
        //
      }
      :checked {
        + .input_checkbox_span_svg {
          box-shadow: none;
          > svg {
            transform: scale(1);
          }
        }
      }
      :disabled {
        + .input_checkbox_span_svg {
          box-shadow: none;
          background-color: ${({ theme }) => theme.colors.greyECE};
          > svg {
            > path {
              fill: ${({ theme }) => theme.colors.greyECE};
            }
          }
        }
      }
    }
  }
  .input_checkbox_span_svg {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.blue006};
    > svg {
      height: 100%;
      width: 100%;
      transition: transform 0.1s ease-in 25ms;
      transform: scale(0);
      transform-origin: bottom left;
      > path {
        //
      }
    }
  }
  .input_checkbox_span_label {
    margin: 0 0 0 11px;
    font: normal normal 400 14px/19px Segoe UI Regular;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &.right {
      margin: 0 11px 0 0px;
    }
    &.bold {
      font: normal normal 600 14px/19px Segoe UI Semibold;
    }
    &.disabled {
      color: ${({ theme }) => theme.colors.greyECE};
    }
  }
  > p {
    margin: 4px 0;
    color: ${({ theme }) => theme.colors.redEF3};
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
`;
