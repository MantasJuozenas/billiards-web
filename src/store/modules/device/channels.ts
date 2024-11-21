import { isNotBrowser } from '@utilsFn/check-browser';
import { noop } from '@utilsFn/noop';
import { END, eventChannel } from 'redux-saga';

export const createNetworkChannel = () =>
  eventChannel((emitter) => {
    if (isNotBrowser()) {
      emitter(END);
      return noop;
    }

    window.addEventListener('online', emitter);
    window.addEventListener('offline', emitter);

    return () => {
      window.removeEventListener('online', emitter);
      window.removeEventListener('offline', emitter);
    };
  });
