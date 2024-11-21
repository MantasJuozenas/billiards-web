import { ErrorInput } from '@components/utils/shared/error-input';
import { SVGIconCheck1 } from '@styles/global-icons/icons/svg-icon-check-1';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';
import styled from 'styled-components';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r3">
 *   <Controller
 *     defaultValue
 *     name="rememberMe"
 *     control={control}
 *     render={({ field }) => (
 *       <InputCheckbox
 *         input={{
 *           ...(field as any),
 *           checked: field?.value,
 *           placeholder: t(`modals-and-forms:::FormLogin::text4`),
 *           onChange: (val) => {
 *             field?.onChange?.(val);
 *           }
 *         }}
 *       />
 *     )}
 *   />
 * </div>
 */

export const InputCheckbox = (props: NInputCheckbox.IProps) => {
  const msgError = props?.msgError || '';

  const classNames = [
    msgError ? 'isError' : '',
    props?.input?.disabled ? 'isDisabled' : '',
    props?.borderRadius ?? '',
    props?.checkboxPlacement || 'left'
  ]?.filter?.((v) => v);

  return (
    <ContainerInputCheckbox
      className={joinClasses('_InputCheckbox', ...classNames)}
    >
      <span
        className={joinClasses('InputCheckbox_r1', ...classNames)}
        onClick={() =>
          !props?.input?.disabled &&
          props?.input?.onChange?.(!props?.input?.checked)
        }
      >
        <span className={joinClasses('InputCheckbox_r1_r1', ...classNames)}>
          <input
            {...omit(props?.input, 'placeholder', 'onClick')}
            type="checkbox"
          />

          <span
            className={joinClasses('InputCheckbox_r1_r1_r1', ...classNames)}
          >
            <SVGIconCheck1 />
          </span>
        </span>

        {props?.input?.placeholder ? (
          <span className={joinClasses('InputCheckbox_r1_r2', ...classNames)}>
            {props?.input?.placeholder}
          </span>
        ) : null}
      </span>

      <ErrorInput msgError={msgError} />
    </ContainerInputCheckbox>
  );
};

export namespace NInputCheckbox {
  export type TInput = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    onChange?: (value: boolean) => void;
  };

  export interface IProps {
    input: TInput;
    msgError?: React.ReactNode;
    borderRadius?: 'br-50';
    checkboxPlacement?: 'left' | 'right';
  }
}

const ContainerInputCheckbox = styled.div`
  --widthCheckbox: 18px;
  --heightCheckbox: 18px;
  --border: inset 0 0 0 2px #a9a9a9;
  --borderHover: inset 0 0 0 2px #ff0055;
  --borderDisabled: inset 0 0 0 2px #b3b3b3;

  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .InputCheckbox_r1 {
    display: flex;
    align-items: center;
    cursor: pointer;

    &.right {
      flex-direction: row-reverse;
    }

    :hover {
      .InputCheckbox_r1_r2 {
        color: #ffffff;
      }

      .InputCheckbox_r1_r1_r1 {
        box-shadow: var(--borderHover);
      }
    }

    &.isDisabled {
      cursor: not-allowed;
    }
  }

  .InputCheckbox_r1_r1 {
    position: relative;
    width: var(--widthCheckbox);
    min-width: var(--widthCheckbox);
    height: var(--heightCheckbox);
    min-height: var(--heightCheckbox);

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
        + .InputCheckbox_r1_r1_r1 {
          box-shadow: none !important;

          > svg {
            transform: scale(1);
          }

          :hover {
            ::before {
              content: '';
              position: absolute;
              top: -11px;
              left: -11px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #ff00552b;
            }
          }
        }
      }

      :disabled {
        + .InputCheckbox_r1_r1_r1 {
          opacity: 0.34;
          box-shadow: var(--borderDisabled);

          > svg {
            > path {
              /* fill: #00b8ff59; */
            }
          }
        }
      }
    }
  }

  .InputCheckbox_r1_r1_r1 {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    box-shadow: var(--border);

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

  .InputCheckbox_r1_r2 {
    /* -webkit-user-select: none; */
    /* -moz-user-select: none; */
    /* -ms-user-select: none; */
    /* user-select: none; */

    display: flex;
    align-items: center;

    margin: 0 0 0 11px;

    font: normal normal normal 16px/24px Roboto;
    letter-spacing: 0.5px;
    color: #a9a9a9;

    &.right {
      margin: 0 11px 0 0px;
    }

    &.isDisabled {
      color: #ececec;
    }
  }

  &.br-50 {
    .InputCheckbox_r1_r1 {
      border-radius: 50%;
      overflow: hidden;
    }

    .InputCheckbox_r1_r1_r1 {
      border-radius: 50%;
    }
  }
`;
