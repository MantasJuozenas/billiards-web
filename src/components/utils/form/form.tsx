import { omit } from '@utilsFn/omit';
import React from 'react';

export const CustomForm = (props: NCustomForm.IProps) => {
  return (
    <form {...omit(props)} noValidate>
      {props?.children}
    </form>
  );
};

export namespace NCustomForm {
  export type IProps = React.FormHTMLAttributes<HTMLFormElement>;
}
