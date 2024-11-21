// /* eslint-disable lines-between-class-members */
// import { DataTypes, Model, Optional } from 'sequelize';

// import { sequelize } from '..';

// export const selectRoles = [
//   'id',
//   'role',
//   'display_name',
//   'created_at',
//   'updated_at'
// ];

// interface IRolesAttributes {
//   id: number;
//   role: string;
//   display_name: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

// type RolesCreationAttributes = Optional<IRolesAttributes, 'id'>;

// export class Roles
//   extends Model<IRolesAttributes, RolesCreationAttributes>
//   implements IRolesAttributes
// {
//   public id!: number;
//   public role!: string;
//   public display_name!: string;
//   public created_at!: Date;
//   public updated_at!: Date;
// }

// Roles.init(
//   {
//     id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true },
//     role: { type: DataTypes.STRING, field: 'role' },
//     display_name: { type: DataTypes.STRING, field: 'display_name' },
//     created_at: { type: DataTypes.DATE, field: 'created_at' },
//     updated_at: { type: DataTypes.DATE, field: 'updated_at' }
//   },
//   {
//     sequelize,
//     underscored: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at',
//     deletedAt: false,
//     tableName: 'roles',
//     paranoid: false,
//     hooks: {}
//   }
// );
export {}