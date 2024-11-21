import { SVGIconArrowRightThin } from '@styles/global-icons/icons/svg-icon-arrow-right-thin';
import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export const Paginator = (props: NPaginator.IProps) => {
  const isMobile = useSelector((s) => s.device.isMobile);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSelect, setPageSelect] = React.useState<G.TSelect | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageOptions, setPageOptions] = React.useState<G.TSelect[]>([]);

  const totalPageCount = Math.ceil(props.totalCount / props.pageSize);

  const NextLabel = (
    <>
      <label>next</label>
      <SVGIconArrowRightThin />
    </>
  );

  const PreviousLabel = (
    <>
      <SVGIconArrowRightThin />
      <label>previous</label>
    </>
  );

  const SelectLabel = (
    <div className="SelectLabel">
      <span>{props.page + 1}</span>
      <label>from</label>
      <span>{totalPageCount || 0}</span>
    </div>
  );

  const handlerOnMobilePageChange = (
    dir?: '+' | '-',
    selectedPage?: number
  ) => {
    if (dir) {
      let newPage =
        dir === '+' ? (props?.page || 0) + 1 : (props?.page || 0) - 1;
      if (newPage >= totalPageCount - 1) newPage = totalPageCount - 1;
      if (newPage < 0) newPage = 0;
      if (newPage !== props?.page) props?.onChange?.(newPage);
    }
    if ((selectedPage || 0) >= 0 && selectedPage !== props?.page)
      props?.onChange?.(selectedPage || 0);
  };

  const handlerSetSelectValues = () => {
    if (totalPageCount) {
      const newPageOptions = Array(totalPageCount)
        .fill(1)
        .map((_v, i) => {
          return { value: i, label: i + 1 };
        });

      setPageOptions(() => newPageOptions);
    }
  };

  const handlerSetPageSelect = () => {
    if (props?.page >= 0) {
      setPageSelect(() => {
        return { value: props?.page, label: SelectLabel };
      });
    } else {
      setPageSelect(() => null);
    }
  };

  React.useEffect(() => {
    handlerSetPageSelect();
  }, [props?.page, totalPageCount]);

  React.useEffect(() => {
    handlerSetSelectValues();
  }, [props?.totalCount]);

  return (
    <ContainerPaginator
      className={`${
        isMobile && props?.showMobilePager ? 'showMobilePager' : ''
      }`}
    >
      {isMobile && props?.showMobilePager ? (
        <div className="Paginator_mobile">
          <div
            className="Paginator_mobile_PreviousLabel"
            onClick={() => {
              handlerOnMobilePageChange('-');
            }}
          >
            {PreviousLabel}
          </div>
          <div className="Paginator_mobile_Select">
            {/* <CustomSelect
                inputSize="height38"
                placeholder="Placeholder"
                menuPlacement="top"
                isSearchable={false}
                value={pageSelect}
                options={pageOptions}
                onChange={(option) => {
                  handlerOnMobilePageChange(undefined, option?.value);
                }}
              /> */}
          </div>
          <div
            className="Paginator_mobile_NextLabel"
            onClick={() => {
              handlerOnMobilePageChange('+');
            }}
          >
            {NextLabel}
          </div>
        </div>
      ) : (
        <ReactPaginate
          containerClassName="pager_div"
          pageClassName="page"
          breakClassName="page_break"
          breakLabel="..."
          previousLabel={PreviousLabel}
          previousClassName="page_previous"
          nextLabel={NextLabel}
          nextClassName="page_next"
          activeClassName="page_active"
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPageCount}
          forcePage={props.page}
          onPageChange={({ selected }) => props.onChange(selected)}
        />
      )}
    </ContainerPaginator>
  );
};

export namespace NPaginator {
  interface IPage {
    /** Zero based page number */
    page: number;
    /** Elements per page */
    pageSize: number;
    /** Total count of elements */
    totalCount: number;
  }
  export interface IProps extends IPage {
    onChange: (_page: number) => void;
    showMobilePager?: boolean;
  }
}

