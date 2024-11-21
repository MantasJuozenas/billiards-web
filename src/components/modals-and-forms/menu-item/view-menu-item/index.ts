import dynamic from 'next/dynamic';

export const ModalViewMenuItem = dynamic<any>(
  import('./modal-view-menu-item').then((m) => m.ModalViewMenuItem)
);

export const FormViewMenuItem = dynamic<any>(
  import('./form-view-menu-item').then((m) => m.FormViewMenuItem)
);
