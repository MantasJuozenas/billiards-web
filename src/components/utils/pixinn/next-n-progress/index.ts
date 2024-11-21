import dynamic from 'next/dynamic';

export const NextNprogress = dynamic<any>(
  import('./next-n-progress').then((m) => m.NextNprogress)
);
