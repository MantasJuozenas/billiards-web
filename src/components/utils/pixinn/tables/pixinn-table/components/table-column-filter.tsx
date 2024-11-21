/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import { useOutsideClick } from '@components/utils/outside-click';
import { CustomIconButton } from '@components/utils/pixinn/buttons/custom-icon-button';
import { InputCheckbox } from '@components/utils/pixinn/inputs/input-checkbox';
import { SVGIconList } from '@styles/global-icons/icons/svg-icon-list';
import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled from 'styled-components';

import { NPixinnTable } from '../pixinn-table';

// eslint-disable-next-line no-warning-comments
// TODO Uncomment with querry filtering
// import { useApolloClient } from '@apollo/client';
// import { EFiltersColumnsHideSystemId } from '@typings/gql/enum-schema';
// import { useRouter } from 'next/router';
// import * as Q from '@store/modules/filters-columns-hide/query';

export const TableColumnFilter = (props: NTableColumnFilter.IProps) => {
  const { theadMainRowIndex, tableName, tableHead } = props;
  const { screenWidth } = useSelector((s) => s.device);

  // eslint-disable-next-line no-warning-comments
  // TODO Uncomment with querry filtering
  // const router = useRouter();
  // const client = useApolloClient();
  // const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  const refTableColumnFilterDiv = React.useRef<HTMLDivElement>(null);
  const [showColumnFilter, setShowColumnFilter] = React.useState(false);

  const classNameTableColumnFilterInner = `Table_${tableName}_ColumnFilter_inner`;
  const classNameTableFiltersDiv = `Table_${tableName}_filtersDiv`;

  const handlerCloseOnOutsideClick = () => {
    setShowColumnFilter(() => false);
  };

  // eslint-disable-next-line no-warning-comments
  // TODO Uncomment with querry filtering
  // const handlerOnViewColumnsChange = async (
  //   columnDisplay: string,
  //   columnField: string
  // ) => {
  //   await Q.AddOrDeleteFilterColumnHideGqlQuery({
  //     client,
  //     mutationData: {
  //       action: columnDisplay,
  //       user_id: loggedInUser?.id,
  //       field_name: columnField,
  //       page_url: router?.pathname,
  //       system_id: EFiltersColumnsHideSystemId.management,
  //       name: tableName || ''
  //     },
  //     refetchQueries: ['GetFiltersColumnsHideGqlQuery']
  //   });
  // };

  const handlerSetMenuPosition = () => {
    if (showColumnFilter) {
      const docInner: HTMLElement | null = document.querySelector(
        `.${classNameTableColumnFilterInner}`
      );
      const docFilters: HTMLElement | null = document.querySelector(
        `.${classNameTableFiltersDiv}`
      );
      if (docInner && docFilters) {
        const docInnerTop = docInner?.getBoundingClientRect?.()?.top;
        const docInnerLeft = docInner?.getBoundingClientRect?.()?.left;
        const docFiltersRight = screenWidth - docInnerLeft;
        docFilters.style.top = `${docInnerTop}px`;
        docFilters.style.right = `${docFiltersRight}px`;
        docFilters.style.display = 'flex';
      }
    }
  };

  React.useEffect(() => {
    handlerSetMenuPosition();
  }, [showColumnFilter]);

  useOutsideClick.H(refTableColumnFilterDiv, handlerCloseOnOutsideClick);

  return (
    <ContainerTableColumnFilter
      ref={refTableColumnFilterDiv}
      classNameTableColumnFilterInner={classNameTableColumnFilterInner}
      classNameTableFiltersDiv={classNameTableFiltersDiv}
    >
      <div className={classNameTableColumnFilterInner}>
        <CustomIconButton
          onClick={() => {
            setShowColumnFilter(() => !showColumnFilter);
          }}
        >
          <SVGIconList />
        </CustomIconButton>

        {!showColumnFilter ? null : (
          <div className={classNameTableFiltersDiv}>
            {tableHead?.[theadMainRowIndex]?.map((column, index) => {
              // @ts-ignore
              const isCustomTh = column?.customComponent?.type === 'th';

              if (column?.display !== 'exclude' && column?.name) {
                return (
                  <div key={index} className="table_filter">
                    <InputCheckbox
                      checked={column?.display === 'show'}
                      onChange={() => {
                        props?.selectedColumnIndex?.(index, column);
                        // if (props?.saveUserFilters) {
                        //   handlerOnViewColumnsChange(
                        //     column?.display,
                        //     column?.name
                        //   );
                        // }
                      }}
                    />
                    {isCustomTh
                      ? // eslint-disable-next-line no-inline-comments
                        // @ts-ignore
                        column?.customComponent?.props?.children
                      : column?.customComponent || column?.name}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </ContainerTableColumnFilter>
  );
};

export namespace NTableColumnFilter {
  export interface IProps {
    // eslint-disable-next-line no-warning-comments
    // TODO Uncomment with querry filtering
    // eslint-disable-next-line react/no-unused-prop-types
    saveUserFilters: boolean;
    theadMainRowIndex: number;
    tableName: string;
    tableHead?: NPixinnTable.TTableHeadRowDataProps;
    // eslint-disable-next-line react/no-unused-prop-types
    selectedColumnIndex?: (
      index: number,
      columName: NPixinnTable.ITableHeadCellProps
    ) => void;
  }
}

interface IStyle {
  classNameTableColumnFilterInner: string;
  classNameTableFiltersDiv: string;
}

const ContainerTableColumnFilter = styled.div<IStyle>`
  position: static;
  .${(props) => props?.classNameTableColumnFilterInner} {
    position: static;
  }
  .${(props) => props?.classNameTableFiltersDiv} {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.greyF3F};
    border-radius: 3px;
    padding: 0px 15px;
  }
  .table_filter {
    display: flex;
    align-items: center;
    margin: 5px 0;
    white-space: nowrap;
    > label {
      margin: 0 10px 0 0;
    }
    > div {
      display: flex;
      flex-direction: row;
      > svg {
        margin: 0 5px 0 0;
      }
      &.tooltip {
        display: flex;
        align-items: center;
        > div {
          height: 16px;
          width: 16px;
          margin: 0 5px 0 0;
        }
        > span {
          display: flex;
        }
      }
    }
  }
`;
