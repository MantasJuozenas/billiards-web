import dynamic from 'next/dynamic';

export const LoaderOne = dynamic<any>(
  import('./loader-one').then((m) => m.LoaderOne)
);
