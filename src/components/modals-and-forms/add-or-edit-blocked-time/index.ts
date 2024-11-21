import dynamic from 'next/dynamic';

export const FormInsertUpdateBlockedTime = dynamic<any>(
  import('./form-insert-update-blocked-time').then(
    (m) => m.FormInsertUpdateBlockedTime
  )
);

export const ModalInsertUpdateBlockedTime = dynamic<any>(
  import('./modal-insert-update-blocked-time').then(
    (m) => m.ModalInsertUpdateBlockedTime
  )
);
