/* eslint-disable unicorn/prefer-export-from */
import { DefaultDesktop } from './default-desktop';
import { DefaultMobile } from './default-mobile';
import { DefaultTablet } from './default-tablet';

export namespace FooterDefaultAdmin {
  export const D = DefaultDesktop;
  export const T = DefaultTablet;
  export const M = DefaultMobile;
}