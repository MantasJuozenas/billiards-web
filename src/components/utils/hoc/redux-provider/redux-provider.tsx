import { useStore } from '@store/configure-store';
import React from 'react';
import { Provider } from 'react-redux';

export const ReduxProvider = (props: NReduxProvider.IProps) => {
  const store = useStore(props?.initialReduxState);

  return <Provider store={store}>{props?.children}</Provider>;
};

export default ReduxProvider;

export namespace NReduxProvider {
  export interface IProps {
    children: React.ReactNode;
    initialReduxState: G.TExtendedAppInitialProps['pageProps']['initialReduxState'];
  }
}
