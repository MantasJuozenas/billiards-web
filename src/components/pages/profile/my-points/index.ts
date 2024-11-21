import dynamic from 'next/dynamic';

export const PageMyPoints = dynamic<any>(
  import('./page-my-points').then((m) => m.PageMyPoints)
);
