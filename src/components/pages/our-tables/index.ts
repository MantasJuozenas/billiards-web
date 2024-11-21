import dynamic from 'next/dynamic';

export const PageOurTables = dynamic<any>(
  import('./page-our-tables').then((m) => m.PageOurTables)
);
