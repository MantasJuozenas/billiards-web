import React from 'react';

import { useSelector } from './use-selector';

/**
 * @description Starts to work only when isAppReady
 * @param effect fn with no cleanup
 * @param cleanup fn for cleanup
 * @param deps effect dependency arr
 */
export function useEffect<Return>(props: NUseEffect.TProps<Return>) {
  const isAppReady = useSelector((s) => s.global.isAppReady);

  const deps =
    props?.deps === undefined
      ? undefined
      : (props?.deps || [])?.concat?.(isAppReady);

  React.useEffect(() => {
    if (!isAppReady) return;

    const result = props?.effect?.() as Return;

    return () => {
      props?.cleanup?.(result);
    };
  }, deps);
}

export namespace NUseEffect {
  export type TProps<Return = G.Ignored> = {
    effect?: () => Return;
    cleanup?: (result: Return) => G.Ignored;
    deps?: React.DependencyList | undefined;
  };
}
