import { isNotBrowser } from '@utilsFn/check-browser';
import { noop } from '@utilsFn/noop';
import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import {
  setServiceWorkerInstalled,
  setServiceWorkerUpdateAvailable
} from '../actions';
import * as serviceWorker from '../service-worker';

interface ServiceWorkerChannelAction {
  type: 'success' | 'update';
  registration: ServiceWorkerRegistration;
}

const createServiceWorkerChannel = () =>
  eventChannel<ServiceWorkerChannelAction>((emitter) => {
    serviceWorker.register({
      onSuccess: (registration) => emitter({ type: 'success', registration }),
      onUpdate: (registration) => emitter({ type: 'update', registration })
    });

    return noop;
  });

export function* serviceWorkerFlowSaga() {
  if (isNotBrowser()) return;

  const channel = createServiceWorkerChannel();

  while (true) {
    const { type }: ServiceWorkerChannelAction = yield take(channel);

    if (type === 'success') {
      yield put(setServiceWorkerInstalled(true));
    }

    if (type === 'update') {
      yield put(setServiceWorkerUpdateAvailable(true));
    }
  }
}
