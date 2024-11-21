import dynamic from 'next/dynamic';

export const PageEsSupport = dynamic<any>(
  import('./page-es-support').then((m) => m.PageEsSupport)
);
