import dynamic from 'next/dynamic';

export const PageLogout = dynamic<any>(
  import('./page-logout').then((m) => m.PageLogout)
);
