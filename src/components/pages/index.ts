import dynamic from 'next/dynamic';

export const PageHome = dynamic<any>(
  import('./page-home').then((m) => m.PageHome)
);
