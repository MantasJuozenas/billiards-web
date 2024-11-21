import {
  ApolloClient,
  ApolloQueryResult,
  SubscriptionResult
} from '@apollo/client';
import { EmotionCache } from '@emotion/cache';
import { useDispatch } from '@utilsFn/hooks/use-selector';
import { AxiosResponse } from 'axios';
import { CombinedQueryBuilder } from 'graphql-combine-query';
import { StatusCodes } from 'http-status-codes';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextApiRequest,
  NextApiResponse
} from 'next';
import { AppInitialProps, AppProps } from 'next/app';
import { GetServerSidePropsContext, NextPage } from 'next/types';
import { NextHandler } from 'next-connect';
import { SendMailOptions } from 'nodemailer';
import { ObjectShape } from 'yup/lib/object';
import { AnySchema } from 'yup/lib/schema';

export type { TClientAxiosApollo } from '@clients/axios/client-axios-apollo';
export type { IClientProps as IClientWithRefetchProps } from '@clients/axios/client-axios-apollo/utils/client-with-refetch';
export type {
  TDefaultLocales,
  TDefaultLocales2
} from '@store/modules/translations/types';
export type TDispatch = ReturnType<typeof useDispatch>;

/**                                                          START Custom */
/* eslint-disable prettier/prettier */
/* eslint-disable import/export */
export interface Dictionary<T> { [name: number]: T; }
export interface Dictionary<T> { [name: string]: T; }
/* eslint-enable import/export */
export type Ignored = any;
export type Promisable<T> = T | PromiseLike<T>;
export type DeepPartial<T extends object> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]; };
/* eslint-enable prettier/prettier */
/**                                                          END Custom */

/**                                                          START @apollo/client */
export type TApolloClient<T = G.Ignored> = ApolloClient<T>;
export type TApolloQueryResult<T = G.Ignored> = ApolloQueryResult<T>;
export type TSubscriptionResult<T = G.Ignored> = SubscriptionResult<T>;
/**                                                          END @apollo/client */

/**                                                          START graphql-combine-query */
/* eslint-disable prettier/prettier */
export type TGQLCombine<T extends object> = T extends CombinedQueryBuilder<infer R, infer V> ? { data: R; variables: V } : G.Ignored;
/* eslint-enable prettier/prettier */
/**                                                          END graphql-combine-query */

/**                                                          START yup */
/* eslint-disable prettier/prettier */
type TObjectShapeValues = ObjectShape extends Record<string, infer V> ? V : never;
export type TShape<T extends Record<G.Ignored, G.Ignored>> = Partial<Record<keyof T, TObjectShapeValues>>;
export type YupMap<T extends object> = { [K in keyof T]: AnySchema<T[K] | null | undefined, G.Ignored, T[K] | null | undefined>;};
/* eslint-enable prettier/prettier */
/**                                                          END yup */

/**                                                          START Page */
export interface ISEOMetaDefault {
  imgSize?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogImage?: string;
  ogImageWidth?: '1200' | '500';
  ogImageHeight?: '630' | '500';
  facebookPixel?: string;
}

export type TAuthLevel = 'public' | 'user' | 'administrator' | 'super-admin';

export type TPageDefaultProps<T = {}> = {
  authLevel: TAuthLevel;
  authLevelDic: Partial<{ [key in TPageDefaultProps['authLevel']]: boolean }>;
  pageSeo: G.ISEOMetaDefault;
} & T;

export interface TExtendedAppInitialProps extends AppInitialProps {
  pageProps: {
    initialReduxState: G.IStore;
  };
}

export type IExtendedAppProps<T = {}> = AppProps<TPageDefaultProps<T>> & {
  pageProps: G.TExtendedAppInitialProps['pageProps'];
  // eslint-disable-next-line no-inline-comments
  err?: G.Ignored; // sentry error
  emotionCache?: EmotionCache;
};

export type TExtendedNextPageProps<T = {}> = NextPage<G.TPageDefaultProps<T>>;

export type TGetServerSideProps = GetServerSideProps;
export type TGetStaticProps = GetStaticProps;
export type TGetStaticPaths = GetStaticPaths;
export type TGetServerSidePropsContext = GetServerSidePropsContext;

export interface IQueryParams {
  // lang?: G.TDefaultLocales;
  /** searchValue */
  sV?: string;
  /** page */
  p?: number;
  /** pageSize */
  pS?: number;
}
/**                                                          END Page */

/**                                                          START Lifecycle */
interface ILifecycle<Success = G.Ignored> {
  onPrepare?(): G.Promisable<G.Ignored>;
  onSuccess?(props: Success): G.Promisable<G.Ignored>;
  onError?(error: Error): G.Promisable<G.Ignored>;
  onCleanup?(): G.Promisable<G.Ignored>;
}

export type TLifecycleSaga<
  E extends Record<string, G.Ignored> = {},
  Success = G.Ignored
> = ILifecycle<Success> & E;

interface ITLifecycleModal extends ILifecycle {
  /** Fires when lifecycle event starts to listen for modal closure */
  onPrepare?(): G.Promisable<G.Ignored>;
  /** Fires when modal closes in succession */
  onSuccess?(): G.Promisable<G.Ignored>;
  /** Fires when modal closes in failure */
  onError?(error: Error): G.Promisable<G.Ignored>;
  /** Fires after modal closes */
  onCleanup?(): G.Promisable<G.Ignored>;
}

export interface ILifecycleRequest<Return> extends ILifecycle<Return> {
  call: () => G.Promisable<Return>;
}
/**                                                          END Lifecycle */

