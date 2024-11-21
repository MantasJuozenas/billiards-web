// /* eslint-disable lines-between-class-members */
// import { Association, DataTypes, Model, Optional } from 'sequelize';

// import { sequelize } from '..';
// import { Users } from './users';

// export const selectToken = ['id', 'created_at', 'token', 'user_id'];

// export interface ITokenAttributes {
//   id: number;
//   created_at?: Date;
//   token: string;
//   user_id: number;
// }

// type TokenCreationAttributes = Optional<ITokenAttributes, 'id'>;

// export class Token
//   extends Model<ITokenAttributes, TokenCreationAttributes>
//   implements ITokenAttributes
// {
//   public id!: number;
//   public created_at?: Date;
//   public token!: string;
//   public user_id!: number;

//   public readonly User?: Users;

//   public static associations: {
//     User: Association<Token, Users>;
//   };
// }

// Token.init(
//   {
//     id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true },
//     created_at: { type: DataTypes.DATE, field: 'created_at' },
//     token: { type: DataTypes.STRING, field: 'token' },
//     user_id: { type: DataTypes.STRING, field: 'user_id' }
//   },
//   {
//     sequelize,
//     underscored: true,
//     createdAt: 'created_at',
//     updatedAt: false,
//     deletedAt: false,
//     tableName: 'token',
//     paranoid: false,
//     hooks: {}
//   }
// );

// export const TokenAssociation = () => {
//   Token.hasOne(Users, {
//     sourceKey: 'user_id',
//     foreignKey: 'id',
//     as: 'User'
//   });
// };
export {}