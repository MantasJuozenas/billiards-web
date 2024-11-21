/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import { Loaders } from '@components/utils/loaders';
import { HandlerUpdateTheadData } from '@utilsFn/handler-update-thead-data';
import { joinClasses } from '@utilsFn/join-classes';
import { noop } from '@utilsFn/noop';
import React from 'react';
import styled from 'styled-components';

import { InputSearch } from '../../inputs/input-search';
import { Paginator } from '../../paginator';
import { Table } from '../components/table';
import { TableBody } from '../components/table-body';
import { TableBodyCell } from '../components/table-body-cell';
import { TableBodyRow } from '../components/table-body-row';
import { TableHead } from '../components/table-head';
import { PixinnTableBodyRow } from './components/pixinn-table-body-row';
import { PixinnTableHeadRow } from './components/pixinn-table-head-row';
import { TableColumnFilter } from './components/table-column-filter';

// eslint-disable-next-line no-warning-comments
// TODO Uncomment with querry filtering (check scaners project)
// import { useQuery } from '@apollo/client';
// import { GetFiltersColumnsHideGqlQuery } from '@store/modules/filters-columns-hide/query';
// import { EFiltersColumnsHideSystemId } from '@typings/gql/enum-schema';
// import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';

export const PixinnTable = <T extends {}>(props: NPixinnTable.IProps<T>) => {
  const {
    theadMainRowIndex = 0,
    tableTitle,
    tableName = '',
    theadData = [[]],
    tbodyData,
    tableWidth = 'full_width',
    tableHeight = '',
    // tableMaxHeight = '',
    showTablePager = true,
    showTableTop = true,
    // eslint-disable-next-line no-warning-comments
    // TODO Change to true with querry filtering
    saveUserFilters = false
  } = props;

  // eslint-disable-next-line no-warning-comments
  // TODO Uncomment with querry filtering
  //   const router = useRouter();

  const refTableWrapper = React.useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line prettier/prettier
  const [tableHead, setTableHead] = React.useState<NPixinnTable.ITableProps<T>['theadData']>([]);

  // eslint-disable-next-line no-warning-comments
  // TODO Uncomment with querry filtering
  //   const { loggedInUser } = useSelector((s) => s.auth);

  const [firstLoad, setFirstLoad] = React.useState(true);

  const isRowClickable = props?.onTableCellClick ? 'cell_is_clickable' : '';

  const classNames = [tableWidth, isRowClickable];
  const classNameTableTopDiv = `table_${tableName}_tableTopDiv`;
  const classNameFilterDiv = `table_${tableName}_filtersDiv`;
  const classNameSearchDiv = `table_${tableName}_searchDiv`;
  const classNameColumnFilterDiv = `table_${tableName}_columnFilterDiv`;
  const classNameCustomTableContainer = `table_${tableName}_customContainer`;
  const classNameTableCard = `table_${tableName}_card`;
  const classNameTableWrapper = `table_${tableName}_wrapper`;
  const classNameTable = `table_${tableName}`;
  const classNamePagerDiv = `table_${tableName}_pagerDiv`;
  const classNameNoPagerDiv = `table_${tableName}_noPagerDiv`;

  // eslint-disable-next-line no-warning-comments
  // TODO Uncomment with querry filtering
  //   const { data: dataFilterColumns, loading: loadingFilterColumns } = useQuery<
  //     GQL_gen.Queries.GetFiltersColumnsHideGqlQuery,
  //     GQL_gen.Queries.GetFiltersColumnsHideGqlQueryVariables
  //   >(GetFiltersColumnsHideGqlQuery, {
  //     variables: {
  //       where: {
  //         user_id: { _eq: loggedInUser?.id || 0 },
  //         page_url: { _eq: router?.pathname },
  //         system_id: { _eq: EFiltersColumnsHideSystemId.management },
  //         name: { _eq: tableName }
  //       }
  //     },
  //     notifyOnNetworkStatusChange: true,
  //     fetchPolicy: 'no-cache'
  //   });

  const handlerSetTableHead = () => {
    if (theadData?.length && !firstLoad) {
      setTableHead(() =>
        HandlerUpdateTheadData({
          saveUserFilters,
          theadMainRowIndex,
          theadData,
          // eslint-disable-next-line no-warning-comments
          // TODO Uncomment with querry filtering
          //   FiltersColumnsHide: dataFilterColumns?.FiltersColumnsHide,
          FiltersColumnsHide: [],
          tableHead: tableHead || []
        })
      );
    }
  };

  React.useEffect(() => {
    handlerSetTableHead();
  }, [theadData, firstLoad]);

  React.useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, []);
  // eslint-disable-next-line no-warning-comments
  // TODO Uncomment with querry filtering
  // React.useEffect(() => {
  //   if (!loadingFilterColumns && firstLoad) {
  //     setFirstLoad(false);
  //   }
  // }, [loadingFilterColumns]);

  return (
    <ContainerCustomTable
      className={joinClasses(classNameCustomTableContainer, ...classNames)}
      classNameTableTopDiv={classNameTableTopDiv}
      classNameFilterDiv={classNameFilterDiv}
      classNameSearchDiv={classNameSearchDiv}
      classNameColumnFilterDiv={classNameColumnFilterDiv}
      classNameTableCard={classNameTableCard}
      classNameTableWrapper={classNameTableWrapper}
      classNameTable={classNameTable}
      classNamePagerDiv={classNamePagerDiv}
      classNameNoPagerDiv={classNameNoPagerDiv}
      tableHeight={tableHeight}
      // tableMaxHeight={tableMaxHeight}
    >
      {showTableTop ? (
        <>
          {props?.customTableTop ? (
            props?.customTableTop
          ) : (
            <div className={joinClasses(classNameTableTopDiv, ...classNames)}>
              {props?.customTableTopDivTop}

              <div className={joinClasses(classNameFilterDiv, ...classNames)}>
                {props?.customTableFiltersBeforeTitle}

                {!tableTitle ? null : <h2>{tableTitle}</h2>}

                {!props?.isSearchable ? null : (
                  <div
                    className={joinClasses(classNameSearchDiv, ...classNames)}
                  >
                    <InputSearch
                      value={props?.tableSearchValue || ''}
                      onChange={(e) => {
                        const value = e?.target?.value;
                        props?.tableOnSearchValueChange?.(value);
                      }}
                    />
                  </div>
                )}

                {props?.customTableFilters}

                {props?.showColumnFilter ? (
                  <div
                    className={joinClasses(
                      classNameColumnFilterDiv,
                      ...classNames
                    )}
                  >
                    <TableColumnFilter
                      saveUserFilters={saveUserFilters}
                      theadMainRowIndex={theadMainRowIndex}
                      tableName={tableName}
                      tableHead={tableHead}
                      selectedColumnIndex={(index) => {
                        const copyTableHead = [...(tableHead || [])];
                        const newTableHead = copyTableHead?.[
                          theadMainRowIndex
                        ]?.map((column, i) => {
                          if (index === i) {
                            if (column?.display === 'show') {
                              return { ...column, display: 'hide' as any };
                            }
                            if (column?.display === 'hide') {
                              return { ...column, display: 'show' as any };
                            }
                          }
                          return column;
                        });

                        copyTableHead[theadMainRowIndex] = newTableHead;
                        setTableHead(() => copyTableHead);
                      }}
                    />
                  </div>
                ) : null}
              </div>

              {props?.customTableTopDivBottom}
            </div>
          )}
        </>
      ) : null}

      <div className={joinClasses(classNameTableCard, ...classNames)}>
        <div
          ref={refTableWrapper}
          className={joinClasses(classNameTableWrapper, ...classNames)}
        >
          <Table className={joinClasses(classNameTable, ...classNames)}>
            <TableHead>
              {tableHead?.map((headRow, index) => {
                return <PixinnTableHeadRow key={index} headRow={headRow} />;
              })}
            </TableHead>

            <TableBody>
              {!props?.isLoading ? (
                tbodyData?.map((bodyRow, index) => {
                  return (
                    <PixinnTableBodyRow
                      key={index}
                      classNames={classNames}
                      isLoadingNewData={props?.isLoadingNewData}
                      loadMore={props?.loadMore}
                      onLoadMoreCallBack={props?.onLoadMoreCallBack}
                      tableHead={tableHead || []}
                      theadMainRowIndex={theadMainRowIndex}
                      bodyRow={bodyRow}
                      bodyRowIndex={index}
                      bodyRowsLength={tbodyData?.length}
                      onTableCellClick={props?.onTableCellClick}
                    />
                  );
                })
              ) : (
                <TableBodyRow>
                  <TableBodyCell
                    colSpan={(theadData?.[theadMainRowIndex]?.length || 0) + 10}
                  >
                    <Loaders isLoading />
                  </TableBodyCell>
                </TableBodyRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showTablePager ? (
        <div className={joinClasses(classNamePagerDiv, ...classNames)}>
          <Paginator
            page={props?.page || 0}
            pageSize={props?.pageSize || 0}
            totalCount={props?.totalCount || 0}
            onChange={props?.onPageChange || noop}
          />
        </div>
      ) : (
        <div className={joinClasses(classNameNoPagerDiv, ...classNames)} />
      )}
    </ContainerCustomTable>
  );
};

