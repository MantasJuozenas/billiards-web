import dynamic from 'next/dynamic';

import { NAppCheck } from './app-check';

export const AppCheck = dynamic<NAppCheck.TProps>(
  import('./app-check').then((m) => m.AppCheck)
);
