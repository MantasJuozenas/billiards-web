import {
  BALTNET_API_KEY,
  BALTNET_LOGIN,
  NAMED_SENDER
} from '@pages/api/utils/backend-constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const baltnetCore = require('./baltneta-core');

export interface ISendSMSProps {
  phone: string;
  smsText: string;
}

async function sendSMS({ phone, smsText }: ISendSMSProps) {
  return baltnetCore
    .sendSms(BALTNET_API_KEY, BALTNET_LOGIN, phone, NAMED_SENDER, smsText)
    .catch((err: any) => err.errno);
}
export default sendSMS;
