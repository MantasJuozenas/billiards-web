import dynamic from 'next/dynamic';

export const PageTimeBlocking = dynamic<any>(
  import('./page-time-blocking').then((m) => m.PageTimeBlocking)
);
