/* eslint-disable no-underscore-dangle */
import { IS_PROD } from '@constants/app-constants';
import {
  devToolsEnhancerDevelopmentOnly,
  devToolsEnhancerLogOnlyInProduction,
  EnhancerOptions
} from '@redux-devtools/extension';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createEventEmitterMiddleware } from '@store/middleware/event-emitter';
import { isNotBrowser } from '@utilsFn/check-browser';
import {
  createRouterMiddleware,
  initialRouterState
} from 'connected-next-router';
import Router from 'next/router';
import { useMemo } from 'react';
import { AnyAction, EmptyObject, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { defaultStore as ds } from './types';

type TStore = EnhancedStore<EmptyObject & G.IStore, AnyAction>;

/**
 * createReduxDevToolsEnhancer
 */
const createReduxDevToolsEnhancer = () => {
  // if (!DEV_TOOLS) return;

  const devToolsOptions: EnhancerOptions = { name: 'Pixinn' };
  return IS_PROD
    ? devToolsEnhancerLogOnlyInProduction(devToolsOptions)
    : devToolsEnhancerDevelopmentOnly(devToolsOptions);
};

/**
 * reducer
 */
const reducer: Reducer<G.IStore, AnyAction> = (state, action) => {
  if (action?.type === 'HYDRATE') {
    const nextState = {
      // eslint-disable-next-line no-inline-comments
      ...state, // use previous state
      // eslint-disable-next-line no-inline-comments
      ...action?.payload // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    state = nextState;
  }

  const combinedReducer = rootReducer;
  return combinedReducer(state, action);
};

/**
 * initStore
 */
function initStore(preloadedState = ds) {
  /**
   * 1: Create the middlewares
   */
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware();
  const eventEmitterMiddleware = createEventEmitterMiddleware;

  const _middlewares = [
    sagaMiddleware,
    routerMiddleware,
    eventEmitterMiddleware
  ];

  // const { asPath } = context.ctx || Router.router || {};
  const { asPath } = Router.router || {};

  if (asPath?.length) {
    preloadedState = { ...preloadedState, router: initialRouterState(asPath) };
  }

  /**
   * 2: Create the enhancers
   */
  const _enhancers = [createReduxDevToolsEnhancer()];

  /**
   * 3: Create store
   */
  const _store: TStore = configureStore({
    reducer,
    devTools: false,
    preloadedState: preloadedState as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false
      })?.concat?.(_middlewares),
    enhancers: _enhancers
  });

  /**
   * IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
   */
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept('./root-reducer', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createNextReducer = require('./root-reducer').default;

      _store.replaceReducer(createNextReducer(preloadedState));
    });
  }

  /**
   * 3: Run your sagas on server
   */
  sagaMiddleware.run(rootSaga);

  /*
   * 4: now return the store:
   */
  return _store;
}
let store: TStore | undefined;

export const initializeStore = (preloadedState?: G.IStore) => {
  let _store = store ?? initStore(preloadedState);

  /**
   * After navigating to a page with an initial Redux state, merge that state
   * with the current state in the store, and create a new store
   */
  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState });
    /**
     * Reset the current store
     */
    store = undefined;
  }

  /**
   * For SSG and SSR always create a new store
   */
  if (isNotBrowser()) return _store;
  /**
   * Create the store once in the client
   */
  if (!store) store = _store;

  return _store;
};

/**
 * useStore
 */
export const useStore = (initialState?: G.IStore) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};
