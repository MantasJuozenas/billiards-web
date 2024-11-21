import dynamic from 'next/dynamic';

export const Contact = dynamic<any>(import('./contact').then((m) => m.Contact));
