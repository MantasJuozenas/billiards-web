import dynamic from 'next/dynamic';

import { NCustomModal } from './custom-modal';

export const CustomModal = dynamic<NCustomModal.IProps>(
  import('./custom-modal').then((m) => m.CustomModal)
);
