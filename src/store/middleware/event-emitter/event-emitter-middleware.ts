import { Middleware } from 'redux';

import { eventEmitter } from './event-emitter';

export const createEventEmitterMiddleware: Middleware =
  // eslint-disable-next-line unicorn/consistent-function-scoping
  (_storeAPI) => (next) => (action) => {
    eventEmitter.emit(action.type, action.payload);

    return next(action);
  };
