import { omit } from '@utilsFn/omit';
import React from 'react';

export const TableBody = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) => {
  return <tbody {...omit(props, 'children')}>{props?.children}</tbody>;
};
