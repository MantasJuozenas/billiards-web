import { NextRouter } from 'next/router';
import { Dispatch } from 'redux';

export const HandlerPathnameChange = (
  _props: NHandlerPathnameChange.IProps
) => {
  // eslint-disable-next-line no-useless-return
  return;
};

export namespace NHandlerPathnameChange {
  export interface IProps {
    router: NextRouter;
    dispatch: Dispatch;
  }
}
