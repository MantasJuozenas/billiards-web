/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  // eslint-disable-next-line no-inline-comments
  generateRobotsTxt: true, // (optional)
  // ...other options
  // robotsTxtOptions: {
  //   policies: [{ userAgent: '*', disallow: ['/1'] }]
  // },
  exclude: ['/logout']
};

module.exports = config;
