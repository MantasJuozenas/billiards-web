import dynamic from 'next/dynamic';

export const PageAboutUs = dynamic<any>(
  import('./page-about-us').then((m) => m.PageAboutUs)
);
