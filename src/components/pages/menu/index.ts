import dynamic from 'next/dynamic';

export const PageMenu = dynamic<any>(
  import('./page-menu').then((m) => m.PageMenu)
);
