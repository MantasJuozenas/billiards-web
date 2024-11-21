import dynamic from 'next/dynamic';

import { NApolloProvider } from './apollo-provider';

export const ApolloProvider = dynamic<NApolloProvider.IProps>(
  import('./apollo-provider').then((m) => m.ApolloProvider)
);
