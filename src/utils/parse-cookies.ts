import { AUTH_COOKIE_NAME } from '@constants/app-constants';
import { isBrowser } from '@utilsFn/check-browser';
import { parse } from 'cookie';
import cookies from 'js-cookie';
import { NextApiRequest } from 'next';

export const parseCookies = (
  req: NextApiRequest | Parameters<G.TGetServerSideProps>['0']['req']
) => {
  let reqCookies: { [key: string]: string } = {};

  const rawHeaders = req?.rawHeaders?.find((str) => str?.includes('auth-'));

  if (req?.cookies) {
    // For API Routes we don't need to parse the cookies.
    reqCookies = req?.cookies as typeof reqCookies;
  } else if (req?.headers?.cookie) {
    // For pages we do need to parse the cookies.
    reqCookies = parse(req?.headers?.cookie);
  } else if (rawHeaders) {
    // For pages we do need to parse the cookies.
    reqCookies = parse(rawHeaders);
  }

  const token = reqCookies?.[AUTH_COOKIE_NAME] || '';

  return { reqCookies, token };
};

export const getCookies = () => {
  let docCookies = '';
  if (isBrowser()) docCookies = JSON.stringify(cookies.get());
  // eslint-disable-next-line no-console
  // console.log('docCookies');
  // eslint-disable-next-line no-console
  // console.log(docCookies);
  return { docCookies };
};
