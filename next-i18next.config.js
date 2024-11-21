const isDev = process.env.NODE_ENV === 'development';
const defaultLocale = process.env.DEFAULT_LOCALE;

/** @type {import('next-i18next').UserConfig} */
const config = {
  i18n: {
    locales: ['en', 'lt'],
    defaultLocale,
    localeDetection: false
    // localePath: path.resolve('./public/locales')
  },
  defaultNS: 'common',
  localeExtension: 'json',
  localePath: './public/locales',
  localeStructure: '{{lng}}/{{ns}}',
  reloadOnPrerender: isDev,
  serializeConfig: true,
  strictMode: true,
  // debug: isDev,
  debug: false,
  saveMissing: true,
  keySeparator: '::',
  nsSeparator: ':::'
  /**
   * Accepts other i18n options
   * https://www.i18next.com/overview/configuration-options
   */
};

module.exports = config;
