import dynamic from 'next/dynamic';

import { NToast } from './toast';

export const Toast = dynamic<NToast.IProps>(
  import('./toast').then((m) => m.Toast)
);
