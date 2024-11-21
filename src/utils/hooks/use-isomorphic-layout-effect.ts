import { useEffect, useLayoutEffect } from 'react';

const IsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useIsomorphicLayoutEffect = IsomorphicLayoutEffect;
