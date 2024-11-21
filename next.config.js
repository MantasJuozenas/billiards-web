/* eslint-disable @typescript-eslint/no-var-requires */
const dotENV = require('dotenv');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const locales = require('./next-i18next.config');
const { BuildRewritesBeforeFiles } = require('./src/constants/app-routes');

const isDev = process.env.NODE_ENV === 'development';
const ignoreCheckTypes = process.env.IGNORE_CHECK_TYPES_BUILD === '1';

console.error({ isDev, ignoreCheckTypes });

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    newNextLinkBehavior: true
    // images: { unoptimized: true }
  },
  eslint: {
    /**
     * !! Warning !!
     * This allows production builds to successfully complete even if your project has ESLint errors.
     * !! Warning !!
     */
    ignoreDuringBuilds: ignoreCheckTypes
  },
  typescript: {
    /**
     * !! Warning !!
     * Dangerously allow production builds to successfully complete even if your project has type errors.
     * !! Warning !!
     */
    ignoreBuildErrors: ignoreCheckTypes
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  webpack: (config, _options) => {
    // eslint-disable-next-line prettier/prettier
    config?.externals?.push?.({ xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}' });

    return config;
  },
  images: {
    domains: ['ets-files.s3.eu-north-1.amazonaws.com']
  },
  env: isDev
    ? {
        ...dotENV.config({ path: './.env' }).parsed,
        ...dotENV.config({ path: './.env.development' }).parsed,
        ...dotENV.config({ path: './.env.development.local' }).parsed
      }
    : {
        ...dotENV.config({ path: './.env' }).parsed,
        ...dotENV.config({ path: './.env.production' }).parsed,
        ...dotENV.config({ path: './.env.production.local' }).parsed,

        LOCALE: process.env.LOCALE,
        GEO_URL: process.env.GEO_URL,
        API_URL: process.env.API_URL,
        SITE_URL: process.env.SITE_URL,
        IS_STAGING: process.env.IS_STAGING,
        IPSTACK_URL: process.env.IPSTACK_URL,
        GQL_API_URL: process.env.GQL_API_URL,
        IIKO_API_URL: process.env.IIKO_API_URL,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        DATABASE_URL: process.env.DATABASE_URL,
        TOKEN_SECRET: process.env.TOKEN_SECRET,
        DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
        GQL_WS_API_URL: process.env.GQL_WS_API_URL,
        LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
        AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
        GQL_ADMIN_SECRET: process.env.GQL_ADMIN_SECRET,
        PROD_TESTING_ENABLED: process.env.PROD_TESTING_ENABLED,
        RE_CAPTCHA_KEY_CLIENT: process.env.RE_CAPTCHA_KEY_CLIENT,
        RE_CAPTCHA_KEY_SERVER: process.env.RE_CAPTCHA_KEY_SERVER,
        IGNORE_CHECK_TYPES_BUILD: process.env.IGNORE_CHECK_TYPES_BUILD,
        MAP_API_KEY: process.env.MAP_API_KEY,
        CITY: process.env.CITY
      },
  i18n: locales.i18n,
  rewrites: async () => {
    const { beforeFiles } = BuildRewritesBeforeFiles();
    console.error({ beforeFiles });

    return { beforeFiles };
  }
  // async redirects() {
  //   return [
  //     {
  //       source: '/:specialistid',
  //       destination: '/beauty-specialist/:specialistid',
  //       permanent: false
  //     }
  //   ];
  // },
};

module.exports = withPlugins(
  [withBundleAnalyzer(nextConfig), withImages],
  nextConfig
);
