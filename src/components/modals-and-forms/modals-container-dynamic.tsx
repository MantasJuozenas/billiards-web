import dynamic from 'next/dynamic';

export const ModalsContainer = dynamic<any>(
  import('./modals-container').then((m) => m.ModalsContainer)
);
