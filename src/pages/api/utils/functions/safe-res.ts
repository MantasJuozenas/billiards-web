import { StatusCodes } from 'http-status-codes';

export const sRes = (
  res: G.TNextApiResponse,
  resCode: StatusCodes,
  resData?: G.TApiRes
) => {
  if (res?.headersSent) return;
  if (resData !== undefined) return res.status(resCode).json(resData);
  return res.status(resCode).end();
};

export const sResHeaders = (
  res: G.TNextApiResponse,
  name: string,
  value: string | number | readonly string[]
) => {
  if (!res?.headersSent) return res.setHeader(name, value);
};
