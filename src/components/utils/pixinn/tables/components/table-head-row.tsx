/* eslint-disable react/no-array-index-key */
import { omit } from '@utilsFn/omit';
import React from 'react';

export const TableHeadRow = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >
) => {
  return <tr {...omit(props, 'children')}>{props?.children}</tr>;
};
