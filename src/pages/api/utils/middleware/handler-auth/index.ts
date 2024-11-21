import nc from 'next-connect';
import passport from 'passport';

import { onError, onErrorOk } from '../../functions/on-error';
import { checkUserSession } from './lib/check-user-session';
import { getUserSession } from './lib/get-user-session';
import { userSessionUpdate } from './lib/user-session-update';

export const handlerAuth = (props?: NHandlerAuth.IProps) => {
  const error = props?.onError || 'ok';
  const onErrorReturn = error === 'ok' ? onErrorOk : onError;

  return (
    nc<G.TNextApiRequest, G.TNextApiResponse>({ onError: onErrorReturn })
      .use(getUserSession)
      .use(checkUserSession)
      .use(userSessionUpdate)
      // .use((req, res) => {
      //   // this will run if next() is called in onError
      //   sRes(res.end('error no more'));
      // })
      .use(passport.initialize())
      .use(passport.session())
  );
};

export namespace NHandlerAuth {
  export interface IProps {
    onError?: 'ok' | 'error';
  }
}
