import dynamic from 'next/dynamic';

import { NCustomForm } from './form';

export const CustomForm = dynamic<NCustomForm.IProps>(
  import('./form').then((m) => m.CustomForm)
);
