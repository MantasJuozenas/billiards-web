// import {
//   ApolloClient,
//   ApolloLink,
//   concat,
//   DocumentNode,
//   HttpLink,
//   InMemoryCache,
//   split
// } from '@apollo/client';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { concatPagination, getMainDefinition } from '@apollo/client/utilities';
// import {
//   AUTH_COOKIE_NAME,
//   GQL_API_URL,
//   GQL_WS_API_URL
// } from '@constants/app-constants';
// import { GetLocaleStorageAuthCookie } from '@store/modules/local-storage/functions/auth-cookie';
// import { isBrowser } from '@utilsFn/check-browser';
// import { noop } from '@utilsFn/noop';
// import { getCookies, parseCookies } from '@utilsFn/parse-cookies';
// import { WebSocketLink } from 'apollo-link-ws';
// import merge from 'deepmerge';
// import isEqual from 'lodash/isEqual';
// import { AppProps } from 'next/app';
// import { useMemo } from 'react';
// import { SubscriptionClient } from 'subscriptions-transport-ws';

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

// let apolloClient: G.TApolloClient;
// let accessToken: any = null;
// let reStateNumber: number | string = 0;

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const requestAccessToken = async () => {
//   if (accessToken) return;

//   const res = await fetch(`/api/`);
//   // console.log('requestAccessToken', res);
//   if (res.ok) {
//     const json = await res.json();
//     accessToken = json?.accessToken;
//   } else {
//     accessToken = 'public';
//   }
// };

// export const apolloClientHeaders = (req?: G.IExtendedRequest) => {
//   const appCookies = req ? JSON.stringify(parseCookies(req)) : getCookies();

//   let headers = {};

//   headers = {
//     'content-type': 'application/json',
//     cookies: appCookies,
//     authorization: GetLocaleStorageAuthCookie(),
//     [AUTH_COOKIE_NAME]: GetLocaleStorageAuthCookie()
//   };

//   // headers = {
//   //   'content-type': 'application/json',
//   //   'x-hasura-admin-secret': GQL_ADMIN_SECRET,
//   //   cookies: appCookies
//   // };
//   // createWSLink // connectionParams: async () => {
//   //   // eslint-disable-next-line no-inline-comments
//   //   // await requestAccessToken(); // happens on the client
//   //   return {
//   //     headers: IS_PROD
//   //       ? {
//   //           'content-type': 'application/json',
//   //           cookies: appCookies
//   //         }
//   //       : {
//   //           'content-type': 'application/json',
//   //           'x-hasura-admin-secret': GQL_ADMIN_SECRET,
//   //           // authorization: accessToken ? `Bearer ${accessToken}` : '',
//   //           cookies: appCookies
//   //         }
//   //   };
//   // }
//   return { headers };
// };

// const createHttpLink = (req?: G.IExtendedRequest) => {
//   const { headers } = apolloClientHeaders(req);

//   return new HttpLink({
//     uri: GQL_API_URL,
//     credentials: 'include',
//     headers
//   });
// };

// const createWSLink = (req?: G.IExtendedRequest) => {
//   const newSubscriptionClient = new SubscriptionClient(GQL_WS_API_URL, {
//     lazy: true,
//     reconnect: true,
//     connectionParams: async () => {
//       // eslint-disable-next-line no-inline-comments
//       // await requestAccessToken(); // happens on the client
//       const { headers } = apolloClientHeaders(req);
//       return { headers };
//     }
//   });

//   const webSocketLink = new WebSocketLink(newSubscriptionClient);

//   // return webSocketLink;
//   return { webSocketLink, newSubscriptionClient };
// };

// const isSubscription = ({ query }: { query: DocumentNode }) => {
//   const def = getMainDefinition(query);
//   return (
//     def?.kind === 'OperationDefinition' && def?.operation === 'subscription'
//   );
// };

// const createLink = (req?: G.IExtendedRequest) => {
//   return {
//     createWSLink: createWSLink(req),
//     createHttpLink: createHttpLink(req)
//   };
// };

// const createInMemoryCache = () => {
//   return new InMemoryCache({
//     typePolicies: { Query: { fields: { allPosts: concatPagination() } } }
//   });
// };

// const authMiddleware = (_req?: G.IExtendedRequest) =>
//   new ApolloLink((operation, forward) => {
//     // eslint-disable-next-line no-console
//     // console.log('set header');
//     // eslint-disable-next-line no-console
//     // console.log(new Date());
//     // eslint-disable-next-line no-console
//     // console.log({
//     //   [AUTH_COOKIE_NAME]: GetLocaleStorageAuthCookie()
//     // });
//     operation.setContext(({ headers = {} }) => ({
//       headers: {
//         ...headers,
//         [AUTH_COOKIE_NAME]: GetLocaleStorageAuthCookie()
//       }
//     }));

//     return forward(operation);
//   });

// const namedLink = new ApolloLink((operation, forward) => {
//   operation.setContext(() => ({
//     uri: `${isSubscription(operation) ? GQL_WS_API_URL : GQL_API_URL}?${
//       operation.operationName
//     }`
//   }));
//   return forward ? forward(operation) : null;
// });

// function createApolloClient(req?: G.IExtendedRequest) {
//   const ssrMode = typeof window === 'undefined';

//   const links: ReturnType<typeof createLink> | undefined = isBrowser()
//     ? createLink(req)
//     : undefined;

//   const client = new ApolloClient({
//     ssrMode,
//     link: concat(
//       authMiddleware(req),
//       ApolloLink.from([
//         namedLink,
//         isBrowser()
//           ? split(
//               isSubscription,
//               // @ts-ignore
//               links?.createWSLink?.webSocketLink,
//               links?.createHttpLink
//             )
//           : createHttpLink(req)
//       ])
//     ),
//     cache: createInMemoryCache()
//     // defaultOptions: {
//     //   query: { fetchPolicy: 'no-cache' },
//     //   mutate: { fetchPolicy: 'no-cache' },
//     //   watchQuery: { fetchPolicy: 'no-cache' }
//     // }
//   });

//   // eslint-disable-next-line no-underscore-dangle
//   const _stop = client.stop;
//   client.stop = () => {
//     // eslint-disable-next-line no-promise-executor-return
//     new Promise((res) => res(_stop?.())).catch(noop);
//     new Promise((res) =>
//       // eslint-disable-next-line no-promise-executor-return
//       res(links?.createWSLink?.newSubscriptionClient?.close(false))
//     ).catch(noop);
//   };

//   return client;
// }

// export function initializeApollo(props: {
//   initialState?: any;
//   reState?: typeof reStateNumber;
//   req?: G.IExtendedRequest;
// }) {
//   const { initialState = null, reState = 0, req } = props;
//   // eslint-disable-next-line no-underscore-dangle
//   let _apolloClient = apolloClient ?? createApolloClient(req);
//   if (reStateNumber !== reState) {
//     reStateNumber = reState;
//     _apolloClient = createApolloClient(req);
//   }

//   // If your page has Next.js data fetching methods that use Apollo Client, the initial state
//   // gets hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract();

//     // Merge the existing cache into data passed from getStaticProps/getServerSideProps
//     const data = merge(initialState, existingCache, {
//       // combine arrays using object equality (like in sets)
//       arrayMerge: (destinationArray, sourceArray) => [
//         ...sourceArray,
//         ...destinationArray.filter((d) =>
//           sourceArray.every((s) => !isEqual(d, s))
//         )
//       ]
//     });

//     // Restore the cache with the merged data
//     _apolloClient.cache.restore(data);
//   }
//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === 'undefined') return _apolloClient;
//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;

//   return _apolloClient;
// }

// export function addApolloState(
//   client: G.TApolloClient,
//   pageProps: AppProps['pageProps']
// ) {
//   if (pageProps?.props) {
//     pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
//   }

//   return pageProps;
// }

// export function useApollo(
//   pageProps: AppProps['pageProps'],
//   reState?: typeof reStateNumber
// ) {
//   const state = pageProps[APOLLO_STATE_PROP_NAME];
//   return useMemo(
//     () => initializeApollo({ initialState: state, reState }),
//     [state, reState]
//   );
// }
export {};
