/* eslint-disable max-len */
import { AUTH_DOMAIN, TOKEN_SECRET } from '@api/utils/backend-constants';
import { AUTH_COOKIE_NAME, IS_PROD } from '@constants/app-constants';
import { assertServer } from '@pages/api/utils/functions/assert-server';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const days30 = 60 * 60 * 720;

export const sessionData: G.ICookiesSession = {
  name: AUTH_COOKIE_NAME,
  secret: TOKEN_SECRET,
  options: IS_PROD
    ? {
        maxAge: days30,
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
        domain: AUTH_DOMAIN
      }
    : {
        // eslint-disable-next-line no-inline-comments
        maxAge: days30,
        // maxAge: 60 * 60 * 0.01,
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
        domain: undefined
      },
  // options: {
  //   // eslint-disable-next-line no-inline-comments
  //   maxAge: days30,
  //   httpOnly: true,
  //   secure: false,
  //   path: '/',
  //   sameSite: 'strict',
  //   domain: undefined,
  // }
  optionsJwt: {
    expiresIn: '30d',
    noTimestamp: true,
    subject: '1234567890',
    issuer: 'billiards-web',
    audience: ['billiards-web']
  }
};

export const getLoginSession = (token: string) => {
  let verifyErr: jwt.VerifyErrors | undefined;

  const session: G.ICookieParsed & jwt.JwtPayload = jwt.verify(
    token,
    sessionData?.secret,
    sessionData?.optionsJwt,
    (err, decoded) => {
      // console.log({
      //   cause: err?.cause,
      //   inner: err?.inner,
      //   message: err?.message,
      //   name: err?.name,
      //   stack: err?.stack
      // });

      if (err) {
        verifyErr = err;
        return {};
      }

      return decoded;
    }
  ) as any;

  if (verifyErr?.name === 'TokenExpiredError') {
    assertServer(false, StatusCodes.UNAUTHORIZED, `Session expired`);
  }

  if (verifyErr) {
    assertServer(false, StatusCodes.UNAUTHORIZED, `Verify error`);
  }

  if (!session?.user) {
    assertServer(false, StatusCodes.UNAUTHORIZED, `User not found in session`);
  }

  if (!session?.hasura) {
    assertServer(
      false,
      StatusCodes.UNAUTHORIZED,
      `Hasura not found in session`
    );
  }

  return {
    user: session?.user,
    hasura: session?.hasura
  };
};

export const createLoginSession = (session: G.ICookieParsed | undefined) => {
  const objJWT: G.ICookieParsed = {
    user: session?.user,
    hasura: session?.hasura
  };

  try {
    return jwt.sign(objJWT, sessionData?.secret, sessionData?.optionsJwt);
  } catch (error: any) {
    console.error(`createLoginSession > error: ${error?.toString()}`);
    return '';
  }
};
