import { NGetAuthUserQuery } from '@pages/api/utils/query/get-auth-user.query';
import { CookieSerializeOptions } from 'cookie';
import express from 'express';
import jwt from 'jsonwebtoken';

export interface ISessionUser {
  /* These are in session token */
  id?: number;
  role_id?: number;
  username?: string;
  loginFrom: G.TLoginFrom;
  /* These are not in session token */
  user?: NGetAuthUserQuery.IRes['user'];
}

export interface ICookiesSession {
  name: string;
  secret: string;
  options?: CookieSerializeOptions;
  optionsJwt?: jwt.SignOptions;
}

export interface ICookieParsed {
  /** These are in JWT */
  user?: ISessionUser;
  hasura?: { claims: G.IHasuraAuth };
  /** These are not in JWT */
  currToken?: string;
  newToken?: string;
}

export interface IExtendedRequest extends G.TNextApiRequest {
  /** Only if api is using auth  */
  user?: ISessionUser;
  session?: ICookieParsed;
}

export type IExtendedResponse = G.TNextApiResponse;

export interface IExpressExtendedRequest extends express.Request {
  session?: ICookieParsed;
}

export type TAuthenticateMethod =
  | 'local'
  | 'login'
  | 'admin-login'
  | 'change-password';
