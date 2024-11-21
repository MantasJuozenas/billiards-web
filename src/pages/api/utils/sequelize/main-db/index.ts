import { Sequelize } from 'sequelize';

import { config } from './config/config';

export const sequelize = new Sequelize(config.uri || '', { ...config.options });

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    // console.info(
    //   '>>> OK >>> sequelize.authenticate connection has been established successfully. <<<'
    // );
  })
  .catch((err) => {
    console.error(
      '>>> ERROR >>> sequelize.authenticate unable to connect to the database:',
      err
    );
  });