import dynamic from 'next/dynamic';

export const Logo = dynamic<any>(import('./logo').then((m) => m.Logo));
