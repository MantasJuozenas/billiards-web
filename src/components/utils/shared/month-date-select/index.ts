import dynamic from 'next/dynamic';

import { NMonthDateSelect } from './month-date-select';

export const MonthDateSelect = dynamic<NMonthDateSelect.IProps>(
  import('./month-date-select').then((m) => m.MonthDateSelect)
);
