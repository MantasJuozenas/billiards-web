/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/export */
import { usePrevious } from '@utilsFn/hooks/use-previous';
import { isEqual } from 'lodash';
import React from 'react';

const defaultState: useSubscriptionState.IState<any> = {
  // @ts-ignore
  data: undefined,
  loading: true
};

const stateReducer = <D>(
  state: useSubscriptionState.IState<D>,
  action: useSubscriptionState.IAction<D>
): useSubscriptionState.IState<D> => {
  const { type, payload } = action;

  switch (type) {
    case 'state.set_state':
      return payload as any;
    case 'state.merge_state':
      return { ...state, ...payload };
    case 'state.reset_state':
      return defaultState;
    default:
      return state;
  }
};

export const useSubscriptionState = <D = any, V = any>(
  props: useSubscriptionState.IProps<V>
) => {
  const { variables } = props;

  const [state, setState] = React.useReducer(
    (
      _state: useSubscriptionState.IState<D>,
      _action: useSubscriptionState.IAction<D>
    ) => stateReducer(_state, _action),
    defaultState
  );

  const previousVariables = usePrevious(variables);
  // const previousState = usePrevious(state);

  React.useEffect(() => {
    if (!isEqual(variables, previousVariables)) {
      // eslint-disable-next-line prettier/prettier
      // console.log('___________________Here loading starts because of variables changed');
      setState({ type: 'state.merge_state', payload: { loading: true } });
    }
  }, [variables, previousVariables]);

  React.useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    // console.log('___________________Here loading starts because of new state');
    setState({ type: 'state.merge_state', payload: { loading: true } });

    const timeout = setTimeout(() => {
      // eslint-disable-next-line prettier/prettier
      // console.log('___________________Here loading ends because of new state');
      setState({ type: 'state.merge_state', payload: { loading: false } });
    }, 1);

    return () => {
      clearTimeout(timeout);
    };
  }, [state?.data]);

  // React.useEffect(() => {
  //   if (previousState?.loading && !state?.loading) {
  //     // eslint-disable-next-line prettier/prettier
  //     // console.log('___________________Here is your new data', { state });
  //   }
  // }, [state?.loading, previousState?.loading]);

  return { state, setState };
};

// eslint-disable-next-line no-redeclare
export namespace useSubscriptionState {
  export interface IProps<V> {
    variables: V;
  }
  export interface IState<D> {
    data: G.TSubscriptionResult<D>;
    loading: boolean;
  }
  export type TActionType =
    | 'state.set_state'
    | 'state.merge_state'
    | 'state.reset_state';
  export interface IAction<D> {
    type: TActionType;
    payload: Partial<IState<D>>;
  }
}
