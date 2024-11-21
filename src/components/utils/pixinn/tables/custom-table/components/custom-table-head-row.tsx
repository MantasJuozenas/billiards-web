/* eslint-disable react/no-array-index-key */
import React from 'react';

import { TableHeadRow } from '../../components/table-head-row';
import { NCustomTable } from '../custom-table';
import { CustomTableHeadCell } from './custom-table-head-cell';

export const CustomTableHeadRow = (props: NCustomTableHeadRow.IProps) => {
  const { headRow } = props;

  return (
    <TableHeadRow>
      {headRow?.map((headCell, i) => {
        return <CustomTableHeadCell key={i} headCell={headCell} />;
      })}
    </TableHeadRow>
  );
};

export namespace NCustomTableHeadRow {
  export interface IProps {
    headRow: NCustomTable.TTableHeadCellDataProps;
  }
}
