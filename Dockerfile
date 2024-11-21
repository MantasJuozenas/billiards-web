FROM node:16-bullseye

ARG LOCALE
ARG GEO_URL
ARG IPSTACK_URL
ARG API_URL
ARG AUTH_COOKIE_NAME
ARG GQL_ADMIN_SECRET
ARG GQL_API_URL
ARG GQL_WS_API_URL
ARG TOKEN_SECRET
ARG AUTH_DOMAIN
ARG DATABASE_URL
ARG IS_STAGING
ARG DEFAULT_LOCALE
ARG SITE_URL
ARG IGNORE_CHECK_TYPES_BUILD
ARG PROD_TESTING_ENABLED
ARG RE_CAPTCHA_KEY_CLIENT
ARG RE_CAPTCHA_KEY_SERVER
ARG LOGIN_PASSWORD
ARG MAP_API_KEY
ARG CITY


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app



# RUN  ssh-keyscan git@gitlab.com > /etc/ssh/ssh_known_hosts 
# run ssh -o UserKnownHostsFile=file git@github.com
# Cache package installation if no modifications happened

COPY package.json yarn.lock /usr/src/app/
RUN yarn --pure-lockfile

COPY . /usr/src/app

ENV NODE_ENV=production \
    PORT=80 \
    HOST=0.0.0.0

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]
