import { EBreakpoint } from 'src/typings/custom/enum-custom';
import { IResult } from 'ua-parser-js';

export interface IState {
  pageYOffset: number;
  screenWidth: number;
  screenHeight: number;
  breakpoint: G.EBreakpoint;
  serviceWorker: {
    installed: boolean;
    updateAvailable: boolean;
  };
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  operatingSystem: G.TOperatingSystem;
  ua: IResult;
}

export type ISetBreakpoint = Pick<
  IState,
  'breakpoint' | 'pageYOffset' | 'screenWidth' | 'screenHeight'
>;

export const defaultState: IState = {
  pageYOffset: 0,
  screenWidth: 0,
  screenHeight: 0,
  breakpoint: EBreakpoint.Small,
  serviceWorker: {
    installed: false,
    updateAvailable: false
  },
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  operatingSystem: 'web',
  ua: {
    browser: {
      major: undefined,
      name: undefined,
      version: undefined
    },
    cpu: {
      architecture: undefined
    },
    device: {
      model: undefined,
      type: undefined,
      vendor: undefined
    },
    engine: {
      name: undefined,
      version: undefined
    },
    os: {
      name: undefined,
      version: undefined
    },
    ua: ''
  }
};
