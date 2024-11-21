/* eslint-disable sonarjs/no-duplicate-string */
import { IS_PROD, IS_STAGING } from '@constants/app-constants';
import nodemailer, { SendMailOptions } from 'nodemailer';

export const EmailClient = async (props: G.TEmailNodemailer) => {
  const {
    to = props?.to ? props?.to : '',
    subject = 'Nauja rezervacija',
    html,
    from = ''
  } = props;

  try {
    const transporter = nodemailer.createTransport({
      // service: 'gmail',
      // host: 'smtp.gmail.com',
      host: 'cl01.bacloud.com',
      port: 465,
      auth: { user: '', pass: '' }
    });

    const mail: SendMailOptions = {
      from,
      subject,
      html,
      ...props,
      to: IS_PROD && !IS_STAGING ? to : ['']
    };

    const resEmail = await transporter.sendMail(mail);
    // eslint-disable-next-line no-console
    console.log('resEmail', resEmail);
    return { resEmail };
  } catch (error: any) {
    console.error(`EmailClient > ${error?.toString()}`);
    return { error };
  }
};
