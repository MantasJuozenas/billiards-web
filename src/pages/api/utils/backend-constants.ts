/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
export const GQL_ADMIN_SECRET = process.env.GQL_ADMIN_SECRET || '';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
export const AUTH_DOMAIN = process.env.AUTH_DOMAIN || '';
export const RE_CAPTCHA_KEY_SERVER = process.env.RE_CAPTCHA_KEY_SERVER || '';
export const IIKO_API_URL = process.env.IIKO_API_URL;
export const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';

export const IIKO_API_LOGIN = "";
export const IIKO_ORGANIZATION_ID = '';

export const IIKO_DATA_BY_LOCATION = {
    'Kaunas': {
        IIKO_ORGANIZATION_ID: '',
        IIKO_TERMINAL_GROUP_ID: ''
    },
    'Vilnius': {
        IIKO_ORGANIZATION_ID: '',
        IIKO_TERMINAL_GROUP_ID: ''
    }
}

export const SALT_ROUNDS = 10;

// ** Baltnet SMS **
export const NAMED_SENDER = '';
export const BALTNET_API_KEY = '';
export const BALTNET_LOGIN = '';


export const TABLES: Record<string, { tableId: string; tableNumber: number }> = {
  };