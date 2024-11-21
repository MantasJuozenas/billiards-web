/* eslint-disable @typescript-eslint/ban-types */
import { GQL_API_URL } from '@constants/app-constants';
import { GetLocaleStorageAuthCookie } from '@store/modules/local-storage/functions/auth-cookie';
// import { getCookies, parseCookies } from '@utilsFn/parse-cookies';
import axios from 'axios';
import { DocumentNode } from 'graphql';
import React from 'react';

import { axiosApolloQueryClientWithRefetch } from './utils/client-with-refetch';
import { getQuerySpecifications } from './utils/get-query-specifications';
import { axiosApolloEmitter } from './utils/refetch-emitter';

/** ************ CLIENTS ************ */

export const GetReqHeaders = (_req?: G.IExtendedRequest) => {
  // const appCookies = req ? JSON.stringify(parseCookies(req)) : getCookies();
  const token = GetLocaleStorageAuthCookie() || '';

  const headers: Record<string, string> = {
    'content-type': 'application/json'
    // 1. JWT authentication is enforced when the X-Hasura-Admin-Secret header is not found in the request.
    // 2. JWT authentication is skipped when the X-Hasura-Admin-Secret header is found in the request and admin access is granted.
  };

  // if (appCookies) headers.cookies = appCookies;
  // 1. The JWT must contain: x-hasura-default-role, x-hasura-allowed-roles in a custom namespace in the claims.
  // 2. Other optional x-hasura-* fields (required as per your defined permissions).
  // 3. You can send x-hasura-role as header in the request to indicate a role.
  // 4. Send the JWT via Authorization: Bearer <JWT> header.
  if (token) headers.authorization = `Bearer ${token}`;
  // if (token && AUTH_COOKIE_NAME) headers[AUTH_COOKIE_NAME] = token;

  return { headers };
};

export const GetClientAxiosApollo = () => {
  return axios.create({
    baseURL: GQL_API_URL,
    withCredentials: true,
    headers: GetReqHeaders().headers
  });
};

export const clientAxiosApollo =
  axiosApolloQueryClientWithRefetch(GetClientAxiosApollo);
export type TClientAxiosApollo = typeof clientAxiosApollo;

/** ************ HOOKS ************ */

// eslint-disable-next-line prettier/prettier
export const useAxiosApolloQuery: IUseAxiosApolloQuery = (props) => {
  /* eslint-disable prettier/prettier */
  const [queryState, setQueryState] = React.useState<IAxiosQueryData<any>>({ loading: false });
  const previousVariables = React.useRef<object>(props.variables || {})

  const querySpecs = getQuerySpecifications(props?.query);
  const name = props?.queryName || querySpecs?.name;
  const type = querySpecs?.type;
  /* eslint-enable prettier/prettier */

  const fetch: IFetchQuery<any, any> = React.useCallback(
    (options) => {
      const op = options?.op || 'refetch';
      const fetchMoreUpdate: any = options?.fetchMoreUpdate;
      const variablesJoinType = options?.variables?.$$join || 'merge';

      const nextVariables: any =
        variablesJoinType === 'replace' || variablesJoinType === 'one-time'
          ? options?.variables
          : {
              ...props.variables,
              ...previousVariables.current,
              ...options?.variables
            };
      if (variablesJoinType !== 'one-time') {
        previousVariables.current = nextVariables;
      }

      return Promise.resolve()
        .then(() => {
          setQueryState((previous) => {
            const nextState: typeof previous = {
              data: op === 'reset-cache' ? undefined : previous.data,
              loading: true
            };
            return nextState;
          });
        })
        .then(() =>
          clientAxiosApollo({
            ...props,
            variables: nextVariables
          })
        )
        .then((nextData) => {
          return new Promise<IAxiosQueryData<any>>((res) => {
            setQueryState((previous) => {
              const nextState: typeof previous = {
                data:
                  op === 'fetch-more'
                    ? fetchMoreUpdate
                      ? fetchMoreUpdate(
                          previous?.data,
                          nextData,
                          previousVariables.current
                        )
                      : undefined
                    : nextData,
                loading: false
              };

              res(nextState);
              return nextState;
            });
          });
        })
        .catch((error) => {
          return new Promise<IAxiosQueryData<any>>((res) => {
            setQueryState((previous) => {
              const nextState: typeof previous = { loading: false, error };

              res(nextState);
              return nextState;
            });
          });
        });
    },
    [props.query, props.variables]
  );
  const updateCache: IUpdateCacheFn<any> = React.useCallback((update) => {
    setQueryState((previousState) => ({
      ...previousState,
      data: update(previousState.data)
    }));
  }, []);

  React.useEffect(() => {
    /** Listening to query refecthes */
    if (type === 'query' && name) {
      const eventHandler = async (options: any, uuid?: string) => {
        await fetch(options);
        if (uuid) axiosApolloEmitter.emit(uuid);
      };
      axiosApolloEmitter.on(name, eventHandler);
      return () => {
        axiosApolloEmitter.off(name, eventHandler);
      };
    }
  }, [type, name]);

  return [fetch as any, { ...queryState, updateCache }];
};

/* eslint-disable prettier/prettier */
export interface IUseAxiosApolloQuery {
  <TQueryResponse extends object, TQueryVariables extends object = object>(
    props: IUseAxiosApolloQueryProps<TQueryVariables>
  ): IUseAxiosApolloQueryData<TQueryResponse, TQueryVariables>;
}
export interface IUseAxiosApolloQueryProps<TQueryVariables extends object = object> {
  query: DocumentNode;
  variables?: TQueryVariables | object;
  queryName?: string;
}
export type IUseAxiosApolloQueryData<TQueryResponse extends object, TQueryVariables extends object = object> = [
  fetch: IFetchQuery<TQueryResponse, TQueryVariables>,
  response: IAxiosQueryResponse<TQueryResponse>
];



export interface IFetchQuery<TQueryResponse extends object, TQueryVariables extends object = object> {
  (options?: IFetchQueryOptions<TQueryResponse, TQueryVariables>): Promise<IAxiosQueryData<TQueryResponse>>;
}
export interface IFetchQueryOptions<TQueryResponse extends object, TQueryVariables extends object = object> {
  variables?: Partial<TQueryVariables> & { $$join?: 'merge' | 'replace' | 'one-time' };
  op?: 'reset-cache' | 'refetch' | 'fetch-more';
  fetchMoreUpdate?: (previousData: TQueryResponse, nextData: TQueryResponse, variables: TQueryVariables) => TQueryResponse;
}


export interface IAxiosQueryResponse<TQueryResponse extends object> extends IAxiosQueryData<TQueryResponse> {
  updateCache: IUpdateCacheFn<TQueryResponse>;
}
export interface IUpdateCacheFn<TCache extends object> {
  (update: (previousCache: TCache | undefined) => TCache | undefined): void;
}



interface IAxiosQueryData<TQueryResponse extends object> {
  data?: TQueryResponse;
  loading: boolean;
  error?: Error;
}
