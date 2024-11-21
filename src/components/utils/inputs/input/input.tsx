import { ErrorInput } from '@components/utils/shared/error-input';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import { uuid } from '@utilsFn/uuid';
import React from 'react';
import styled from 'styled-components';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r2">
 *   <Input
 *     input={{
 *       placeholder: t(`modals-and-forms:::FormLogin::text3`),
 *       type: 'password',
 *       ...register('password')
 *     }}
 *     msgError={errors?.password?.message || ''}
 *   />
 * </div>
 */

export const Input = (props: NInput.IProps) => {
  const id = React.useMemo(() => props?.input?.id ?? uuid(), []);

  const msgError = props?.msgError || '';
  const icon = props?.icon || null;

  const classNames = [
    msgError ? 'isError' : '',
    icon ? 'withIcon' : ''
  ]?.filter?.((v) => v);

  return (
    <ContainerInput className={joinClasses(``, ...classNames)}>
      <input
        {...omit(props?.input, 'placeholder', 'className')}
        placeholder=" "
        id={id}
        className={joinClasses(props?.input?.className || '', ...classNames)}
      />

      <label htmlFor={id}>{props?.input?.placeholder || ''}</label>

      {icon ? <div className="Input_icon">{icon}</div> : null}

      {msgError ? <div className="Input_iconError" /> : null}

      <ErrorInput msgError={msgError} />
    </ContainerInput>
  );
};

export namespace NInput {
  export type TInput = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

  export interface IProps {
    input: TInput;
    msgError?: React.ReactNode;
    icon?: React.ReactNode;
  }
}

const ContainerInput = styled.div`
  /* box-shadow: 0 1px 0 0 red; /* Border top  */
  /* box-shadow: 0 -1px 0 0 red; /* Border bottom  */
  /* box-shadow: -1px 0 0 0 red; /* Border right  */
  /* box-shadow: 1px 0 0 0 red; /* Border left  */
  /* box-shadow: 0 0 0 1px red; /* All the borders by using the spread properties  */
  --height: 56px;
  --paddingTop: 28px;
  --paddingRight: 15px;
  --paddingBottom: 7px;
  --paddingLeft: 15px;
  --colorFocus: #a9a9a9;
  --colorError: #df0303;
  --borderRadius: 4px;
  --border: inset 0 0 0 0px #292929;
  --borderHover: inset 0 0 0 1px #ff0055;
  --borderFocus: inset 0 0 0 1px #ff0055;
  --borderError: inset 0 0 0 1px transparent;
  --transition: 0.4s ease all;

  &.withIcon {
    --paddingLeft: 51px;
  }

  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    -webkit-appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
    transition: var(--transition);
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input {
    width: 100%;
    height: var(--height);
    padding: var(--paddingTop) var(--paddingRight) var(--paddingBottom)
      var(--paddingLeft);
    border-radius: var(--borderRadius);
    background-color: #292929;
    box-shadow: var(--border);

    font: normal normal normal 16px/24px Roboto;
    letter-spacing: 0.13px;
    color: #ffffff;

    color-scheme: dark;

    :hover {
      box-shadow: var(--borderHover);
      background-color: #383838;
    }

    :focus {
      outline: none;
      box-shadow: var(--borderFocus);
      background-color: #383838;
    }

    :disabled {
      cursor: not-allowed;
      box-shadow: var(--border);
      color: #515151;
    }
  }

  input:-internal-autofill-selected {
    /* color: #ffffff !important; */
    /* background-image: none !important; */
    /* background-color: #292929 !important; */
  }

  label {
    pointer-events: none;
    position: absolute;
    left: var(--paddingLeft);
    top: 16px;
    transition: var(--transition);

    font: normal normal normal 16px/24px Roboto;
    letter-spacing: 0.13px;
    color: #a9a9a9;
  }

  .Input_icon {
    pointer-events: none;
    position: absolute;
    top: 16px;
    left: 17px;
    width: 24px;
    min-width: 24px;
    height: 24px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .Input_iconError {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 6px;
    height: var(--height);
    border-radius: 2px;
    background-color: var(--colorError);
  }

  input:hover ~ label {
    color: #ffffff;
  }
  input:focus ~ label {
    color: var(--colorFocus);
  }
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: 7px;

    font: normal normal normal 14px/16px Roboto;
  }
  input.isError {
    box-shadow: var(--borderError);
  }
  input.isError ~ label {
    color: var(--colorError) !important;
  }
  input:disabled ~ label {
    color: #515151;
  }
`;
