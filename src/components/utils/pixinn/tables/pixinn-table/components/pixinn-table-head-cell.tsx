import React from 'react';

import { TableHeadCell } from '../../components/table-head-cell';
import { NPixinnTable } from '../pixinn-table';

export const PixinnTableHeadCell = (props: NPixinnTableHeadCell.IProps) => {
  const { headCell } = props;

  if (headCell?.display === 'show') {
    // @ts-ignore
    const isCustomTh = headCell?.customComponent?.type === 'th';
    return (
      <>
        {isCustomTh ? (
          headCell?.customComponent
        ) : (
          <TableHeadCell>
            {headCell?.customComponent || headCell?.name}
          </TableHeadCell>
        )}
      </>
    );
  }
  return null;
};

export namespace NPixinnTableHeadCell {
  export interface IProps {
    headCell: NPixinnTable.ITableHeadCellProps;
  }
}
