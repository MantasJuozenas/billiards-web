import dynamic from 'next/dynamic';

import { NConnectedRouter } from './connected-router';

export const ConnectedRouter = dynamic<NConnectedRouter.IProps>(
  import('./connected-router').then((m) => m.ConnectedRouter)
);
