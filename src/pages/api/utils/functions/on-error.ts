import { serialize } from 'cookie';
import { StatusCodes } from 'http-status-codes';

import {
  // createLoginSession,
  sessionData
} from '../middleware/handler-auth/lib/session';
// import { GetHasuraAuth } from './get-hasura-auth';
import { sRes, sResHeaders } from './safe-res';

// export const onError = async (
//   err: G.IServerError,
//   req: G.IExtendedRequest,
//   res: G.TNextApiResponse,
//   _next: G.TNextHandler
// ) => {
//   const params = req?.query;
//   // console.log('__onError', { params, err, session: req?.session });

//   if (params?.authCheck || params?.authLogout) {
//     const { name, options: cookieOpts, secret } = sessionData;

//     /**
//      * Create new token for public
//      */
//     const claims = GetHasuraAuth({ userRoleId: null }).hasuraAuth;

//     req.session = {};
//     req.session = { hasura: { claims } };

//     const newToken = createLoginSession(req?.session, secret);

//     sResHeaders(res, 'Set-Cookie', serialize(name, newToken, cookieOpts));

//     return sRes(res, StatusCodes.OK, {
//       status: 'ok',
//       payload: {
//         token: newToken,
//         status: err?.status,
//         msg: err?.data?.toString?.()
//       }
//     });
//   }

//   return sRes(res, StatusCodes.OK, {
//     status: 'error',
//     error: { status: err?.status, msg: err?.data?.toString?.() }
//   });

//   // // OR: you may want to continue
//   // _next(err);
// };

// export const onErrorOk = (
//   err: G.IServerError,
//   req: G.IExtendedRequest,
//   res: G.TNextApiResponse,
//   _next: G.TNextHandler
// ) => {
//   const params = req?.query;
//   // console.log('__onErrorOk', { params, err, session: req?.session });

//   if (params?.authCheck || params?.authLogout) {
//     const { name, options: cookieOpts, secret } = sessionData;

//     /**
//      * Create new token for public
//      */
//     const { hasuraAuth } = GetHasuraAuth({ userRoleId: null });

//     req.session = {};
//     req.session = { hasura: { claims: hasuraAuth } };

//     const newToken = createLoginSession(req?.session, secret);

//     sResHeaders(res, 'Set-Cookie', serialize(name, newToken, cookieOpts));

//     return sRes(res, StatusCodes.OK, {
//       status: 'ok',
//       payload: {
//         token: newToken,
//         status: err?.status,
//         msg: err?.data?.toString?.()
//       }
//     });
//   }

//   return sRes(res, StatusCodes.OK, {
//     status: 'error',
//     error: { status: err?.status, msg: err?.data?.toString?.() }
//   });

//   // // OR: you may want to continue
//   // _next(err);
// };

export const onError = async (
  err: G.IServerError,
  req: G.IExtendedRequest,
  res: G.TNextApiResponse,
  _next: G.TNextHandler
) => {
  const params = req?.query;
  // console.log('__onError', { params, err, session: req?.session });

  if (params?.authCheck || params?.authLogout) {
    const { name, options: cookieOpts } = sessionData;

    sResHeaders(
      res,
      'Set-Cookie',
      serialize(name, req?.session?.currToken || '', {
        ...cookieOpts,
        maxAge: 0
      })
    );
    sResHeaders(res, 'authorization', ``);

    req.session = {};
  }

  return sRes(res, err?.status, {
    status: 'error',
    error: { status: err?.status, msg: err?.data?.toString?.() }
  });

  // OR: you may want to continue
  // _next(err);
};

export const onErrorOk = async (
  err: G.IServerError,
  req: G.IExtendedRequest,
  res: G.TNextApiResponse,
  _next: G.TNextHandler
) => {
  const params = req?.query;
  // console.log('__onErrorOk', { params, err, session: req?.session });

  if (params?.authCheck || params?.authLogout) {
    const { name, options: cookieOpts } = sessionData;

    sResHeaders(
      res,
      'Set-Cookie',
      serialize(name, req?.session?.currToken || '', {
        ...cookieOpts,
        maxAge: 0
      })
    );
    sResHeaders(res, 'authorization', ``);

    req.session = {};
  }

  return sRes(res, StatusCodes.OK, {
    status: 'error',
    error: { status: err?.status, msg: err?.data?.toString?.() }
  });

  // OR: you may want to continue
  // _next(err);
};
