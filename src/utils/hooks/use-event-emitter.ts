import { eventEmitter } from '@store/middleware/event-emitter';
import { useEffect, useState } from 'react';

interface IUseEvent<Return> {
  (action: string, handler: () => void): Return;
  <Payload>(
    action: (payload: Payload) => { type: string; payload: Payload },
    handler: (payload: Payload) => void
  ): Return;
}

export const useEventEmitter: IUseEvent<void> = (action: any, handler: any) => {
  const actionString: string = action.toString();

  useEffect(() => {
    eventEmitter.on(actionString, handler);
    return () => {
      eventEmitter.removeListener(actionString, handler);
    };
  }, [actionString, handler]);
};

export const useEventEmitterState = <Payload>(
  action: (payload: Payload) => { type: string; payload: Payload }
) => {
  const actionString: string = action.toString();
  const [state, setState] = useState<Payload>();

  useEffect(() => {
    eventEmitter.on(actionString, setState);
    return () => {
      eventEmitter.removeListener(actionString, setState);
    };
  }, [actionString]);

  return state;
};

export const useTestEventEmitterState = <Payload>(
  action: any,
  payload?: Payload
) => {
  const actionString: string = action.toString();
  const [state, setState] = useState<Payload>();

  useEffect(() => {
    eventEmitter.on(actionString, setState);
    return () => {
      eventEmitter.removeListener(actionString, setState);
    };
  }, [actionString, payload]);

  return state;
};
