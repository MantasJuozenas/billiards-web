import { StatusCodes } from 'http-status-codes';
import { NextHandler } from 'next-connect';

import { assertServer } from './assert-server';

export const sNext = (
  res: G.TNextApiResponse,
  next: NextHandler,
  nextError?: {
    errCode: StatusCodes;
    errMsg: string;
    /** catch error */
    error?: any;
  }
) => {
  // console.log('sNext >>> res', res?.headersSent);
  // console.log('sNext >>> error', error?.toString?.());
  if (
    !res?.headersSent &&
    !nextError?.error
      ?.toString?.()
      ?.includes?.(`Cannot set headers after they are sent to the client`)
  ) {
    if (nextError) {
      return next(
        new assertServer.ServerError(
          nextError?.errCode,
          nextError?.errMsg || ''
        )
      );
    }
    if (!nextError) return next();
  }
};
