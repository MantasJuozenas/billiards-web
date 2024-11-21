import dynamic from 'next/dynamic';

export const FormAddOrEditReservation = dynamic<any>(
  import('./form-add-or-edit-reservation').then(
    (m) => m.FormAddOrEditReservation
  )
);
