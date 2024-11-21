/* eslint-disable sonarjs/cognitive-complexity */
import { NHandlerReservationBlockedTimes } from '@pages/api/reservation/reservation-blocked-times';
import { ReservationBlockedTimesApiQuery } from '@store/modules/reservation/query';
import { Dayjs, dayjs } from '@utilsFn/dayjs-fn';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { InputSelect } from '../../inputs/input-select';

const contacts = GetCompanyContacts();

const defaultState: NTimeDateSelect.IState = {
  workingHours: contacts.contacts.workingHours,
  hoursOptions: Array(24)
    ?.fill?.(0)
    ?.map?.((_v, i) => {
      return { value: i, label: i };
    }),
  minutesOptions: Array(60 / 30)
    ?.fill?.(0)
    ?.map?.((_v, i) => {
      return { value: i * 30, label: i * 30 };
    })
};

export const TimeDateSelect = (props: NTimeDateSelect.IProps) => {
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    ...defaultState,
    hoursOptions: [] as typeof defaultState['hoursOptions'],
    minutesOptions: [] as typeof defaultState['minutesOptions']
  });

  const handlerSetInitial = async () => {
    const dateNumber = +props.date.format('YYYYMMDD');

    let whereBlockedTime: NHandlerReservationBlockedTimes.IBody['variablesBlockedTime']['whereBlockedTime'] =
      { id: { _eq: 0 } };

    if (props?.isDart && props?.isPool) {
      whereBlockedTime = {
        deleted_at: { _is_null: true },
        date_number: { _eq: dateNumber },
        _or: [{ dart: { _eq: true } }, { pool: { _eq: true } }]
      };
    } else if (props?.isDart) {
      whereBlockedTime = {
        deleted_at: { _is_null: true },
        date_number: { _eq: dateNumber },
        dart: { _eq: true }
      };
    } else if (props?.isPool) {
      whereBlockedTime = {
        deleted_at: { _is_null: true },
        date_number: { _eq: dateNumber },
        pool: { _eq: true }
      };
    }

    const resBlockedTimes = await ReservationBlockedTimesApiQuery({
      gapMin: props?.gapMin,
      variablesBlockedTime: {
        whereBlockedTime,
        order_byBlockedTime: [{ date_number: 'asc' }]
      }
    });

    const resBlockedTimesByDateNumber = (
      resBlockedTimes?.status === 'ok'
        ? resBlockedTimes?.payload?.blockedTimesByDateNumber
        : {}
    ) as NHandlerReservationBlockedTimes.TPayload['blockedTimesByDateNumber'];

    setState((previous) => ({
      ...previous,
      hoursOptions: defaultState?.hoursOptions?.filter?.((item) => {
        const valueDate = props?.date?.format?.('YYYYMMDD');
        const valueDay = props?.date?.day();

        if (resBlockedTimesByDateNumber?.[valueDate]?.allDayBlocked) {
          return false;
        }

        const hourTimes = Array(defaultState?.minutesOptions?.length)
          ?.fill?.(0)
          ?.map?.((_v, i) => {
            return `${item?.value < 10 ? `0${item?.value}` : item?.value}:${
              !i ? '00' : i * 30
            }`;
          });

        const isHourBlocked = resBlockedTimesByDateNumber?.[
          valueDate
        ]?.blockedTimes?.filter?.((time) => hourTimes?.includes?.(time));

        if (isHourBlocked?.length > 1) return false;

        const workingHours: typeof defaultState['workingHours'][0] = (
          defaultState.workingHours as any
        )[valueDay];
        const [workingHourFrom] = workingHours.from.split(':');
        const currDate = dayjs().format('YYYYMMDD');

        if (valueDate === currDate) {
          const currHour = dayjs().get('hours');

          if (item?.value <= currHour) return false;
          if (
            item?.value > currHour &&
            item?.value >= +workingHourFrom &&
            item?.value <= 23
          ) {
            if (item?.value === currHour + 1) return dayjs().get('minute') < 30;
            return true;
          }
        }

        return !!(item?.value >= +workingHourFrom && item?.value <= 23);
      }),
      minutesOptions: defaultState?.minutesOptions?.filter?.((item) => {
        const valueTime = props?.date?.format?.('HH:mm');
        const valueDate = props?.date?.format?.('YYYYMMDD');
        const valueHour = props?.date.get('hours');

        if (resBlockedTimesByDateNumber?.[valueDate]?.allDayBlocked) {
          return false;
        }

        const hourTimes = Array(1)
          ?.fill?.(0)
          ?.map?.(() => {
            return `${valueHour < 10 ? `0${valueHour}` : valueHour}:${
              item?.value < 10 ? `0${item?.value}` : item?.value
            }`;
          });

        const isHourBlocked = resBlockedTimesByDateNumber?.[
          valueDate
        ]?.blockedTimes?.filter?.((time) => hourTimes?.includes?.(time));

        if (isHourBlocked?.length) return false;

        const selectedHour = +valueTime.split(':')[0];
        const currHour = dayjs().get('hours');
        const currDate = dayjs().format('YYYYMMDD');

        if (valueDate === currDate && selectedHour === currHour + 1) {
          return item?.value >= dayjs().get('minute');
        }

        return true;
      })
    }));
  };

  const handlerSetErr = () => {
    if (
      !state?.hoursOptions?.find?.(
        (item) => item?.value === +props.date.format('HH:mm').split(':')[0]
      )
    ) {
      props?.setHourFromErr?.(true);
    } else {
      props?.setHourFromErr?.(false);
    }

    if (
      !state?.minutesOptions?.find?.(
        (item) => item?.value === +props.date.format('HH:mm').split(':')[1]
      )
    ) {
      props?.setMinuteFromErr?.(true);
    } else {
      props?.setMinuteFromErr?.(false);
    }
  };

  React.useEffect(() => {
    handlerSetInitial();
  }, [props?.date]);

  React.useEffect(() => {
    handlerSetErr();
  }, [state?.hoursOptions, state?.minutesOptions]);

  return (
    <ContainerTimeDateSelect>
      <p className="TimeDateSelect_r1">{t('shared:::TimeDateSelect::text1')}</p>

      <div className="TimeDateSelect_r2">
        <div className="TimeDateSelect_r2_c1">
          <InputSelect
            select={{
              noOptionsMessage: () => 'Nėra pasirinkimų',
              placeholder: t('shared:::TimeDateSelect::text2'),
              menuPlacement: 'top',
              value:
                (props?.hasInitialHours &&
                  state?.hoursOptions?.find?.(
                    (item) =>
                      item?.value === +props.date.format('HH:mm').split(':')[0]
                  )) ||
                null,
              options: state?.hoursOptions,
              onChange: (val: any) => {
                const [, minutes] = (props.date.format('HH:mm') || '').split(
                  ':'
                );
                props?.handlerOnTimeClick?.(`${val?.value}:${minutes}`, 'h');
              }
            }}
            msgError={
              props?.hourFromErr ? t('shared:::TimeDateSelect::text4') : ''
            }
          />
        </div>

        <div className="TimeDateSelect_r2_c2">
          <InputSelect
            select={{
              noOptionsMessage: () => 'Nėra pasirinkimų',
              placeholder: t('shared:::TimeDateSelect::text3'),
              menuPlacement: 'top',
              value:
                (props?.hasInitialMinutes &&
                  state?.minutesOptions?.find?.(
                    (item) =>
                      item?.value === +props.date.format('HH:mm').split(':')[1]
                  )) ||
                null,
              options: state?.minutesOptions,
              onChange: (val: any) => {
                const [hour] = (props.date.format('HH:mm') || '').split(':');
                props?.handlerOnTimeClick?.(`${hour}:${val?.value}`, 'm');
              }
            }}
            msgError={
              props?.minuteFromErr ? t('shared:::TimeDateSelect::text4') : ''
            }
          />
        </div>
      </div>
    </ContainerTimeDateSelect>
  );
};

export namespace NTimeDateSelect {
  export interface IProps {
    date: Dayjs;
    /**
     * 02:10
     */
    handlerOnTimeClick: (value: string, timeType: 'h' | 'm') => void;
    gapMin: number;
    isDart: boolean;
    isPool: boolean;
    hourFromErr: boolean;
    minuteFromErr: boolean;
    setHourFromErr: (val: boolean) => void;
    setMinuteFromErr: (val: boolean) => void;
    hasInitialHours: boolean;
    hasInitialMinutes: boolean;
  }

  export interface IState {
    hoursOptions: G.TSelect<number, number>[];
    minutesOptions: G.TSelect<number, number>[];
    workingHours: typeof contacts.contacts.workingHours;
  }
}

const ContainerTimeDateSelect = styled.div`
  .TimeDateSelect_r1 {
    margin: 0;
    margin-bottom: 20px;
    padding: 0 15px;
    font: normal normal medium 16px/43px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .TimeDateSelect_r2 {
    display: flex;
    align-items: flex-start;
    padding: 0 15px;
  }

  .TimeDateSelect_r2_c1,
  .TimeDateSelect_r2_c2 {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .TimeDateSelect_r2_c1 {
    margin-right: 20px;
  }
`;
