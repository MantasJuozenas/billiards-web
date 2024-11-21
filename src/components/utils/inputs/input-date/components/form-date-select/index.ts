import dynamic from 'next/dynamic';

import { NFormDateSelect } from './form-date-select';

export const FormDateSelect = dynamic<NFormDateSelect.IProps>(
  import('./form-date-select').then((m) => m.FormDateSelect)
);
