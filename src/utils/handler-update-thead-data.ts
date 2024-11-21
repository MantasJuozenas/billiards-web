import { NCustomTable } from '@components/utils/pixinn/tables/custom-table/custom-table';

export const HandlerUpdateTheadData = (
  props: NHandlerUpdateTheadData.IProps
) => {
  const {
    theadMainRowIndex = 0,
    theadData = [[]],
    //  eslint-disable-next-line no-warning-comments
    // TODO Uncomment with querry filtering
    // FiltersColumnsHide = [],
    tableHead = [[]]
  } = props;
  if (props?.saveUserFilters) {
    //  eslint-disable-next-line no-warning-comments
    // TODO Uncomment with querry filtering
    // if (theadData?.[theadMainRowIndex]?.length && FiltersColumnsHide?.length) {
    //   const newTheadData = theadData?.[theadMainRowIndex]?.map((item) => {
    //     // eslint-disable-next-line prettier/prettier
    //     const ifItemInFiltersColumnsHide = !!FiltersColumnsHide?.find((itemm) => itemm?.field_name === item?.name)
    //     if (ifItemInFiltersColumnsHide) {
    //       return { ...item, display: 'hide' as any };
    //     }
    //     return item;
    //   });

    //   theadData[theadMainRowIndex] = newTheadData;
    //   return theadData;
    // }
    return theadData;
  }

  if (
    theadData?.[theadMainRowIndex]?.length &&
    tableHead?.[theadMainRowIndex]?.length
  ) {
    const newTheadData = theadData?.[theadMainRowIndex]?.map((item, i) => {
      return {
        ...item,
        display: tableHead?.[theadMainRowIndex]?.[i]?.display || item?.display
      };
    });

    theadData[theadMainRowIndex] = newTheadData;
    return theadData;
  }

  return theadData;
};

export namespace NHandlerUpdateTheadData {
  export interface IProps {
    saveUserFilters: boolean;
    theadMainRowIndex?: number;
    theadData: NCustomTable.TTableHeadRowDataProps;
    // eslint-disable-next-line no-warning-comments
    // TODO Uncomment with querry filtering
    //   FiltersColumnsHide: GQL_gen.Queries.GetFiltersColumnsHideGqlQuery['FiltersColumnsHide'];
    FiltersColumnsHide: [];
    tableHead: NCustomTable.TTableHeadRowDataProps;
  }

  export const F = Function;
}
