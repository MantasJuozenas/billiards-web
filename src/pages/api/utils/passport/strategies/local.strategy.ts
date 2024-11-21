import { Strategy } from 'passport-local';

export const localStrategy = new Strategy(
  {
    session: false,
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, username, password, next) => {
    // console.log('localStrategy');
    next(null, { id: 3 });
  }
);
