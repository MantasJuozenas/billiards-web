/* eslint-disable react/no-array-index-key */
import React from 'react';

import { TableHeadRow } from '../../components/table-head-row';
import { NPixinnTable } from '../pixinn-table';
import { PixinnTableHeadCell } from './pixinn-table-head-cell';

export const PixinnTableHeadRow = (props: NPixinnTableHeadRow.IProps) => {
  const { headRow } = props;

  return (
    <TableHeadRow>
      {headRow?.map((headCell, i) => {
        return <PixinnTableHeadCell key={i} headCell={headCell} />;
      })}
    </TableHeadRow>
  );
};

export namespace NPixinnTableHeadRow {
  export interface IProps {
    headRow: NPixinnTable.TTableHeadCellDataProps;
  }
}
