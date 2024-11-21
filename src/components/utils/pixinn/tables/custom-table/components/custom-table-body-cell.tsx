import { joinClasses } from '@utilsFn/join-classes';
import React from 'react';

import { TableBodyCell } from '../../components/table-body-cell';
import { NCustomTable } from '../custom-table';

export const CustomTableBodyCell = <T extends {}>(
  props: NCustomTableBodyCell.IProps<T>
) => {
  const { index, bodyCell, classNames, tableHead, bodyRow } = props;

  const isCustomTd =
    // @ts-ignore
    bodyRow[bodyCell]?.type === 'td' || bodyRow[bodyCell]?.props?.type === 'td';
  if (tableHead?.[props?.theadMainRowIndex || 0]?.[index]?.display === 'show') {
    return (
      <>
        {isCustomTd ? (
          // @ts-ignore
          bodyRow[bodyCell]
        ) : (
          <TableBodyCell
            className={joinClasses(...classNames)}
            onClick={() => {
              if (props?.onTableCellClick) {
                props?.onTableCellClick?.(
                  bodyCell as any,
                  // @ts-ignore
                  bodyRow[bodyCell],
                  bodyRow
                );
              }
            }}
          >
            {/* @ts-ignore */}
            {bodyRow[bodyCell]}
          </TableBodyCell>
        )}
      </>
    );
  }
  return null;
};

export namespace NCustomTableBodyCell {
  export interface IProps<T> {
    index: number;
    bodyCell: string;
    classNames: string[];
    tableHead: NCustomTable.TTableHeadRowDataProps;
    theadMainRowIndex?: number;
    bodyRow: NCustomTable.TTableBodyRowDataProps<
      T & { rowColor?: NCustomTable.TRowColors }
    >;
    onTableCellClick: NCustomTable.ITableProps<T>['onTableCellClick'];
  }
}
