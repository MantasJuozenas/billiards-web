import { ErrorInput } from '@components/utils/shared/error-input';
import { SVGIconError } from '@styles/global-icons/icons/svg-icon-error';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import { uuid } from '@utilsFn/uuid';
import React from 'react';
import styled from 'styled-components';

/**
 * @example
 * with react-hook-form
 * <div className="FormLogin_r2">
 *   <PixinnInput2
 *     input={{
 *       placeholder: t(`modals-and-forms:::FormLogin::text3`),
 *       type: 'password',
 *       ...register('password')
 *     }}
 *     msgError={errors?.password?.message || ''}
 *   />
 * </div>
 */

export const PixinnInput2 = (props: NPixinnInput2.IProps) => {
  const id = React.useMemo(() => props?.input?.id ?? uuid(), []);

  const msgError = props?.msgError || '';
  const icon = props?.icon || null;

  const classNames = [
    msgError ? 'isError' : '',
    icon ? 'withIcon' : ''
  ]?.filter?.((v) => v);

  return (
    <ContainerPixinnInput2 className={joinClasses(``, ...classNames)}>
      <input
        {...omit(props?.input, 'placeholder', 'className')}
        placeholder=" "
        id={id}
        className={joinClasses(props?.input?.className || '', ...classNames)}
      />

      <label htmlFor={id}>{props?.input?.placeholder || ''}</label>

      {icon ? <div className="PixinnInput2_icon">{icon}</div> : null}

      {msgError ? (
        <div className="PixinnInput2_iconError">
          <SVGIconError />
        </div>
      ) : null}

      <ErrorInput msgError={msgError} />
    </ContainerPixinnInput2>
  );
};

export namespace NPixinnInput2 {
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

const ContainerPixinnInput2 = styled.div`
  /* box-shadow: 0 1px 0 0 red; /* Border top  */
  /* box-shadow: 0 -1px 0 0 red; /* Border bottom  */
  /* box-shadow: -1px 0 0 0 red; /* Border right  */
  /* box-shadow: 1px 0 0 0 red; /* Border left  */
  /* box-shadow: 0 0 0 1px red; /* All the borders by using the spread properties  */
  --height: 56px;
  --paddingTop: 28px;
  --paddingRight: 18px;
  --paddingBottom: 7px;
  --paddingLeft: 18px;
  --colorFocus: #00b8ff;
  --colorError: #ff0000;
  --borderRadius: 4px;
  --border: inset 0 0 0 1px transparent;
  --borderHover: inset 0 0 0 1px #c0ecfd;
  --borderFocus: inset 0 0 0 1px var(--colorFocus);
  --borderError: inset 0 0 0 1px var(--colorError);
  --transition: 0.4s ease all;

  &.withIcon {
    --paddingLeft: 41px;
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
    height: var(--height);
    padding: var(--paddingTop) var(--paddingRight) var(--paddingBottom)
      var(--paddingLeft);
    border-radius: var(--borderRadius);
    background-color: #fafafa;
    box-shadow: var(--border);

    font: normal normal 600 16px/24px Open sans;
    letter-spacing: 0px;
    color: #000000;

    :hover {
      box-shadow: var(--borderHover);
    }

    :focus {
      outline: none;
      box-shadow: var(--borderFocus);
    }

    :disabled {
      cursor: not-allowed;
      background-color: #fafafa;
      box-shadow: var(--border);
    }
  }

  label {
    pointer-events: none;
    position: absolute;
    left: var(--paddingLeft);
    top: 16px;
    transition: var(--transition);

    font: normal normal 400 16px/24px Open sans;
    letter-spacing: 0px;
    color: #767676;
  }

  .PixinnInput2_icon {
    pointer-events: none;
    position: absolute;
    top: 20px;
    left: 16px;
    width: 16px;
    min-width: 16px;
    height: 16px;
    min-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 16px;
    }
  }

  .PixinnInput2_iconError {
    position: absolute;
    top: 20px;
    right: 9px;
    display: flex;
  }

  input:hover ~ label {
    color: #000000;
  }
  input:focus ~ label {
    color: var(--colorFocus);
  }
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: 6px;

    font: normal normal 400 14px/24px Open sans;
  }
  input.isError {
    box-shadow: var(--borderError);
  }
  input:disabled ~ label {
    color: #b3b3b3;
  }
`;
