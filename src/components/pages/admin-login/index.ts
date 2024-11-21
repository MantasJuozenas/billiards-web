import dynamic from 'next/dynamic';

export const PageAdminLogin = dynamic<any>(
  import('./page-admin-login').then((m) => m.PageAdminLogin)
);
