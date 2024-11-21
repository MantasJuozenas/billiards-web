import dynamic from 'next/dynamic';

export const FormConfirmation = dynamic<any>(
  import('./form-confirmation').then((m) => m.FormConfirmation)
);

export const ModalConfirmation = dynamic<any>(
  import('./modal-confirmation').then((m) => m.ModalConfirmation)
);
