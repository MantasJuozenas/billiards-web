import dynamic from 'next/dynamic';

import { NPixinnImage } from './pixinn-image';

export const PixinnInput2 = dynamic<NPixinnImage.IProps>(
  import('./pixinn-image').then((m) => m.PixinnImage)
);