const ContainerPaginator = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  &.showMobilePager {
    height: 31px;
  }
  .pager_div {
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    > li {
      cursor: pointer;
      list-style-type: none;
      :last-child {
        margin: 0;
      }
    }
  }
  .page,
  .page_break,
  .page_next,
  .page_previous {
    height: 100%;
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px 0 0;
    border: 1px solid ${({ theme }) => theme.colors.black282};
    border-radius: 3px;
    > a {
      outline: none;
      font: normal normal normal 14px/19px Segoe UI Regular;
      letter-spacing: 0px;
      color: ${({ theme }) => theme.colors.black282};
      padding: 2px 6px;
    }
  }
  .page_break {
    //
  }
  .page,
  .page_break,
  .page_next,
  .page_previous {
    :hover {
      border-color: ${({ theme }) => theme.colors.black000};
      box-shadow: 0px 3px 6px #00000029;
      > a {
        color: ${({ theme }) => theme.colors.black000};
      }
    }
  }
  .page_active {
    border: 1px solid ${({ theme }) => theme.colors.black000};
    background-color: ${({ theme }) => theme.colors.black000};
    > a {
      color: ${({ theme }) => theme.colors.whiteFFF};
    }
    :hover {
      border: 1px solid ${({ theme }) => theme.colors.black000};
      background-color: ${({ theme }) => theme.colors.black000};
      > a {
        color: ${({ theme }) => theme.colors.whiteFFF};
      }
    }
    :active {
      //
    }
  }
  .page_previous,
  .page_next {
    width: auto;
    border: 1px solid transparent;
    label {
      display: none;
    }
    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 0px;
      > svg {
        height: 10px;
        min-height: 10px;
        width: 20px;
        min-width: 20px;
        path {
          fill: ${({ theme }) => theme.colors.black000};
        }
      }
    }
  }
  .page_previous {
    > a {
      > svg {
        transform: rotate(180deg);
      }
    }
  }
  // mobile
  ${_(media.max.sm)} {
    .Paginator_mobile,
    .Paginator_mobile_PreviousLabel,
    .Paginator_mobile_Select,
    .Paginator_mobile_NextLabel {
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .Paginator_mobile {
      column-gap: 15px;
    }
    .Paginator_mobile_Select {
      width: 100px;
      > div {
        width: 100px;
      }
    }
    .Paginator_mobile_PreviousLabel,
    .Paginator_mobile_NextLabel {
      cursor: pointer;
      * {
        cursor: pointer;
      }
      justify-content: space-between;
      border: 1px solid ${({ theme }) => theme.colors.black000};
      border-radius: 3px;
      padding: 6px 10px;
      font: normal normal normal 14px/19px Segoe UI Regular;
      letter-spacing: 0px;
      color: ${({ theme }) => theme.colors.black000};
      svg {
        height: 10px;
        min-height: 10px;
        width: 5.36px;
        min-width: 5.36px;
        path {
          fill: ${({ theme }) => theme.colors.black000};
        }
      }
    }
    .Paginator_mobile_PreviousLabel {
      svg {
        margin: 0 10px 0 0;
        transform: rotate(180deg);
      }
    }
    .Paginator_mobile_Select {
      /* width: 82px;
      .__control {
        height: 31px !important;
        min-height: 31px !important;
      }
      .__indicator-separator {
        display: none;
      }
      .__dropdown-indicator {
        padding-left: 0 !important;
      }
      .__value-container {
        > div {
          max-width: calc(100% - 0px);
          height: 100%;
          margin: 0;
          padding-bottom: 2px;
          padding-top: 6px;
        }
      } */
    }
    .SelectLabel {
      display: flex;
      align-items: center;
      padding-left: 5px;
      label {
        margin: 0 2px;
        font: normal normal normal 14px/19px Segoe UI Regular;
        letter-spacing: 0px;
        color: ${({ theme }) => theme.colors.aqua29B};
      }
      span {
        font: normal normal normal 14px/19px Segoe UI Regular;
        letter-spacing: 0px;
        color: ${({ theme }) => theme.colors.aqua29B};
      }
    }
    .Paginator_mobile_NextLabel {
      svg {
        margin: 0 0 0 10px;
      }
    }
  }
`;
