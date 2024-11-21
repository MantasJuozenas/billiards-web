import dynamic from 'next/dynamic';

export const PageContacts = dynamic<any>(
  import('./page-contacts').then((m) => m.PageContacts)
);
