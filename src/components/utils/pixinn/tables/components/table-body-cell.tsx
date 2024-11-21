import { omit } from '@utilsFn/omit';
import React from 'react';

export const TableBodyCell = (
  props: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) => {
  return <td {...omit(props, 'children')}>{props?.children}</td>;
};