export namespace NPixinnTable {
  export interface ITableHeadCellProps {
    name: string;
    customComponent?: React.ReactNode;
    display: 'show' | 'hide' | 'exclude';
  }
  export type TTableHeadCellDataProps = ITableHeadCellProps[];
  export type TTableHeadRowDataProps = TTableHeadCellDataProps[];
  export type TTableBodyRowDataProps<T extends {}> = {
    [K in keyof T]: React.ReactNode;
  } & {
    rowColor?: TRowColors;
    isExpanded?: boolean;
    expandableComponent?: React.ReactNode;
  };

  export type TRowColors = 'blue' | 'green' | 'orange' | 'grey';

  export interface ITableProps<T> {
    isLoading?: boolean;
    tableTitle?: string;
    tableName: string;
    showTableTop?: boolean;
    isSearchable?: boolean;
    tableSearchValue?: string;
    tableOnSearchValueChange?: (value: string) => void;
    showColumnFilter?: boolean;
    customTableTop?: React.ReactNode;
    customTableTopDivTop?: React.ReactNode;
    customTableTopDivBottom?: React.ReactNode;
    customTableFiltersBeforeTitle?: React.ReactNode;
    customTableFilters?: React.ReactNode;
    tableWidth?: 'fit_content' | 'full_width';
    tableHeight?: string;
    // tableMaxHeight?: string;
    onTableCellClick?: (
      bodyCellName: keyof TTableBodyRowDataProps<T>,
      cellData: any,
      rowData: TTableBodyRowDataProps<T>
    ) => void;
    theadData?: TTableHeadRowDataProps;
    theadMainRowIndex?: number;
    tbodyData: Array<TTableBodyRowDataProps<T>>;
    showTablePager?: boolean;
    page?: number;
    pageSize?: number;
    totalCount?: number;
    onPageChange?: (_page: number) => void;
    isLoadingNewData?: boolean;
    loadMore?: boolean;
    onLoadMoreCallBack?: () => void;
    showingTableColumnLength?: (columnLength: number) => void;
    saveUserFilters?: boolean;
  }

