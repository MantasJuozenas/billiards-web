import dynamic from 'next/dynamic';

import { NTimeDateSelect } from './time-date-select';

export const TimeDateSelect = dynamic<NTimeDateSelect.IProps>(
  import('./time-date-select').then((m) => m.TimeDateSelect)
);
