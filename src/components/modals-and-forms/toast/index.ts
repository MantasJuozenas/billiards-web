import dynamic from 'next/dynamic';

export const FormToast = dynamic<any>(
  import('./form-toast').then((m) => m.FormToast)
);
