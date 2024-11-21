import { createActionCreator as action } from '@reduxify/utils';

import { ISetBreakpoint, IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const setUaInfo = action<ST['ua']>('device.set_ua_info');
export const setBreakpoint = action<ISetBreakpoint>('device.set_breakpoint');
export const setWindowScroll = action<{pageYOffset: number}>('device.set_window_scroll');
export const setOperatingSystem = action<ST['operatingSystem']>('device.set_operating_system');
export const setServiceWorkerInstalled = action<ST['serviceWorker']['installed']>('device.set_service_worker_installed');
export const setServiceWorkerUpdateAvailable = action<ST['serviceWorker']['updateAvailable']>('device.set_service_worker_update_available');
/* Saga actions */