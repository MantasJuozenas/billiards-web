import { createReducer as reducer, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';
import { EBreakpoint } from 'src/typings/custom/enum-custom';

import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  pageYOffset: reducer<ST['pageYOffset']>(ds.pageYOffset,
    reduce(A.setBreakpoint, (s, { payload: pl }) => pl?.pageYOffset),
    reduce(A.setWindowScroll, (s, { payload: pl }) => pl?.pageYOffset)),
  screenWidth: reducer<ST['screenWidth']>(ds.screenWidth,
    reduce(A.setBreakpoint, (s, { payload: pl }) => pl?.screenWidth)),
  screenHeight: reducer<ST['screenHeight']>(ds.screenHeight,
    reduce(A.setBreakpoint, (s, { payload: pl }) => pl?.screenHeight)),
  breakpoint: reducer<ST['breakpoint']>(ds.breakpoint,
    reduce(A.setBreakpoint, (s, {payload: pl}) => pl?.breakpoint)),
  serviceWorker: reducer<ST['serviceWorker']>(ds.serviceWorker,
    reduce(A.setServiceWorkerInstalled, (s, { payload: pl }) => ({ ...s, installed: pl })),
    reduce(A.setServiceWorkerUpdateAvailable, (s, { payload: pl }) => ({ ...s, updateAvailable: pl }))),
  isMobile: reducer<ST['isMobile']>(ds.isMobile,
      reduce(A.setBreakpoint, (s, { payload: pl }) => EBreakpoint.ExtraSmall === pl?.breakpoint || EBreakpoint.Small === pl?.breakpoint)),
  isTablet: reducer<ST['isTablet']>(ds.isTablet,
    reduce(A.setBreakpoint, (s, { payload: pl }) => EBreakpoint.Tablet === pl?.breakpoint)),
  isDesktop: reducer<ST['isDesktop']>(ds.isDesktop,
    reduce(A.setBreakpoint, (s, { payload: pl }) => (
      EBreakpoint.Medium === pl?.breakpoint ||
      EBreakpoint.Large === pl?.breakpoint ||
      EBreakpoint.ExtraLarge === pl?.breakpoint))),
  operatingSystem: reducer<ST['operatingSystem']>(ds.operatingSystem,
    reduce(A.setOperatingSystem, set)),
  ua: reducer<ST['ua']>(ds.ua,
    reduce(A.setUaInfo, set))
});
