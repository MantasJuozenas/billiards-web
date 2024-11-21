import dynamic from 'next/dynamic';

import { NInputDate } from './input-date';

export const InputDate = dynamic<NInputDate.IProps>(
  import('./input-date').then((m) => m.InputDate)
);
