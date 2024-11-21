/* eslint-disable @typescript-eslint/no-empty-interface */
/* /// <reference path="../../node_modules/@pixinn/gql-query-tool/gql-declarations.d.ts" /> */
import 'react-redux';

import { colors } from '@styles/global-colors';
import React from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOCALE?: string;
      GEO_URL?: string;
      IPSTACK_URL?: string;
      PORT?: string;
      HOST?: string;
      HOSTNAME?: string;
      API_URL?: string;
      AUTH_COOKIE_NAME?: string;
      GQL_ADMIN_SECRET?: string;
      GQL_API_URL?: string;
      GQL_WS_API_URL?: string;
      TOKEN_SECRET?: string;
      AUTH_DOMAIN?: string;
      DATABASE_URL?: string;
      IS_STAGING?: '1' | undefined;
      IGNORE_CHECK_TYPES_BUILD?: string;
      DEFAULT_LOCALE?: G.TDefaultLocales;
      SITE_URL?: string;
      IIKO_API_URL?: string;
      PROD_TESTING_ENABLED?: '1' | undefined;
      RE_CAPTCHA_KEY_CLIENT?: string;
      RE_CAPTCHA_KEY_SERVER?: string;
      LOGIN_PASSWORD?: string;
    }
  }
}

declare module 'react-redux' {
  interface DefaultRootState extends G.IStore {}
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    //   fonts: typeof fonts;
    cssVars: {
      screenWidth: number;
      screenHeight: number;
      layoutWidth: number;
      navbarHeight: number;
      sidePanelWidth: number;
      footerHeight: number;
      pagePaddingSide: number;
    };
  }
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
