import { Loaders, LoadersSSR } from '@components/utils/loaders';
import React from 'react';

import { useAuthLevel } from './hooks/use-auth-level';
import { useDefaultLocaleChange } from './hooks/use-default-locale-change';

export const AuthProvider = (props: NAuthProvider.TProps) => {
  const { appProps } = props;
  const defaultProps = appProps?.Component?.defaultProps;

  // const router = useRouter();
  // console.log({ ...router });
  // const params = router?.query as NAuthProvider.TParams;

  const { state } = useAuthLevel({ pageDefaultProps: defaultProps });
  // usePathnameChange();
  useDefaultLocaleChange();
  // useRouteChangeComplete();
  // useModalLogin({ params });

  if (defaultProps?.authLevel === 'public') {
    return (
      <LoadersSSR isLoading={state?.showLoader}>
        <appProps.Component
          {...(appProps?.pageProps as G.Ignored)}
          err={appProps?.err}
        />
      </LoadersSSR>
    );
  }

  return (
    <Loaders isLoading={state?.showLoader}>
      <appProps.Component
        {...(appProps?.pageProps as G.Ignored)}
        err={appProps?.err}
      />
    </Loaders>
  );
};

// export namespace NAuthProvider {
//   export interface IProps {
//     appProps: G.IExtendedAppProps;
//   }

//   export interface IState {
//     firstAuthCheckDone: boolean;
//     pageAuthLevelIndex: number;
//     userAuthLevelIndex: number;
//     authLevelOk: boolean;
//     isPublicRoute: boolean;
//     isAuthRoute: boolean;
//     showLoader: boolean;
//   }
// }

export namespace NAuthProvider {
  export type TProps = {
    // appProps: G.TExtendedAppProps;
    appProps: G.IExtendedAppProps;
  };

  // export type TParams = G.TPageParams & {
  //   /** for ModalLogin */
  //   email?: string;
  //   name?: string;
  //   surname?: string;
  //   /** lcns - login-check-next-step */
  //   lcns?: NHandlerModalLogin.TProps['lcns'];
  //   /** rPAL - redirectPathAfterLogin */
  //   rPAL?: string;
  //   /** sId - storage random string */
  //   sId?: string;
  //   /** */
  // };

  export type TState = {
    pageAuthLevelIndex: number;
    userAuthLevelIndex: number;
    authLevelOk: boolean;
    isPublicRoute: boolean;
    isAuthRoute: boolean;
    showLoader: boolean;
  };
}
