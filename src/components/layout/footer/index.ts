import dynamic from 'next/dynamic';

import { NFooter } from './footer';

export const Footer = dynamic<NFooter.IProps>(
  import('./footer').then((m) => m.Footer)
);
