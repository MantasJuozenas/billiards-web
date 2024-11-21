import dynamic from 'next/dynamic';

import { NCustomModalContent } from './custom-modal-content';
import { NMainContent } from './main-content';
import { NModalCloseBtn } from './modal-close-btn';
import { NModalCustomHeader } from './modal-custom-header';
import { NModalTitle } from './modal-title';

export const CustomModalContent = dynamic<NCustomModalContent.IProps>(
  import('./custom-modal-content').then((m) => m.CustomModalContent)
);
export const MainContent = dynamic<NMainContent.IProps>(
  import('./main-content').then((m) => m.MainContent)
);
export const ModalCloseBtn = dynamic<NModalCloseBtn.IProps>(
  import('./modal-close-btn').then((m) => m.ModalCloseBtn)
);
export const ModalCustomHeader = dynamic<NModalCustomHeader.IProps>(
  import('./modal-custom-header').then((m) => m.ModalCustomHeader)
);
export const ModalTitle = dynamic<NModalTitle.IProps>(
  import('./modal-title').then((m) => m.ModalTitle)
);
