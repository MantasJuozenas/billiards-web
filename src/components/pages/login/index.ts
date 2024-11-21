import dynamic from 'next/dynamic';

export const PageLogin = dynamic<any>(
  import('./page-login').then((m) => m.PageLogin)
);
