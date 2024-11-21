/* eslint-disable @typescript-eslint/no-var-requires */
const dotENV = require('dotenv');
const { execSync } = require('child_process');

const appStart = () => {
  /* eslint-disable prettier/prettier */
  const appDevENV = dotENV.config({ path: './.env.development' }).parsed;
  const appDevLocalENV = dotENV.config({ path: './.env.development.local' }).parsed;
  const appENV = { ...appDevENV, ...appDevLocalENV };
  const { npm_config_registry, npm_config_npm_IF_NPM, npm_config_npm_IF_YARN } = process.env;
  /* eslint-enable prettier/prettier */
  const hostDev2 = '192.168.88.217';
  const hostWork2 = '192.168.1.250';
  const hostWork3 = '192.168.1.68';

  let { HOST } = appENV;
  const { PORT } = appENV;

  try {
    if (npm_config_registry === npm_config_npm_IF_NPM) {
      // eslint-disable-next-line no-console
      console.info('>>> npm command found <<<');

      if (appENV.HOST.includes(hostDev2)) {
        HOST = 'dev.pixinn.lt';
      } else if (
        appENV.HOST.includes(hostWork2) ||
        appENV.HOST.includes(hostWork3)
      ) {
        HOST = 'work.pixinn.lt';
      }
      // eslint-disable-next-line no-console
      console.info(`>>> Server started on http://${HOST}:${PORT} <<<`);

      execSync(`npm run next dev -- -H ${appENV.HOST} -p ${appENV.PORT}`, {
        stdio: 'inherit'
      });
    } else if (npm_config_registry === npm_config_npm_IF_YARN) {
      // eslint-disable-next-line no-console
      console.log('>>> yarn command found <<<');

      if (appENV.HOST.includes(hostDev2) || appENV.HOST.includes(hostWork3)) {
        HOST = 'dev.pixinn.lt';
      } else if (appENV.HOST.includes(hostWork2)) {
        HOST = 'work.pixinn.lt';
      }
      // eslint-disable-next-line no-console
      console.info(`>>> Server started on http://${HOST}:${PORT} <<<`);

      execSync(`yarn next dev -H ${appENV.HOST} -p ${appENV.PORT}`, {
        stdio: 'inherit'
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('>>> No known command found. Use npm or yarn. <<<');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('app-start.js ERROR', error);
  }
};

appStart();
