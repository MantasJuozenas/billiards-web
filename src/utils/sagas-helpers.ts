import { ActionWithPayload } from '@reduxify/utils';
import {
  call,
  delay as _delay,
  fork,
  take,
  takeEvery as _takeEvery,
  takeLatest as _takeLatest,
  takeLeading as _takeFirst
} from 'redux-saga/effects';

import { isNotBrowser } from './check-browser';

export function* takeEvery(action: any, saga: (_action: any) => any): any {
  if (isNotBrowser()) {
    return;
  }
  yield _takeEvery(action, function* (act) {
    try {
      yield call(saga, act);
    } catch (error) {
      console.error('takeEveryError', error);
    }
  });
}
export function* singleAction(action: any, saga: (_action: any) => any): any {
  if (isNotBrowser()) {
    return;
  }
  yield fork(function* () {
    try {
      const act: any = yield take(action);
      yield call(saga, act);
    } catch (error) {
      console.error('singleActionError', error);
    }
  });
}
export function* onLoad(saga: any): any {
  if (isNotBrowser()) {
    return;
  }
  try {
    yield fork(saga);
  } catch (error) {
    console.error('onLoadError', error);
  }
}
export function* takeLatest(
  action: any,
  saga: (_action: any) => any,
  delay?: number
): any {
  if (isNotBrowser()) {
    return;
  }
  yield _takeLatest(action, function* (a: any) {
    try {
      if (delay) {
        yield _delay(delay);
      }
      yield call(saga, a);
    } catch (error) {
      console.error('takeLatestError', error);
    }
  });
}

export function* takeFirst(action: any, saga: (_action: any) => any): any {
  if (isNotBrowser()) {
    return;
  }
  yield _takeFirst(action, function* (a: any) {
    try {
      yield call(saga, a);
    } catch (error) {
      console.error('takeFirstError', error);
    }
  });
}

export function lifecycleSaga<T>(saga: (action: any) => any) {
  return function* (action: ActionWithPayload<string, G.TLifecycleSaga<T>>) {
    try {
      yield action.payload?.onPrepare?.();
      // @ts-ignore
      const result = yield saga(action);
      yield action.payload?.onSuccess?.(result);
    } catch (error) {
      console.error('lifecycleSaga > ERROR:', { error });
      yield action.payload?.onError?.(error as any);
    } finally {
      yield action.payload?.onCleanup?.();
    }
  };
}
