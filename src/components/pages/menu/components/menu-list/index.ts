import dynamic from 'next/dynamic';

export const MenuList = dynamic<any>(
  import('./menu-list').then((m) => m.MenuList)
);
