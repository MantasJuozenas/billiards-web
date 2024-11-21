/* eslint-disable react/no-array-index-key */
import { omit } from '@utilsFn/omit';
import React from 'react';

export const TableBodyRow = React.forwardRef(
  (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableRowElement>,
      HTMLTableRowElement
    >,
    ref: React.ForwardedRef<HTMLTableRowElement>
  ) => {
    return (
      <tr {...omit(props, 'children', 'ref')} ref={ref}>
        {props?.children}
      </tr>
    );
  }
);
