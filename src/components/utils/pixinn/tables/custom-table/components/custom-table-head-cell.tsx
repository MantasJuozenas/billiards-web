import React from 'react';

import { TableHeadCell } from '../../components/table-head-cell';
import { NCustomTable } from '../custom-table';

export const CustomTableHeadCell = (props: NCustomTableHeadCell.IProps) => {
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

export namespace NCustomTableHeadCell {
  export interface IProps {
    headCell: NCustomTable.ITableHeadCellProps;
  }
}
