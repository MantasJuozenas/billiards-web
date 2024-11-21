import { IS_PROD } from '@constants/app-constants';
import { SequelizeOptions } from 'sequelize-typescript';

interface IConfig {
  uri?: string;
  options?: SequelizeOptions;
}

const prodConfig: IConfig = {
  uri: process.env.DATABASE_URL,
  options: {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30_000,
      idle: 10_000
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    dialectOptions: {
      // eslint-disable-next-line no-inline-comments
      useUTC: false // for reading from database
    }
  }
};

const devConfig: IConfig = {
  uri: process.env.DATABASE_URL,
  options: {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30_000,
      idle: 10_000
    },
    // eslint-disable-next-line no-console
    logging: console.log,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    dialectOptions: {
      // eslint-disable-next-line no-inline-comments
      useUTC: false // for reading from database
    }
  }
};

export const config = IS_PROD ? prodConfig : devConfig;