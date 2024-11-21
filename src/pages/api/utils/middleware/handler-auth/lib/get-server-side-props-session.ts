import { parseCookies } from '@utilsFn/parse-cookies';

import { DecodeToken } from './decode-token';

export const GetServerSidePropsSession = (
  props: NGetServerSidePropsSession.IProps
) => {
  const { token } = parseCookies(props?.ctx?.req);
  const { decoded } = DecodeToken({ token });
  // console.log('__GetServerSidePropsSession', { token, decoded });

  return {
    session: decoded ? { user: decoded?.user, hasura: decoded?.hasura } : null
  };
};

export namespace NGetServerSidePropsSession {
  export interface IProps {
    ctx: G.TGetServerSidePropsContext;
  }
}
