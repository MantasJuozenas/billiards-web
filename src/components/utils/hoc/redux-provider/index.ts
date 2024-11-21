import dynamic from 'next/dynamic';

import { NReduxProvider } from './redux-provider';

export const ReduxProvider = dynamic<NReduxProvider.IProps>(
  import('./redux-provider').then((m) => m.ReduxProvider)
);
