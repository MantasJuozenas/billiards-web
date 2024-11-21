import { omit } from '@utilsFn/omit';
import React from 'react';

export const TableHead = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) => {
  return <thead {...omit(props, 'children')}>{props?.children}</thead>;
};
