import { NGetAuthUserQuery } from '@pages/api/utils/query/get-auth-user.query';

import { IPermissions } from './permissions/types';

export interface IState {
  authCheckComplete: boolean;
  isLoggedIn: boolean;
  loggedInUser: NGetAuthUserQuery.IRes['user'] | null;
  loginError: string;
  loginSuccess: string;

  isUser: boolean;
  isAdministrator: boolean;
  isAdmin: boolean;

  authLevel: G.TPageDefaultProps['authLevel'];
  permissions: IPermissions | null;
}

export type TSetAuthState = Omit<IState, 'authCheckComplete' | 'permissions'>;

export const defaultState: IState = {
  authCheckComplete: false,
  isLoggedIn: false,
  loggedInUser: null,
  loginError: '',
  loginSuccess: '',
  isUser: false,
  isAdministrator: false,
  isAdmin: false,
  authLevel: 'public',
  permissions: null
};
