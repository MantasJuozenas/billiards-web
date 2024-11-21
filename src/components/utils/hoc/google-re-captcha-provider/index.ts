import dynamic from 'next/dynamic';

export const GoogleReCaptchaProvider = dynamic<any>(
  import('./google-re-captcha-provider').then((m) => m.GoogleReCaptchaProvider)
);
