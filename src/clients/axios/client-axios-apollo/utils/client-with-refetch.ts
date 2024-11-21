import { uuid } from '@utilsFn/uuid';
import { AxiosInstance } from 'axios';

import {
  axiosApolloQueryClientBase,
  IClientProps as IBaseClientProps
} from './client-base';
import { axiosApolloEmitter } from './refetch-emitter';

export interface IFactory {
  (client: () => AxiosInstance): IClient;
}
export interface IClient {
  <TQueryResponse extends object, TQueryVariables extends object = object>(
    props: IClientProps<TQueryVariables>
  ): Promise<TQueryResponse>;
}
export interface IClientProps<TQueryVariables extends object = object>
  extends IBaseClientProps<TQueryVariables> {
  refetchQueries?: Array<string>;
  refetchTimeout?: number;
  awaitRefetchQueries?: boolean;
}
export const axiosApolloQueryClientWithRefetch: IFactory =
  (client) => (props) => {
    const { refetchTimeout = 30_000 } = props || {};

    const baseResponse = axiosApolloQueryClientBase(client)<any, any>(props);

    return baseResponse.then(async (response) => {
      if (props?.refetchQueries?.length) {
        const refetches = props.refetchQueries.map(async (queryToRefetch) => {
          try {
            const name =
              typeof queryToRefetch === 'string'
                ? queryToRefetch
                : queryToRefetch?.[0];
            const options =
              typeof queryToRefetch === 'string'
                ? undefined
                : queryToRefetch?.[1];

            if (!name || typeof name !== 'string')
              return { error: 'Invalid query name' };

            return Promise.race([
              new Promise((res) => {
                setTimeout(
                  () => res({ error: 'Refetch timeout' }),
                  refetchTimeout
                );
              }),
              new Promise((resolve) => {
                const uuidString = uuid();
                axiosApolloEmitter.emit(name, options, uuidString);
                axiosApolloEmitter.once(uuidString, () => resolve(true));
              })
            ]);
          } catch (error) {
            return { error };
          }
        });

        if (props.awaitRefetchQueries) await Promise.all(refetches);
      }

      return response;
    });
  };
