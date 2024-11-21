import dynamic from 'next/dynamic';

import { NNavbar } from './navbar';

export const Navbar = dynamic<NNavbar.IProps>(
  import('./navbar').then((m) => m.Navbar)
);
