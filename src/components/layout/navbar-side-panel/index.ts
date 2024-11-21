import dynamic from 'next/dynamic';

import { NNavbarSidePanel } from './navbar-side-panel';

export const NavbarSidePanel = dynamic<NNavbarSidePanel.IProps>(
  import('./navbar-side-panel').then((m) => m.NavbarSidePanel)
);
