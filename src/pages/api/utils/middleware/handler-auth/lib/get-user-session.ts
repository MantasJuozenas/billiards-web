import { assertServer } from '@pages/api/utils/functions/assert-server';
import { sNext } from '@pages/api/utils/functions/safe-next';
import { StatusCodes } from 'http-status-codes';

import { getLoginSession } from './session';

export const getUserSession = async (
  req: G.IExtendedRequest,
  res: G.TNextApiResponse,
  next: G.TNextHandler
) => {
  // console.log('__getUserSession');

  // const cookies = parseCookies(req);
  // const currToken = cookies?.[name] || (req?.headers?.[name] as string);
  const authorization = req?.headers?.authorization || '';
  const currToken = authorization?.split?.('Bearer ')?.[1] || '';
  // console.log({ currToken, authorization: req?.headers?.authorization });

  assertServer(
    currToken,
    StatusCodes.INTERNAL_SERVER_ERROR,
    `Auth token not found`
  );

  req.session = { currToken };
  /**
   * The cookie needs to be unsealed using the password `secret`
   */
  const unsealed = getLoginSession(currToken);

  assertServer(
    unsealed,
    StatusCodes.INTERNAL_SERVER_ERROR,
    `Failed to get login session`
  );
  /**
   * Unsealed cookie data goes to 'req.session' for further use
   */
  req.session = { ...unsealed, currToken };

  return sNext(res, next);
};
