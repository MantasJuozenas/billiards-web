import dynamic from 'next/dynamic';

export const BubbleLoader = dynamic<any>(
  import('./bubble-loader').then((m) => m.BubbleLoader)
);
