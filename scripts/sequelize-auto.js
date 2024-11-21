/* eslint-disable @typescript-eslint/no-var-requires */
(async function sequelizeAutogen() {
  const path = require('path').posix;

  require('dotenv').config({ path: path.resolve('.env.development.local') });
  require('dotenv').config({ path: path.resolve('.env.development') });
  require('dotenv').config({ path: path.resolve('.env') });

  const dbConnectionStr = process.env.DATABASE_URL;
  if (!dbConnectionStr) throw new Error('Missing database connection string');

  const connectionStringRegex =
    /^postgres:\/\/(?<username>.+):(?<password>.+)@(?<host>.+):(?<port>.+)\/(?<database>.+)$/;
  const match = dbConnectionStr.match(connectionStringRegex)?.groups;
  const { host, port, username, password, database } = match || {};
  if (!host) throw new Error('Missing database host');
  if (!port) throw new Error('Missing database port');
  if (!username) throw new Error('Missing database username');
  if (!password) throw new Error('Missing database password');
  if (!database) throw new Error('Missing database name');

  const { SequelizeAuto } = require('sequelize-auto');

  const modelsPath = path.resolve(
    `./src/pages/api/utils/sequelize/${database}/models/public`
  );
  await new SequelizeAuto(database, username, password, {
    host,
    port,
    directory: modelsPath,
    dialect: 'postgres',
    lang: 'ts',
    schema: 'public',
    useDefine: false,
    singularize: true,
    noAlias: true,
    caseModel: 'o',
    caseFile: 'k',
    additional: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  }).run();
})();
