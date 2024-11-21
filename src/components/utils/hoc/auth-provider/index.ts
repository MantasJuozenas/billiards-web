import dynamic from 'next/dynamic';

import { NAuthProvider } from './auth-provider';

export const AuthProvider = dynamic<NAuthProvider.TProps>(
  import('./auth-provider').then((m) => m.AuthProvider)
);
