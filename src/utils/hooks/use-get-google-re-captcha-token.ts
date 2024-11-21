import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useGetGoogleReCaptchaToken = (
  props: NUseGetGoogleReCaptchaToken.IProps
) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = React.useCallback(async () => {
    try {
      if (!executeRecaptcha) {
        // console.log('Execute recaptcha not yet available');
        return { token: '' };
      }

      const token = await executeRecaptcha?.(
        props?.executeReCaptchaName || 'yourAction'
      );
      // Do whatever you want with the token
      return { token };
    } catch (error: any) {
      console.error(`handleReCaptchaVerify > ERROR:`, { error });
      return { token: '' };
    }
  }, [executeRecaptcha, props?.executeReCaptchaName]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  // React.useEffect(() => {
  //   handleReCaptchaVerify();
  // }, [handleReCaptchaVerify]);

  return { handleReCaptchaVerify };
};

export namespace NUseGetGoogleReCaptchaToken {
  export interface IProps {
    executeReCaptchaName: string;
  }
}