/**                                                          START Modals and forms  */
interface IModal_DataType<T extends object> {
  /** Used to select only data interface */
  __data?: T;
}

interface IModal_CloseStatus {
  /** Indicates that modal closure reason */
  closeStatus?: 'success' | 'error' | 'close';
}

export type TOpenModalTypes = 'create' | 'edit' | 'delete' | 'view' | null;

interface IModal {
  openModalType: TOpenModalTypes;
  modalZIndex?: number;
  styleOverlay?: React.CSSProperties;
  styleContent?: React.CSSProperties;
}

interface IForm<EP = G.Ignored, D = G.Ignored, E = G.Ignored> {
  extraProps?: EP;
  callBack?: (data?: D) => G.Promisable<G.Ignored>;
  afterSubmitCallback?: (data?: D) => G.Promisable<G.Ignored>;
  onErrorCallBack?: (error?: E) => G.Promisable<G.Ignored>;
  /** for gql apollo only */
  refetchQueries?: string[];
  /** for gql axios only */
  refetchAxiosGqlQueries?: string[];
  queryProps?: Omit<G.IClientWithRefetchProps, 'query'>;
}

interface IModalAndForm {
  openedIn?: 'from_other_form' | null;
}

type TMAF_State<EP = G.Ignored, D = G.Ignored, E = G.Ignored> = IModal &
  IForm<EP, D, E> &
  IModalAndForm;

export type TMAFState<
  T extends object,
  EP = G.Ignored,
  D = G.Ignored,
  E = G.Ignored
> =
  | ({ openModalType: null } & Partial<T> &
      IModal_DataType<T> &
      IModal_CloseStatus &
      ITLifecycleModal &
      Omit<TMAF_State<EP, D, E>, 'openModalType'>)
  | (T & IModal_DataType<T> & ITLifecycleModal & TMAF_State<EP, D, E>);
/**                                                          END Modals and forms  */

/**                                                          START Query */
export interface IQMutationProps<D = G.Ignored, E = G.Ignored> {
  dispatch?: G.TDispatch;
  afterQueryDone?: (data?: D) => G.Promisable<G.Ignored>;
  afterQueryError?: (error?: E) => G.Promisable<G.Ignored>;
  /** for gql apollo only */
  refetchQueries?: string[];
  /** for gql axios only */
  refetchAxiosGqlQueries?: string[];
  queryProps?: Omit<G.IClientWithRefetchProps, 'query'>;
}
/**                                                          END Query */

/**                                                          START Axios */
export type TAxiosResponse<T = G.Ignored, D = G.Ignored> = AxiosResponse<T, D>;
/**                                                          END Axios */

/**                                                          START Other */
export type TLoginFrom = 'default-login' | 'admin-login' | '';

export type TOperatingSystem = 'web' | 'android' | 'winMobile' | 'iOS';

export interface IPager {
  page?: number;
  pageSize?: number;
}

export type TSelect<V = string | number, LS = string, D = G.Ignored> = {
  value: V;
  label: React.ReactNode;
  labelString?: LS;
  data?: D;
};

export interface IToastStrings {
  ok?: {
    create?: { title?: string; msg?: string };
    edit?: { title?: string; msg?: string };
    delete?: { title?: string; msg?: string };
  };
  error?: {
    create?: { title?: string; msg?: string };
    edit?: { title?: string; msg?: string };
    delete?: { title?: string; msg?: string };
  };
}

export interface ILink {
  to: string;
  route: string;
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  isAuthRoute?: boolean;
  activeRoutes?: string[];
  count?: number;
}
/**                                                          END other */

/**                                                          START API types */
export interface IServerError<T = G.Ignored> {
  data: T;
  status: number;
}

export type TApiParams<T = { [key: string]: string | string[] }> = {
  files?: Express.Multer.File[];
  query: { authCheck?: boolean; authLogout?: boolean } & T;
};

export type TApiResError = { status?: StatusCodes; msg?: string };

export type TApiRes<P = G.Ignored, R = G.Ignored, E = TApiResError> =
  | { status: 'ok'; payload?: P; [name: string]: G.Ignored }
  | { status: 'skip'; reason?: R; [name: string]: G.Ignored }
  | { status: 'error'; error?: E; [name: string]: G.Ignored };
// | { status: string; [name: string]: G.Ignored };

export type TNextApiRequest = NextApiRequest & TApiParams;
export type TNextApiResponse<T = TApiRes> = NextApiResponse<T>;
export type TNextHandler = NextHandler;

export interface IHasuraAuth {
  /** Using JWT */
  /**
   * 'X-Hasura-Admin-Secret'
   * 1. JWT authentication is enforced when the X-Hasura-Admin-Secret header is not found in the request.
   * 2. JWT authentication is skipped when the X-Hasura-Admin-Secret header is found in the request and admin access is granted.
   */
  // 'X-Hasura-Admin-Secret'?: string;
  /**
   * 'x-hasura-default-role'
   * Indicating the default role of that user i.e. the role that will be used in case x-hasura-role header is not passed.
   */
  'x-hasura-default-role': TAuthLevel;
  /**
   * 'x-hasura-allowed-roles'
   * A list of allowed roles for the user i.e. acceptable values of the x-hasura-role header.
   * The x-hasura-default-role specified should be a member of this list.
   */
  'x-hasura-allowed-roles': TAuthLevel[];
  /**
   * The claims in the JWT can have other x-hasura-* fields where their values can only be strings.
   * You can use these x-hasura-* fields in your permissions.
   */
  'x-hasura-user-id'?: string;
}

export type TEmailNodemailer = SendMailOptions;
/**                                                          END API types */
