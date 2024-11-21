/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
export const NODE_ENV = process.env.NODE_ENV;
export const SITE_URL = process.env.SITE_URL;
export const TARGET = process.env.TARGET || '';
export const LOCALE = process.env.LOCALE || '';
export const GEO_URL = process.env.GEO_URL || '';
export const API_URL = process.env.API_URL || '';
export const IPSTACK_URL = process.env.IPSTACK_URL || '';
export const GQL_API_URL = process.env.GQL_API_URL || '';
export const GQL_WS_API_URL = process.env.GQL_WS_API_URL || '';
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || '';
export const PROD_TESTING_ENABLED = process.env.PROD_TESTING_ENABLED;
export const RE_CAPTCHA_KEY_CLIENT = process.env.RE_CAPTCHA_KEY_CLIENT || '';
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE as G.TDefaultLocales;
export const CITY = process.env.CITY || '';

export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_STAGING = process.env.IS_STAGING === '1';
export const IS_PROD = process.env.NODE_ENV === 'production';

export const DEV_TOOLS = true;

export const LOCAL_STORAGE_AUTH_COOKIE_NAME = AUTH_COOKIE_NAME;
export const LOCAL_STORAGE_REMEMBER_USER = 'remember-billiards-web';
export const LOCAL_STORAGE_LOCALE = LOCALE || 'locale-billiards-web';
export const LOCAL_STORAGE_COOKIE_POLICY_ACCEPT = 'cookie-policy-accept-billiards-web';
export const LOCAL_STORAGE_FLAG_SIDE_PANEL_COLLAPSED = 'side-panel-collapsed-billiards-web';

export const SELECT_LIMIT = 100;
export const PAGE_SIZE_LIMIT = 30;
export const MAP_API_KEY = 'AIzaSyDVL-pCmdSO3UnRJ_PXxSjHSuay8XR2k0Y';
export const SET_MOBILE_BACK_BUTTON = 'SET_MOBILE_BACK_BUTTON';
export const REMOVE_MOBILE_BACK_BUTTON = 'REMOVE_MOBILE_BACK_BUTTON';

export const CLASSNAME_MODAL_SELECT_POPUP_MENU = 'ModalSelect_popupMenu';
export const ALPHABET_EN = 'abcdefghijklmnopqrstuvwxyz';

export const DEV_URL = (process?.env?.HOST || '').includes('192.168.88.217') ||
    (process?.env?.HOST || '').includes('192.168.1.250')
    ? `http://work.pixinn.lt:${process?.env?.PORT}`
    : `http://${process?.env?.HOST}:${process?.env?.PORT}`;

export const LAYOUT_WIDTH = 1180;
export const NAVBAR_SIDE_PANEL_WIDTH = 300;
export const NAVBAR_HEIGHT_DESKTOP = 90;
export const NAVBAR_HEIGHT_TABLET = 90;
export const NAVBAR_HEIGHT_MOBILE = 70;
export const FOOTER_HEIGHT_DESKTOP = 90;
export const FOOTER_HEIGHT_TABLET = 90;
export const FOOTER_HEIGHT_MOBILE = 141;
export const PAGE_PADDING_SIDE_DESKTOP = 90;
export const PAGE_PADDING_SIDE_TABLET = 30;
export const PAGE_PADDING_SIDE_MOBILE = 15;

export const COMPANY_CONTACTS = {
    'Savanorių pr. 363 Kaunas': {
        name: 'Arena Billiards',
        street: 'Savanorių pr.',
        houseNumber: '363',
        postCode: '',
        city: 'Kaunas',
        district: 'Kaunas',
        country: 'Lithuania',
        email: 'biliardine@pub.lt',
        phone: '(8-616) 99944',
        companyCode: '',
        location: { lat: 54.921_921, lng: 23.957_247 },
        workingHours: {
            0: { from: '12:00', to: '23:30', nextDayTo: true },
            1: { from: '16:00', to: '23:30', nextDayTo: false },
            2: { from: '16:00', to: '23:30', nextDayTo: false },
            3: { from: '16:00', to: '23:30', nextDayTo: false },
            4: { from: '16:00', to: '23:30', nextDayTo: false },
            5: { from: '16:00', to: '23:30', nextDayTo: false },
            6: { from: '12:00', to: '23:30', nextDayTo: true }
        }
    },
    'Verkių g. 29, 09108 Vilnius': {
        name: 'Darts Billiards',
        street: 'Verkių g.',
        houseNumber: '29',
        postCode: '09108',
        city: 'Vilnius',
        district: 'Vilnius',
        country: 'Lithuania',
        email: 'dartsbilliards@gmail.com',
        phone: '(8-617) 44411',
        companyCode: '',
        location: { lat: 54.713_793_2, lng: 25.294_196_1 },
        workingHours: {
            0: { from: '14:00', to: '23:30', nextDayTo: true },
            1: { from: '16:00', to: '23:30', nextDayTo: false },
            2: { from: '16:00', to: '23:30', nextDayTo: false },
            3: { from: '16:00', to: '23:30', nextDayTo: false },
            4: { from: '16:00', to: '23:30', nextDayTo: false },
            5: { from: '16:00', to: '23:30', nextDayTo: false },
            6: { from: '14:00', to: '23:30', nextDayTo: true }
        }
    }
};

// [pool, dart]
export const TIME_BLOCKING_EVENT_COLORS = {
	'01': '#ff3b3b',
	'10': '#3d3dff',
	'11': '#8d36ff'
}
