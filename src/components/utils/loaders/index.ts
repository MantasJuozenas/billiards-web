import dynamic from 'next/dynamic';

import { NLoaders } from './loaders';

/**
 * Loaders only for client render
 */
export const Loaders = dynamic<NLoaders.IProps>(
  import('./loaders').then((m) => m.Loaders),
  { ssr: false }
);
/**
 * Loaders for server and client render
 */
export const LoadersSSR = dynamic<NLoaders.IProps>(
  import('./loaders').then((m) => m.Loaders)
);
