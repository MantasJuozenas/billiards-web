import { CreateReservationApiQuery } from '@store/modules/reservation/query';
import { GetDateFieldsForDb } from '@utilsFn/dayjs-fn';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { HandlerShowToast } from '@utilsFn/handler-show-toast';

export const AddOrEditReservationMutation = async (
  props: NAddOrEditReservationMutation.IProps
) => {
  const { mutationData, dispatch } = props;
  //   console.log({ props });

  try {
    if (mutationData?.values?.id) {
      //
    } else {
      const { dateNumber, dayTime } = GetDateFieldsForDb({
        date: mutationData?.values?.date_time
      });
      const { isKaunas, isVilnius } = GetRestaurantLocation();

      if (!isKaunas && !isVilnius) {
        console.error(
          'AddOrEditReservationMutation > ERROR: isKaunas and isVilnius from function "GetRestaurantLocation" are both false'
        );
        HandlerShowToast({
          dispatch,
          toastType: 'create',
          toastCode: 'error',
          toastStrings: props?.toastStrings,
          autoCloseAfter: 5000
        });
        return;
      }

      const res = await CreateReservationApiQuery({
        reCaptcha: { token: mutationData?.reCaptchaToken },
        values: {
          date_time: mutationData?.values?.date_time,
          date_number: dateNumber,
          day_time: dayTime,
          duration: mutationData?.values?.duration,
          name: mutationData?.values?.name,
          phone: mutationData?.values?.phone,
          comment: mutationData?.values?.comment,
          pool: mutationData?.values?.pool,
          dart: mutationData?.values?.dart,
          location: isKaunas ? 'Kaunas' : isVilnius ? 'Vilnius' : 'Kaunas',
          eat: mutationData?.values?.eat,
          is_tournament: mutationData?.values?.is_tournament,
          company_name: mutationData?.values?.company_name,
          number_of_people: mutationData?.values?.number_of_people,
          type: mutationData?.values?.type
        }
      });

      if (res?.status === 'ok') {
        HandlerShowToast({
          dispatch,
          toastType: 'create',
          toastCode: 'ok',
          toastStrings: props?.toastStrings,
          autoCloseAfter: 5000
        });
      }
    }
  } catch (error: any) {
    console.error(
      `AddOrEditReservationMutation > ERROR: ${error?.toString?.()}`
    );
  }
};

export namespace NAddOrEditReservationMutation {
  export interface IProps extends G.IQMutationProps {
    mutationData: {
      reCaptchaToken: string;
      values: Form.FAddOrEditReservation;
    };
    toastStrings: G.IToastStrings;
  }
}
