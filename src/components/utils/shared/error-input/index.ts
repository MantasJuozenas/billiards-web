import dynamic from 'next/dynamic';

import { NErrorInput } from './error-input';

export const ErrorInput = dynamic<NErrorInput.IProps>(
  import('./error-input').then((m) => m.ErrorInput)
);
