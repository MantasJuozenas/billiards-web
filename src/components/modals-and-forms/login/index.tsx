import dynamic from 'next/dynamic';

export const FormLogin = dynamic<any>(
  import('./form-login').then((m) => m.FormLogin)
);
export const ModalLogin = dynamic<any>(
  import('./modal-login').then((m) => m.ModalLogin)
);
