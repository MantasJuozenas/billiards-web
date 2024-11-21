import dynamic from 'next/dynamic';

export const CartMenu = dynamic<any>(
  import('./cart-menu').then((m) => m.CartMenu)
);
