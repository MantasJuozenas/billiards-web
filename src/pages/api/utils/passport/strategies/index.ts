import passport from 'passport';

import { adminLoginStrategy } from './admin-login.strategy';
import { changePasswordStrategy } from './change-password.strategy';
import { localStrategy } from './local.strategy';
import { loginStrategy } from './login.strategy';

passport.serializeUser((user, done) => {
  // eslint-disable-next-line no-console
  console.log('serializeUser');
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // eslint-disable-next-line no-console
  console.log('deserializeUser');
  done(null, { id });
});

passport.use('local', localStrategy);
passport.use('login', loginStrategy);
passport.use('admin-login', adminLoginStrategy);
passport.use('change-password', changePasswordStrategy);

export const authenticate = (
  method: G.TAuthenticateMethod,
  req: G.IExtendedRequest,
  res: G.IExtendedResponse
) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      method,
      { session: false, passReqToCallback: true },
      (error, user) => {
        if (error) {
          reject(error);
        }
        req.user = user;
        resolve(user);
      }
    )(req, res);
  });
