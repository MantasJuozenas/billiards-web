/* eslint-disable react/no-array-index-key */
import { joinClasses } from '@utilsFn/join-classes';
import { omit } from '@utilsFn/omit';
import React from 'react';

import { TableBodyRow } from '../../components/table-body-row';
import { NPixinnTable } from '../pixinn-table';
import { PixinnTableBodyCell } from './pixinn-table-body-cell';

export const PixinnTableBodyRow = <T extends {}>(
  props: NPixinnTableBodyRow.IProps<T>
): JSX.Element => {
  const {
    isLoadingNewData,
    loadMore,
    onLoadMoreCallBack,
    bodyRow,
    bodyRowsLength,
    bodyRowIndex
  } = props;

  const refTableBodyRow = React.useRef<IntersectionObserver>();

  const tableRowCellsArr: string[] = Object.keys(
    omit(bodyRow, 'rowColor', 'isExpanded', 'expandableComponent')
  );

  const rowColor = (bodyRow?.rowColor as string) || '';
  const isExpanded =
    bodyRow?.isExpanded && bodyRow?.expandableComponent ? 'isExpanded' : '';
  const rowClassNames = [
    `table_body_row_${bodyRowIndex}`,
    rowColor,
    isExpanded
  ];

  const lastTableBodyRowRef = React.useCallback(
    (node: any) => {
      if (isLoadingNewData) return;
      // eslint-disable-next-line prettier/prettier
      if (refTableBodyRow?.current) refTableBodyRow?.current?.disconnect?.();
      // @ts-ignore
      refTableBodyRow.current = new IntersectionObserver((entries) => {
        if (entries?.[0]?.isIntersecting && loadMore && onLoadMoreCallBack) {
          node?.current?.disconnect?.();
          onLoadMoreCallBack?.();
        }
      });
      // eslint-disable-next-line prettier/prettier
      if (node) refTableBodyRow?.current?.observe?.(node);
      return node;
    },
    [isLoadingNewData, loadMore]
  );

  const isLastElement = bodyRowsLength === bodyRowIndex + 1;

  if (isLastElement && onLoadMoreCallBack) {
    // console.log('props', props);
    if (bodyRow?.isExpanded && bodyRow?.expandableComponent) {
      return (
        <>
          <TableBodyRow
            ref={lastTableBodyRowRef}
            className={joinClasses(...rowClassNames)}
          >
            {tableRowCellsArr?.map((bodyCell, i) => {
              return (
                <PixinnTableBodyCell
                  key={i}
                  index={i}
                  bodyCell={bodyCell}
                  {...props}
                />
              );
            })}
          </TableBodyRow>
          {bodyRow?.expandableComponent}
        </>
      );
    }

    return (
      <TableBodyRow
        ref={lastTableBodyRowRef}
        className={joinClasses(...rowClassNames)}
      >
        {tableRowCellsArr?.map((bodyCell, i) => {
          return (
            <PixinnTableBodyCell
              key={i}
              index={i}
              bodyCell={bodyCell}
              {...props}
            />
          );
        })}
      </TableBodyRow>
    );
  }

  if (bodyRow?.isExpanded && bodyRow?.expandableComponent) {
    return (
      <>
        <TableBodyRow className={joinClasses(...rowClassNames)}>
          {tableRowCellsArr?.map((bodyCell, i) => {
            return (
              <PixinnTableBodyCell
                key={i}
                index={i}
                bodyCell={bodyCell}
                {...props}
              />
            );
          })}
        </TableBodyRow>
        {bodyRow?.expandableComponent}
      </>
    );
  }

  return (
    <TableBodyRow className={joinClasses(...rowClassNames)}>
      {tableRowCellsArr?.map((bodyCell, i) => {
        return (
          <PixinnTableBodyCell
            key={i}
            index={i}
            bodyCell={bodyCell}
            {...props}
          />
        );
      })}
    </TableBodyRow>
  );
};

export namespace NPixinnTableBodyRow {
  export interface IProps<T> {
    classNames: string[];
    isLoadingNewData?: boolean;
    loadMore?: boolean;
    onLoadMoreCallBack?: () => void;
    tableHead: NPixinnTable.TTableHeadRowDataProps;
    theadMainRowIndex?: number;
    bodyRow: NPixinnTable.TTableBodyRowDataProps<T>;
    bodyRowIndex: number;
    bodyRowsLength: number;
    onTableCellClick: NPixinnTable.ITableProps<T>['onTableCellClick'];
  }
}
