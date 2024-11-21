export interface IState {
  table: string;
  menuList: {
    whoDidId: number;
    isLoading: boolean;
    groupModifierIds: string[];
    groupModifiers: G.Dictionary<
      GQL_gen.Queries.GetGroupAndProductGqlQuery['group'][0]
    >;
    mainGroupIds: string[];
    mainGroups: G.Dictionary<
      GQL_gen.Queries.GetGroupAndProductGqlQuery['group'][0]
    >;
    parentGroupIds: string[];
    parentGroups: G.Dictionary<
      GQL_gen.Queries.GetGroupAndProductGqlQuery['group'][0]
    >;
    /** id_parentGroup */
    productIds: string[];
    products: G.Dictionary<
      GQL_gen.Queries.GetGroupAndProductGqlQuery['product'][0]
    >;
    /** final data */
    groupIds: string[];
    group: G.Dictionary<{
      hasProducts: boolean;
      parentGroupIds: string[];
      parentGroup: G.Dictionary<{
        hasProducts: boolean;
        /** id_parentGroup */
        productIds: string[];
      }>;
    }>;
  };
}

export const defaultState: IState = {
  table: '',
  menuList: {
    whoDidId: 0,
    isLoading: false,
    groupModifierIds: [],
    groupModifiers: {},
    mainGroupIds: [],
    mainGroups: {},
    parentGroupIds: [],
    parentGroups: {},
    productIds: [],
    products: {},
    groupIds: [],
    group: {}
  }
};
