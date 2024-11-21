import dynamic from 'next/dynamic';

export const BurgerMenu = dynamic<any>(
  import('./burger-menu').then((m) => m.BurgerMenu)
);
