import { ErrorInput } from '@components/utils/shared/error-input';
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
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

export const InputTextarea = (props: NInputTextarea.IProps) => {
  const id = React.useMemo(() => props?.textarea?.id ?? 'id_InputTextarea', []);

  const msgError = props?.msgError || '';
  const icon = props?.icon || null;

  const classNames = [
    msgError ? 'isError' : '',
    icon ? 'withIcon' : ''
  ]?.filter?.((v) => v);

  return (
    <ContainerInputTextarea className={joinClasses(``, ...classNames)}>
      <textarea
        {...omit(props?.textarea, 'placeholder', 'className')}
        placeholder=" "
        id={id}
        className={joinClasses(props?.textarea?.className || '', ...classNames)}
      />

      <label htmlFor={id}>{props?.textarea?.placeholder || ''}</label>

      {icon ? <div className="InputTextarea_icon">{icon}</div> : null}

      {msgError ? <div className="InputTextarea_iconError" /> : null}

      <ErrorInput msgError={msgError} />
    </ContainerInputTextarea>
  );
};

export namespace NInputTextarea {
  export type TInput = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;

  export interface IProps {
    textarea: TInput;
    msgError?: React.ReactNode;
    icon?: React.ReactNode;
  }
}

const ContainerInputTextarea = styled.div`
  /* box-shadow: 0 1px 0 0 red; /* Border top  */
  /* box-shadow: 0 -1px 0 0 red; /* Border bottom  */
  /* box-shadow: -1px 0 0 0 red; /* Border right  */
  /* box-shadow: 1px 0 0 0 red; /* Border left  */
  /* box-shadow: 0 0 0 1px red; /* All the borders by using the spread properties  */
  --height: 90px;
  --paddingTop: 28px;
  --paddingRight: 15px;
  --paddingBottom: 7px;
  --paddingLeft: 15px;
  --colorFocus: #a9a9a9;
  --colorError: #df0303;
  --borderRadius: 4px;
  /* --border: inset 0 0 0 0px #292929; */
  /* --borderHover: inset 0 0 0 1px #ff0055; */
  /* --borderFocus: inset 0 0 0 1px #ff0055; */
  --border: 1px solid #292929;
  --borderHover: 1px solid #ff0055;
  --borderFocus: 1px solid #ff0055;
  --borderError: 1px solid transparent;
  --transition: 0.4s ease all;

  &.withIcon {
    --paddingLeft: 51px;
  }

  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;

  textarea {
    -webkit-appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
    transition: var(--transition);
    resize: none;
  }
  textarea::-webkit-outer-spin-button,
  textarea::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  textarea {
    height: var(--height);
    padding: var(--paddingTop) var(--paddingRight) var(--paddingBottom)
      var(--paddingLeft);
    border-radius: var(--borderRadius);
    background-color: #292929;
    border: var(--border);

    font: normal normal normal 16px/24px Roboto;
    letter-spacing: 0.13px;
    color: #ffffff;

    color-scheme: dark;

    :hover {
      border: var(--borderHover);
      background-color: #383838;
    }

    :focus {
      outline: none;
      border: var(--borderFocus);
      background-color: #383838;
    }

    :disabled {
      cursor: not-allowed;
      border: var(--border);
      color: #515151;
    }
  }

  textarea:-internal-autofill-selected {
    /* color: #ffffff !important; */
    /* background-image: none !important; */
    /* background-color: #292929 !important; */
  }

  label {
    pointer-events: none;
    position: absolute;
    left: var(--paddingLeft);
    top: 16px;
    width: calc(100% - var(--paddingLeft) - var(--paddingRight));
    transition: var(--transition);
    background-color: #292929;

    font: normal normal normal 16px/24px Roboto;
    letter-spacing: 0.13px;
    color: #a9a9a9;

    ::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 0;
      width: 100%;
      height: 7px;
      background-color: inherit;
    }
  }

  .InputTextarea_icon {
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

  .InputTextarea_iconError {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 6px;
    height: var(--height);
    border-radius: 2px;
    background-color: var(--colorError);
  }

  textarea:hover ~ label {
    color: #ffffff;
    background-color: inherit;

    ::before {
      background-color: inherit;
    }
  }
  textarea:focus ~ label {
    color: var(--colorFocus);
    background-color: #383838;

    ::before {
      background-color: #383838;
    }
  }
  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label {
    top: 7px;

    font: normal normal normal 14px/16px Roboto;
  }
  textarea.isError {
    border: var(--borderError);
  }
  textarea.isError ~ label {
    color: var(--colorError) !important;
  }
  textarea:disabled ~ label {
    color: #515151;
  }
`;
