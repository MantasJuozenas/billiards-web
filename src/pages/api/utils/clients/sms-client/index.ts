/* eslint-disable sonarjs/prefer-single-boolean-return */
import { IS_PROD, IS_STAGING } from '@constants/app-constants';

import sendSMS from './baltneta/baltneta';

// const USA_PHONE = '';
// const TWILIO_SID = '';
// const TWILIO_TOKEN = '';

// const TWILIO_SMS_SID = '';
// const TWILIO_SMS_SENDER = '';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const twilioSMSClient = require('twilio')(TWILIO_SID, TWILIO_TOKEN);

const adminPhones = [

  '37063934731'
];

const phoneNotToSend = [''];

const shouldSendSms = (phone = '') => {
  //   const ifProdCookie = AUTH_COOKIE_NAME?.includes('auth-prod');

  if (IS_PROD && !IS_STAGING) {
    if (phoneNotToSend?.includes?.(phone)) return false;

    return true;
  }

  if (adminPhones?.includes?.(phone)) return true;

  return false;
};

// const sendFrom = (phone = '') => {
//   const clearedPhone = phone?.replace(/\D/g, '');
//   return clearedPhone?.[0] === '1' ? USA_PHONE : TWILIO_SMS_SENDER;
// };

interface ISmsClientProps {
  text: string;
  phone: string;
}

export const SmsClient = async (props: ISmsClientProps) => {
  try {
    let phoneToSend = (props?.phone || '')?.replace?.('+', '');

    if (phoneToSend?.startsWith?.('00')) {
      phoneToSend = phoneToSend?.replace?.('00', '');
    }

    if (phoneToSend?.startsWith?.('8')) {
      phoneToSend = phoneToSend?.replace?.('8', '370');
    }

    if (shouldSendSms(phoneToSend)) {
      const resSms = await sendSMS({
        phone: phoneToSend,
        smsText: props?.text
      });

      if (resSms?.data?.[phoneToSend]) {
        console.error(resSms?.data?.[phoneToSend]);
      }

      //   await twilioSMSClient.messages
      //     .create({
      //       // messagingServiceSid: TWILIO_SMS_SID,
      //       body: props?.text || '',
      //       from: sendFrom(props?.phone),
      //       // to: props?.phone?.replace('+', '').trim() || ''
      //       to: phoneToSend?.trim() || ''
      //     })
      //     .then((message: any) => {
      //       console.error(
      //         'sendSmsTwilio > message?.sid, phone',
      //         message?.sid,
      //         phoneToSend
      //       );
      //       return message;
      //     })
      //     .catch((err: any) => {
      //       console.error('sendSmsTwilio > phone', props?.phone);
      //       console.error('sendSmsTwilio > err', JSON.stringify(err));
      //       console.error('sendSmsTwilio > err?.errno', err?.errno);
      //       console.error('sendSmsTwilio > err?.code', err.code);
      //       return err.errno;
      //     });
    } else {
      return '';
    }
  } catch (error: any) {
    console.error('SmsClient > error', error?.toString());
  }
};

export const generateCode = (props: { phone: string }) => {
  if (props?.phone === '') return { code: '' };
  if (!IS_PROD && adminPhones.includes(props?.phone)) return { code: '1234' };
  return { code: Math.floor(1000 + Math.random() * 9000).toString() };
};
