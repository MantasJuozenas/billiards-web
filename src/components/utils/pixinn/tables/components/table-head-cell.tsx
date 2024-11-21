/* eslint-disable no-undef */
import { omit } from '@utilsFn/omit';
import React from 'react';

export const TableHeadCell = (
  props: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) => {
  return <th {...omit(props, 'children')}>{props?.children}</th>;
};
