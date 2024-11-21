import '@styles/global-styles/global-styles.css';
import '@styles/global-styles/global-fonts.css';
import '@styles/global-styles/global-scrollbar.css';
import '@styles/global-styles/global-modal.css';
import 'dayjs/locale/lt';
import 'dayjs/locale/en';

import { AppHead } from '@components/layout/app-head';
import { ModalsContainer } from '@components/modals-and-forms/modals-container-dynamic';
import { AppCheck } from '@components/utils/hoc/app-check';
// import { ApolloProvider } from '@components/utils/hoc/apollo-provider';
import { AuthProvider } from '@components/utils/hoc/auth-provider';
import { ConnectedRouter } from '@components/utils/hoc/connected-router';
// import { GoogleReCaptchaProvider } from '@components/utils/hoc/google-re-captcha-provider';
import {
  MuiCacheProvider,
  MuiLocalizationProvider,
  MuiThemeProvider
} from '@components/utils/hoc/mui-provider';
import { ReduxProvider } from '@components/utils/hoc/redux-provider';
import { ThemeProviderStyledComponents } from '@components/utils/hoc/theme-provider-styled-components';
import { NextNprogress } from '@components/utils/pixinn/next-n-progress';
// import { getStaticPropsFactory } from '@utilsFn/get-translations';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

const App = (props: G.IExtendedAppProps) => {
  return (
    <ConnectedRouter>
      <AppCheck>
        {/* <ApolloProvider {...props}> */}
        <ThemeProviderStyledComponents>
          <MuiCacheProvider emotionCache={props?.emotionCache}>
            <MuiThemeProvider>
              <MuiLocalizationProvider>
                {/* <GoogleReCaptchaProvider> */}
                <AppHead />

                <NextNprogress />

                <ModalsContainer />

                <AuthProvider appProps={props} />
                {/* </GoogleReCaptchaProvider> */}
              </MuiLocalizationProvider>
            </MuiThemeProvider>
          </MuiCacheProvider>
        </ThemeProviderStyledComponents>
        {/* </ApolloProvider> */}
      </AppCheck>
    </ConnectedRouter>
  );
};

const _app = (props: G.IExtendedAppProps) => {
  const pageProps = props?.pageProps as G.TExtendedAppInitialProps['pageProps'];

  return (
    <>
      <ReduxProvider initialReduxState={pageProps?.initialReduxState}>
        <App {...props} />
      </ReduxProvider>

      {/** .focus-visible class handler and polyfill */}
      <Script src="/scripts/focus-visible.min.js" />

      <Script src="/scripts/google-tag-manager.js" />
      <noscript>
        <iframe
          title="google-tag-manager-ltu"
          src="https://www.googletagmanager.com/ns.html?id=GTM-WTNCB58T"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
};

export default appWithTranslation(_app as any);

// export const getStaticProps = getStaticPropsFactory(['PageSeo_default']);
