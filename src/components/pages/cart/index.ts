import dynamic from 'next/dynamic';

export const PageCart = dynamic<any>(
  import('./page-cart').then((m) => m.PageCart)
);
