// /* eslint-disable lines-between-class-members */
import { SALT_ROUNDS } from '@pages/api/utils/backend-constants';
// import { ERoles } from '@typings/graphql/enum-schema';
import bcrypt from 'bcrypt';
// import { Association, DataTypes, Model, Optional } from 'sequelize';

// import { sequelize } from '..';
// import { ITokenAttributes, Token } from './token';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  password: string,
  currPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, currPassword);
  } catch {
    return false;
  }
};

// export const selectUsers = [
//   'id',
//   'created_at',
//   'updated_at',
//   'username',
//   'password',
//   'blocked',
//   'role_id',
//   'name',
//   'email'
// ];

// export interface IUsersAttributes {
//   id?: number;
//   created_at?: Date;
//   updated_at?: Date;
//   username?: string;
//   password?: string;
//   blocked?: boolean;
//   role_id?: number;
//   name?: string;
//   email?: string;

//   Tokens?: ITokenAttributes[];
// }
// // Some attributes are optional in `User.build` and `User.create` calls
// type UsersCreationAttributes = Optional<IUsersAttributes, 'id'>;

// export class Users
//   extends Model<IUsersAttributes, UsersCreationAttributes>
//   implements IUsersAttributes
// {
//   public id!: number;
//   public created_at!: Date;
//   public updated_at!: Date;
//   public username!: string;
//   public password!: string;
//   public blocked!: boolean;
//   public role_id!: number;
//   public name!: string;
//   public email!: string;

//   public readonly Tokens?: Token[];

//   public static associations: {
//     Tokens: Association<Users, Token>;
//   };

//   public static async hashPassword(password: string) {
//     return await hashPassword(password);
//   }

//   public static async comparePasswords(
//     password: string,
//     currPassword: string
//   ): Promise<boolean> {
//     return await comparePasswords(password, currPassword);
//   }

//   public static async setDefaultRoleId(user: Users) {
//     if (!user?.role_id) {
//       return ERoles.user;
//     }
//     return user?.role_id;
//   }
// }

// Users.init(
//   {
//     id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true },
//     created_at: { type: DataTypes.DATE, field: 'created_at' },
//     updated_at: { type: DataTypes.DATE, field: 'updated_at' },
//     username: { type: DataTypes.STRING, field: 'username', unique: true },
//     password: { type: DataTypes.STRING, field: 'password' },
//     blocked: { type: DataTypes.BOOLEAN, field: 'blocked' },
//     role_id: { type: DataTypes.NUMBER, field: 'role_id' },
//     name: { type: DataTypes.STRING, field: 'name' },
//     email: { type: DataTypes.STRING, field: 'email' }
//   },
//   {
//     sequelize,
//     underscored: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//     deletedAt: false,
//     tableName: 'user',
//     paranoid: false,
//     hooks: {
//       beforeCreate: async (user, _options) => {
//         const userJSON = user?.toJSON() as Users;
//         /* eslint-disable prettier/prettier */
//         user.setDataValue('password', await Users.hashPassword(userJSON?.password));
//         if (!userJSON?.role_id) {
//           user.setDataValue('role_id', await Users.setDefaultRoleId(userJSON));
//         }
//         /* eslint-enable prettier/prettier */
//       },
//       beforeBulkUpdate: async (options) => {
//         // @ts-ignore
//         if (options?.attributes?.password) {
//           // @ts-ignore
//           options.attributes.password = await Users.hashPassword(
//             // @ts-ignore
//             options.attributes.password
//           );
//         }
//       }
//     }
//   }
// );

// export const UsersAssociation = () => {
//   Users.hasMany(Token, {
//     sourceKey: 'id',
//     foreignKey: 'user_id',
//     as: 'Tokens'
//   });
// };
export {}