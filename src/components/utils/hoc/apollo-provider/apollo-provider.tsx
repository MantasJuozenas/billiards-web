import { ApolloProvider as Provider } from '@apollo/client';
// @ts-ignore
// eslint-disable-next-line import/named
import { useApollo } from '@clients/apollo';
import { setApolloClient } from '@store/modules/global/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';

export const ApolloProvider = (props: NApolloProvider.IProps) => {
  const { pageProps } = props;

  const dispatch = useDispatch();
  const loggedInUser = useSelector((s) => s.auth.loggedInUser);

  const apolloClient = useApollo(pageProps, loggedInUser?.id || 0);

  React.useEffect(() => {
    // React.useLayoutEffect(() => {
    apolloClient?.stop?.();
  }, [loggedInUser?.id]);

  React.useEffect(() => {
    dispatch(setApolloClient({ client: apolloClient }));
  }, [loggedInUser?.id]);

  return <Provider client={apolloClient}>{props?.children}</Provider>;
};

export namespace NApolloProvider {
  export interface IProps extends G.IExtendedAppProps {
    children: React.ReactNode;
  }
}