  export interface IStyle {
    classNameTableTopDiv: string;
    classNameFilterDiv: string;
    classNameSearchDiv: string;
    classNameColumnFilterDiv: string;
    classNameTableWrapper: string;
    classNameTableCard: string;
    classNameTable: string;
    classNamePagerDiv: string;
    classNameNoPagerDiv: string;
    tableHeight: string;
    // tableMaxHeight: string;
  }

  export type IProps<T> = ITableProps<T>;
}

// hack 1
// Edit: one thing you might want to note, if you want to apply a padding to the div in the td, you must add box-sizing: border-box; because of height: 100%.
// table { height: 1px; } /* Will be ignored, don't worry. */
// tr { height: 100%; }
// td { height: 100%; }
// td > div { height: 100%; }
// hack 2
// tr { height: 1px; }
// td { height: inherit; }
// td > div { height: 100%; }

// eslint-disable-next-line prettier/prettier
export const ContainerCustomTable = styled.div<NPixinnTable.IStyle>`
  --tableBorderColor: ${({ theme }) => theme.colors.black000};
  --tablePadding: 10px;

  display: flex;
  flex-direction: column;
  overflow: auto;
  box-shadow: 0px 3px 6px #00000029;

  .${(props) => props?.classNameTableTopDiv} {
    /* overflow: auto; */
    display: flex;
    flex-direction: column;
    padding: var(--tablePadding) var(--tablePadding) 0 var(--tablePadding);
  }

  .${(props) => props?.classNameFilterDiv} {
    display: flex;
    align-items: flex-end;
    margin: 0 0 20px 0;
    > h2 {
      margin: 0 50px 0 0;
      font-family: 'Segoe UI Bold', sans-serif;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 20px;
    }
  }

  .${(props) => props?.classNameSearchDiv} {
    min-width: 100px;
    width: 310px;
    max-width: 310px;
    margin: 0 20px 0 0;
  }

  .${(props) => props?.classNameColumnFilterDiv} {
    margin-left: auto;
  }

  .${(props) => props?.classNameTableCard} {
    overflow: auto;
    background-color: ${({ theme }) => theme.colors.whiteFFF};
    margin: 0 var(--tablePadding);
    border: 1px solid var(--tableBorderColor);
    &.fit_content {
      width: fit-content;
    }
    ::-webkit-scrollbar {
      height: 10px;
      width: 10px;
    }
  }

  .${(props) => props?.classNameTableWrapper} {
    /* overflow: auto;
    height: 333px; */
  }

  .${(props) => props?.classNameTable} {
    height: 1px;
    width: 100%;
    overflow: auto;
    border-collapse: separate; /* Don't collapse */
    border-spacing: 0;
    thead {
      tr {
        position: sticky;
        top: 0px;
        z-index: 1;
        th {
          background-color: ${({ theme }) => theme.colors.greyECE};
          border-right: 1px solid var(--tableBorderColor);
          border-bottom: 1px solid var(--tableBorderColor);
          padding: 5px 7px;
          font-family: 'Segoe UI Semibold', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0px;
          :last-child {
            border-right: none;
          }
        }
      }
    }
    tbody {
      tr {
        height: 100%;
        td {
          height: 100%;
          text-align: center;
          padding: 5px 7px;
          border-right: 1px solid var(--tableBorderColor);
          padding: 5px 7px;
          font-family: 'Segoe UI Light', sans-serif;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0px;
          :last-child {
            border-right: none;
          }
        }
        :hover {
          background-color: ${({ theme }) => theme.colors.greyE4E};
        }
        ${(props) => props?.color}
        :nth-child(2n) {
          background-color: ${({ theme }) => theme.colors.greyF3F};
          :hover {
            background-color: ${({ theme }) => theme.colors.greyE4E};
          }
        }
        :last-child {
          td {
            /* border-bottom: 1px solid var(--tableBorderColor); */
          }
        }
        &.orange {
          background-color: ${({ theme }) => theme.colors.orangeEFB};
          :hover {
            background-color: ${({ theme }) => theme.colors.yellowEBD};
          }
        }
        &.greyC9C {
          background-color: ${({ theme }) => theme.colors.greyC9C};
          :hover {
            background-color: ${({ theme }) => theme.colors.grey7B7};
          }
        }
        &.black00 {
          background-color: ${({ theme }) => theme.colors.black000};
          :hover {
            background-color: ${({ theme }) => theme.colors.grey7B7};
          }
        }
        &.whiteFFF {
          background-color: ${({ theme }) => theme.colors.whiteFFF};
          :hover {
            background-color: ${({ theme }) => theme.colors.greyF3F};
          }
        }
      }
    }
  }

  .${(props) => props.classNamePagerDiv} {
    z-index: 1;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    background-color: ${({ theme }) => theme.colors.whiteFFF};
  }
  .${(props) => props.classNameNoPagerDiv} {
    height: var(--tablePadding);
  }
`;
