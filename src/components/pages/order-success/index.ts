import dynamic from 'next/dynamic';

export const PageOrderSuccess = dynamic<any>(
  import('./page-order-success').then((m) => m.PageOrderSuccess)
);
