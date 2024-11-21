import { clientAxiosApi } from '@clients/axios/client-axios-api';
import { apiRoutes } from '@constants/routes';
import { NHandlerCreateReservation } from '@pages/api/reservation/create-reservation';
import { NHandlerReservationBlockedDays } from '@pages/api/reservation/reservation-blocked-days';
import { NHandlerReservationBlockedTimes } from '@pages/api/reservation/reservation-blocked-times';

export const CreateReservationApiQuery = async (
  body: NHandlerCreateReservation.IBody
): Promise<NHandlerCreateReservation.TRes> => {
  try {
    const response: G.TAxiosResponse<NHandlerCreateReservation.TRes> =
      await clientAxiosApi().post(
        apiRoutes['reservation/create-reservation'],
        body
      );

    // console.log('__CreateReservationApiQuery', { response });

    return response?.data;
  } catch (error: any) {
    console.error(`CreateReservationApiQuery > ERROR: ${error?.toString?.()}`);
    return error;
  }
};

export const ReservationBlockedTimesApiQuery = async (
  body: NHandlerReservationBlockedTimes.IBody
): Promise<NHandlerReservationBlockedTimes.TRes> => {
  try {
    const response: G.TAxiosResponse<NHandlerReservationBlockedTimes.TRes> =
      await clientAxiosApi().post(
        apiRoutes['reservation/reservation-blocked-times'],
        body
      );

    // console.log('__ReservationBlockedTimesApiQuery', { response });

    return response?.data;
  } catch (error: any) {
    console.error(
      `ReservationBlockedTimesApiQuery > ERROR: ${error?.toString?.()}`
    );
    return error;
  }
};

export const ReservationBlockedDaysApiQuery = async (
  body: NHandlerReservationBlockedDays.IBody
): Promise<NHandlerReservationBlockedDays.TRes> => {
  try {
    const response: G.TAxiosResponse<NHandlerReservationBlockedDays.TRes> =
      await clientAxiosApi().post(
        apiRoutes['reservation/reservation-blocked-days'],
        body
      );

    // console.log('__ReservationBlockedDaysApiQuery', { response });

    return response?.data;
  } catch (error: any) {
    console.error(
      `ReservationBlockedDaysApiQuery > ERROR: ${error?.toString?.()}`
    );
    return error;
  }
};
