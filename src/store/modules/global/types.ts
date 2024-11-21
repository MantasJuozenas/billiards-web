export interface IState {
  isAppReady: boolean;
  ApolloClient: {
    mutate: G.TApolloClient['mutate'];
    query: G.TApolloClient['query'];
    resetStore: G.TApolloClient['resetStore'];
    stop: G.TApolloClient['stop'];
  } | null;
}

export const defaultState: IState = {
  isAppReady: false,
  ApolloClient: null
};
