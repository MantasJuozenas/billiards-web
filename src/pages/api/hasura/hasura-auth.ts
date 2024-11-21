// import { IS_PROD, IS_STAGING } from '@constants/app-constants';
// import { ERoles } from '@typings/graphql/enum-schema';
// import { parseCookies } from '@utilsFn/parse-cookies';
// import { StatusCodes } from 'http-status-codes';
// import { NextApiRequest, NextApiResponse } from 'next';
// import nextConnect from 'next-connect';

// import { sRes } from '../utils/functions/safe-res';
// import {
//   getLoginSession,
//   sessionData
// } from '../utils/middleware/handler-auth/lib/session';

// const handlerHasuraAuth = nextConnect<NextApiRequest, NextApiResponse>();

// handlerHasuraAuth.use(async (req, res, next) => {
//   const { name, secret } = sessionData;

//   const cookieNameDEV = 'auth-dev-billiards-web';
//   const cookieNameSTAGING = 'auth-staging-billiards-web';
//   const cookieNamePROD = name;

//   const cookies = parseCookies(req);
//   /* eslint-disable prettier/prettier */
//   const currTokenDEV = cookies?.[cookieNameDEV] || (req?.headers?.[cookieNameDEV] as string);
//   const currTokenSTAGING =  cookies?.[cookieNameSTAGING] || (req?.headers?.[cookieNameSTAGING] as string);
//   const currTokenPROD = cookies?.[cookieNamePROD] || (req?.headers?.[cookieNamePROD] as string);
//   /* eslint-enable prettier/prettier */
//   let currToken = currTokenDEV;
//   if (IS_PROD && IS_STAGING) currToken = currTokenSTAGING;
//   if (IS_PROD && !IS_STAGING) currToken = currTokenPROD;

//   const hasuraAuthDefault: G.IHasuraAuth = { 'x-hasura-role': 'public' };

//   const hasuraAuth: G.IHasuraAuth = { ...hasuraAuthDefault };

//   try {
//     const unsealed: G.ICookieParsed = await getLoginSession(
//       currToken,
//       secret,
//       next
//     );

//     if (!unsealed) {
//       return sRes(res, StatusCodes.OK, hasuraAuthDefault);
//     }

//     let userRoleName: G.IHasuraAuth['x-hasura-role'] = 'public';
//     /* eslint-disable prettier/prettier */
//     if (unsealed?.user?.role_id === ERoles.admin) userRoleName = 'administrator';
//     if (unsealed?.user?.role_id === ERoles.user) userRoleName = 'user';
//     /* eslint-enable prettier/prettier */
//     hasuraAuth['x-hasura-role'] = userRoleName;

//     console.error({ hasuraAuth });

//     return sRes(res, StatusCodes.OK, hasuraAuth);
//   } catch (error) {
//     console.error({ hasuraAuthDefault });
//     console.error('handlerHasuraAuth > ERROR', error);
//     return sRes(res, StatusCodes.OK, hasuraAuthDefault);
//   }
// });

// export default handlerHasuraAuth;
export {};
