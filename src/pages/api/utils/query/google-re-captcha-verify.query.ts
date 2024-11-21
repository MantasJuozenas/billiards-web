import axios from 'axios';

import { RE_CAPTCHA_KEY_SERVER } from '../backend-constants';

export const GoogleReCaptchaVerify = async (
  body: NGoogleReCaptchaVerify.IBody
) => {
  const response: G.TAxiosResponse<NGoogleReCaptchaVerify.IRes> =
    await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      undefined,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        params: {
          secret: RE_CAPTCHA_KEY_SERVER,
          response: body?.token || '',
          remoteip: body?.remoteIp || ''
        }
      }
    );

  return response?.data;
};

export namespace NGoogleReCaptchaVerify {
  export interface IBody {
    token: string;
    remoteIp?: string;
  }

  export interface IRes {
    success: boolean;
    /* timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ) */
    challenge_ts: Date;
    /* the hostname of the site where the reCAPTCHA was solved */
    hostname: string;
    /**
     * Error code	                    Description
     * missing-input-secret	        The secret parameter is missing.
     * invalid-input-secret	The     secret parameter is invalid or malformed.
     * missing-input-response	    The response parameter is missing.
     * invalid-input-response	    The response parameter is invalid or malformed.
     * bad-request	The request     is invalid or malformed.
     * timeout-or-duplicate	The     response is no longer valid: either is too old or has been used previously.
     */
    // [...]        // optional
    'error-codes': any;
  }
}
