import { AxiosInstance } from 'axios';
import { DocumentNode } from 'graphql';

import { getDocumentString } from './get-document-string';
import { getQuerySpecifications } from './get-query-specifications';

export interface IFactory {
  (client: () => AxiosInstance): IClient;
}
export interface IClient {
  <TQueryResponse extends object, TQueryVariables extends object = object>(
    props: IClientProps<TQueryVariables>
  ): Promise<TQueryResponse>;
}
export interface IClientProps<TQueryVariables extends object = object> {
  query: DocumentNode;
  variables?: TQueryVariables | object;
  queryName?: string;
}
export interface IGraphQLRequestPayload {
  query: string;
  variables?: object;
}
export const axiosApolloQueryClientBase: IFactory = (client) => (props) => {
  const queryString = getDocumentString(props?.query);
  const querySpecs = getQuerySpecifications(queryString);
  const name = props?.queryName || querySpecs?.name;

  const endpoint = `/${name ? `?${name}` : ''}`;
  const payload: IGraphQLRequestPayload = {
    query: queryString,
    variables: props.variables
  };

  return client()
    .post<{ data: any; errors?: any }>(endpoint, payload)
    .then((response) => {
      if (response?.data?.errors) throw response?.data?.errors;
      return response?.data?.data;
    });
};
