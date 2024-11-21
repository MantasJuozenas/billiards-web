import dynamic from 'next/dynamic';

export const BurgerMenuAdmin = dynamic<any>(
  import('./burger-menu-admin').then((m) => m.BurgerMenuAdmin)
);
