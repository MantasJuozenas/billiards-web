import { COMPANY_CONTACTS } from '@constants/app-constants';
import { AddReservationGqlMutation } from '@store/modules/reservation/gql-documents';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { clientAxiosApolloAdmin } from '../utils/clients/axios/client-axios-apollo-admin';
import { EmailClient } from '../utils/clients/email-client';
import { SmsClient } from '../utils/clients/sms-client';
import { assertServer } from '../utils/functions/assert-server';
import { onErrorOk } from '../utils/functions/on-error';
import { sRes } from '../utils/functions/safe-res';
import {
  GoogleReCaptchaVerify,
  NGoogleReCaptchaVerify
} from '../utils/query/google-re-captcha-verify.query';

const handlerCreateReservation = nc<G.TNextApiRequest, G.TNextApiResponse>({
  onError: onErrorOk
});

// eslint-disable-next-line sonarjs/cognitive-complexity
handlerCreateReservation.post<G.IExtendedRequest>(async (req, res, _next) => {
  const body = req?.body as NHandlerCreateReservation.IBody;
  // console.log({ body });

  try {
    const resReCaptchaVerify = await GoogleReCaptchaVerify({
      token: body?.reCaptcha?.token
    });
    // console.log({ resReCaptchaVerify, token: body?.reCaptcha?.token });

    if (!resReCaptchaVerify?.success) {
      assertServer(false, StatusCodes.FORBIDDEN, 'ReCaptchaVerify error');
    }

    let email: string | undefined;

    switch (body?.values?.location) {
      case 'Kaunas':
        email = COMPANY_CONTACTS?.['Savanorių pr. 363 Kaunas']?.email;
        break;
      case 'Vilnius':
        // email = COMPANY_CONTACTS?.['Verkių g. 29, 09108 Vilnius']?.email;
        email = 'zebrauskas@gmail.com';
        break;
      default:
        break;
    }

    if (!email) {
      const notFound = `Location "${body?.values?.location}" not associated with any email.`;
      console.error(`NHandlerCreateReservation > ERROR: ${notFound}`);
      return sRes(res, StatusCodes.BAD_REQUEST, {
        status: 'error',
        error: {
          msg: notFound
        }
      });
    }

    const client = clientAxiosApolloAdmin;

    await client<
      GQL_gen.Queries.AddReservationGqlMutation,
      GQL_gen.Queries.AddReservationGqlMutationVariables
    >({
      query: AddReservationGqlMutation,
      variables: {
        objectsAddReservation: {
          date_time: body?.values?.date_time || null,
          date_number: body?.values?.date_number || null,
          day_time: body?.values?.day_time || null,
          duration: body?.values?.duration || null,
          name: body?.values?.name || null,
          phone: body?.values?.phone || null,
          location: body?.values?.location,
          comment: body?.values?.comment || null,
          pool: body?.values?.pool || null,
          dart: body?.values?.dart || null,
          eat: body?.values?.eat || null,
          is_tournament: body?.values?.is_tournament || null,
          company_name: body?.values?.company_name || null,
          number_of_people: body?.values?.number_of_people || null,
          type: body?.values?.type || null
        }
      }
    });

    await EmailClient({
      to: email,
      html: `
        <div>
          <div>Biliardas: ${body?.values?.pool ? 'Taip' : 'Ne'}</div>

          <div>Smiginis: ${body?.values?.dart ? 'Taip' : 'Ne'}</div>

          <div>Tiesiog pavalgyti: ${body?.values?.eat ? 'Taip' : 'Ne'}</div>

          <div>Žmonių skaičius: ${body?.values?.number_of_people}</div>

          <div>Įmonės pavadinimas: ${body?.values?.company_name || ''}</div>

          <div>Data: ${dayjs(
            `${body?.values?.date_number}${body?.values?.day_time}`
          ).format?.('YYYY-MM-DD HH:mm')}</div>

          <div>Trukmė: ${body?.values?.duration || ''}</div>

          <div>Vardas: ${body?.values?.name || ''}</div>

          <div>Telefonas: ${body?.values?.phone || ''}</div>

          <div>Komentaras: ${body?.values?.comment || ''}</div>
        </div>
      `
    });

    await SmsClient({
      phone: body?.values?.phone || '',
      text: 'Rezervacija gauta ir administratorius netrukus susisieks patvirtinti rezervaciją.'
    });

    return sRes(res, StatusCodes.OK, { status: 'ok' });
  } catch (error: any) {
    console.error(
      `NHandlerCreateReservation > ERROR: ${JSON.stringify(error)}`
    );
    assertServer(false, error?.status, error?.data);
  }
});

export default handlerCreateReservation;

export namespace NHandlerCreateReservation {
  export interface IBody {
    reCaptcha: NGoogleReCaptchaVerify.IBody;
    values: Form.FAddOrEditReservation;
  }

  export type TRes = G.TApiRes;
}
