import { getBreakpoint } from '@utilsFn/breakpoint';
import { isNotBrowser } from '@utilsFn/check-browser';
import { noop } from '@utilsFn/noop';
import { END, eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { setBreakpoint } from '../actions';
import { ISetBreakpoint } from '../types';
import { setOperatingSystemSaga } from './set-operating-system.sagas';

interface IEventChannel {
  screenWidth: number;
  screenHeight: number;
  pageYOffset: number;
  visualViewportWidth: number;
  visualViewportHeight: number;
  breakpoint: G.EBreakpoint | END;
  scrollEvent?: boolean;
}

const createBreakpointChannel = () =>
  eventChannel<IEventChannel>((emitter) => {
    if (isNotBrowser()) {
      emitter(END);
      return noop;
    }

    const detect = () =>
      window?.requestAnimationFrame?.(() =>
        emitter({
          breakpoint: getBreakpoint(),
          pageYOffset: window?.pageYOffset,
          screenWidth: window?.innerWidth,
          screenHeight: window?.innerHeight,
          visualViewportWidth: window?.visualViewport?.width,
          visualViewportHeight: window?.visualViewport?.height
        })
      );
    detect();

    const handleScroll = (_e: any) => {
      emitter({
        scrollEvent: true,
        breakpoint: getBreakpoint(),
        pageYOffset: window?.pageYOffset,
        screenWidth: window?.innerWidth,
        screenHeight: window?.innerHeight,
        visualViewportWidth: window?.visualViewport?.width,
        visualViewportHeight: window?.visualViewport?.height
      });
    };

    window?.addEventListener?.('resize', detect);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener?.('resize', detect);
      window.removeEventListener('scroll', handleScroll);
    };
  });

export function* breakpointFlowSaga() {
  if (isNotBrowser()) return;

  const channel = createBreakpointChannel();

  while (true) {
    const payload: IEventChannel = yield take(channel);

    yield put(
      setBreakpoint({
        breakpoint: payload?.breakpoint as ISetBreakpoint['breakpoint'],
        pageYOffset: payload?.pageYOffset || 0,
        screenWidth: payload?.screenWidth || 0,
        screenHeight: payload?.screenHeight || 0
      })
    );

    if (!payload?.scrollEvent) {
      yield call(setOperatingSystemSaga);
    }
  }
}
