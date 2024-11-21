import dynamic from 'next/dynamic';

export const NavbarSidePanelLinks = dynamic<any>(
  import('./navbar-side-panel-links').then((m) => m.NavbarSidePanelLinks)
);
