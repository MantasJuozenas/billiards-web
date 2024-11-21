// import { ELoginResError } from '@typings/custom/enum-custom';
// import assert from '@utilsFn/assert-server';
// import { StatusCodes } from 'http-status-codes';
import { Strategy } from 'passport-local';

// import { selectUsers, Users } from '../../sequelize/main-db/models';

export const changePasswordStrategy = new Strategy(
  {
    session: false,
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (_req, _username, _password, _next) => {
    // try {
    //   const user = await Users.findOne<Users>({
    //     where: { username },
    //     attributes: [...selectUsers, 'password']
    //   });
    //   assert(user, StatusCodes.NOT_FOUND, ELoginResError.noUser);
    //   const userJSON = user?.toJSON() as Users;
    //   // eslint-disable-next-line prettier/prettier
    //   const passwordIsValid = await Users.comparePasswords(password, userJSON?.password);
    //   // eslint-disable-next-line prettier/prettier
    //   assert(passwordIsValid, StatusCodes.UNAUTHORIZED, ELoginResError.passwordError);
    //   const newPasswordHash = await Users.hashPassword(req?.body?.passwordNew);
    //   user.setDataValue('password', newPasswordHash);
    //   await user.save();
    //   next(null, { id: userJSON?.id });
    // } catch (error: any) {
    //   if (error instanceof assert.ServerError) {
    //     next(error);
    //   } else {
    //     next(new assert.ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    //   }
    // }
  }
);
