import dynamic from 'next/dynamic';

export const AboutUsVideo = dynamic<any>(
  import('./about-us-video').then((m) => m.AboutUsVideo)
);
