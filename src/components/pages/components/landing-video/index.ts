import dynamic from 'next/dynamic';

export const LandingVideo = dynamic<any>(
  import('./landing-video').then((m) => m.LandingVideo)
);
