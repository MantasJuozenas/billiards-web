import { StatusCodes } from 'http-status-codes';

export function assertServer(condition: any, error: Error): asserts condition;
export function assertServer(
  condition: any,
  code: StatusCodes,
  message: any
): asserts condition;
export function assertServer(...args: any[]) {
  const [condition, ...rest] = args || [];
  if (!condition) {
    if (rest[0] instanceof Error) throw rest[0];
    throw new assertServer.ServerError(rest[0], rest[1]);
  }
}

export namespace assertServer {
  export interface IServerError<T = any> {
    data: T;
    status: number;
  }

  export class ServerError<T> extends Error {
    public data: T;

    public status: number;

    constructor(status: number, message: T) {
      super();
      this.data = message;
      this.status = status;
    }
  }

  export function throwError<T>(status: number, msg: T) {
    throw new ServerError(status, msg);
  }
}
