import { RE_CAPTCHA_KEY_CLIENT } from '@constants/app-constants';
import React from 'react';
import { GoogleReCaptchaProvider as Provider } from 'react-google-recaptcha-v3';

export const GoogleReCaptchaProvider = (props: {
  children: React.ReactNode;
}) => {
  return (
    <Provider reCaptchaKey={RE_CAPTCHA_KEY_CLIENT}>{props?.children}</Provider>
  );
};
