/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button } from '@components/utils/buttons/button';
import { CustomForm } from '@components/utils/form';
import { Input } from '@components/utils/inputs/input';
import { InputCheckbox } from '@components/utils/inputs/input-checkbox';
import { InputDate } from '@components/utils/inputs/input-date';
import { InputSelect } from '@components/utils/inputs/input-select';
import { InputTextarea } from '@components/utils/inputs/input-textarea';
import { ErrorInput } from '@components/utils/shared/error-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { NHandlerReservationBlockedTimes } from '@pages/api/reservation/reservation-blocked-times';
import { ReservationBlockedTimesApiQuery } from '@store/modules/reservation/query';
import { ReservationTimeSelectArr } from '@store/modules/reservation/select-arr.ts/select-arr';
import { EReservationType } from '@typings/graphql/enum-schema';
import { _, media } from '@utilsFn/breakpoint';
import {
  Dayjs,
  dayjs,
  nearestFutureMinutes,
  SetTimeToDate
} from '@utilsFn/dayjs-fn';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import { useDebounce } from '@utilsFn/hooks/use-debounce';
import { useGetGoogleReCaptchaToken } from '@utilsFn/hooks/use-get-google-re-captcha-token';
import { useDispatch } from '@utilsFn/hooks/use-selector';
import { IsNumber } from '@utilsFn/is-number';
import { joinClasses } from '@utilsFn/join-classes';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import { AddOrEditReservationMutation } from './query';

// const InfoTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(() => ({
//   [`& .${tooltipClasses.arrow}`]: {
//     color: '#FFFFFF'
//   },
//   [`& .${tooltipClasses.tooltip}`]: {
//     padding: '10px',
//     borderRadius: '4px',
//     backgroundColor: '#FFFFFF',
//     font: 'normal normal normal 14px/18px Roboto',
//     color: '#000000',
//     maxWidth: 312
//   }
// }));

const HandlerGetCorrectInitialDate = (date?: Dayjs) => {
  const companyContacts = GetCompanyContacts();

  const { workingHours } = companyContacts.contacts;
  let currDate = date || dayjs();
  let currDay = currDate?.day();
  let currHour = currDate.get('hours');
  let currMinute = currDate.get('minutes');
  let currWorkingHours: typeof workingHours[0] = (workingHours as any)[currDay];

  let [workingHourFrom] = currWorkingHours.from.split(':');
  if (currHour > 23 || (currHour === 23 && currMinute > 30)) {
    currDate = currDate.add(1, 'day').startOf('day');
    currDay = currDate?.day();
    currHour = currDate.get('hours');
    currMinute = currDate.get('minutes');
    currWorkingHours = (workingHours as any)[currDay];
    workingHourFrom = currWorkingHours.from.split(':')?.[0];
  }
  const correctHourFrom =
    currHour >= +workingHourFrom ? currHour : +workingHourFrom;
  const correctMinuteFrom = currHour < correctHourFrom ? 0 : currMinute;

  return SetTimeToDate(correctHourFrom, correctMinuteFrom, currDate);
};

const gapMin = 30;

const defaultState: NFormAddOrEditReservation.IState = {
  activeTab: EReservationType['just-play'],
  tabs: [],
  numberOfPeopleOptions: Array(143)
    ?.fill?.(0)
    ?.map?.((_v, i) => {
      return { value: i + 1, label: i + 1 };
    }),
  numberOfPeopleSelect: null,
  debounceBlockedTimes: 0,
  blockedTimesByDateNumber: {},
  loadingBlockedTimes: false
};

export const FormAddOrEditReservation = () => {
  const { t } = useTranslation();

  const companyContacts = GetCompanyContacts();

  const dispatch = useDispatch();

  const timeOptionsHook = ReservationTimeSelectArr()?.timeOptions;

  const [isError, setIsError] = React.useState(false);

  const [state, setState] = React.useState({
    ...defaultState,
    tabs: [
      {
        value: EReservationType['just-play'],
        label: t('modals-and-forms:::FormAddOrEditReservation::text2')
      },
      {
        value: EReservationType.group,
        label: t('modals-and-forms:::FormAddOrEditReservation::text3')
      }
    ] as NFormAddOrEditReservation.TTab[]
  });

  const debounceBlockedTimes = useDebounce(state?.debounceBlockedTimes);

  const toastStrings: G.IToastStrings = {
    ok: {
      create: {
        title: t('modals-and-forms:::FormAddOrEditReservation::text16'),
        msg: t('modals-and-forms:::FormAddOrEditReservation::text17')
      }
    },
    error: {
      create: {
        title: 'KLAIDA',
        msg: 'Nepavyko issiusti'
      }
    }
  };

  const schema = yup.object().shape<G.YupMap<Form.FAddOrEditReservation>>({
    date_time: yup
      .date()
      .test(
        'is-date-more-than-now',
        t(`modals-and-forms:::FormAddOrEditReservation::text18`),
        (val) => {
          const valDate = dayjs(val).add(-1, 'hour').valueOf();
          const nowDate = dayjs().valueOf();

          return valDate >= nowDate;
        }
      )
      .required(t(`modals-and-forms:::FormAddOrEditReservation::text14`)),
    phone: yup
      .string()
      .required(t(`modals-and-forms:::FormAddOrEditReservation::text14`)),
    name: yup
      .string()
      .required(t(`modals-and-forms:::FormAddOrEditReservation::text14`)),
    duration: yup
      .string()
      .required(t(`modals-and-forms:::FormAddOrEditReservation::text14`)),
    number_of_people: yup
      .number()
      .min(1, t(`modals-and-forms:::FormAddOrEditReservation::text14`))
      .required(t(`modals-and-forms:::FormAddOrEditReservation::text14`))
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    watch,
    getValues,
    setValue
  } = useForm<Form.FAddOrEditReservation>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      date_time: undefined,
      duration: '',
      name: '',
      phone: '',
      comment: '',
      location: '',
      pool: false,
      dart: false,
      eat: false,
      is_tournament: false,
      company_name: '',
      number_of_people: 0
    }
  });

  const testCheckboxHandler = () => {
    const formValues = getValues();
    const isDart = !!formValues?.dart;
    const isPool = !!formValues?.pool;
    const isEat = !!formValues?.eat;

    if (!isPool && !isDart && !isEat) {
      setIsError(true);
    } else if (isPool || isDart || isEat) {
      setIsError(false);
    }
  };

  const { handleReCaptchaVerify } = useGetGoogleReCaptchaToken({
    executeReCaptchaName: 'FormAddOrEditReservation'
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isError) return;
    const { token } = await handleReCaptchaVerify();

    if (!token) return;

    await AddOrEditReservationMutation({
      dispatch,
      toastStrings,
      mutationData: {
        reCaptchaToken: token,
        values: {
          ...data,

          type: state?.activeTab,
          company_name:
            state?.activeTab === EReservationType['just-play']
              ? ''
              : data?.company_name,
          number_of_people: data?.number_of_people
          // state?.activeTab === EReservationType['just-play']
          //   ? 0
          //   : data?.number_of_people
        }
      }
    });

    reset();

    setState((previous) => ({
      ...previous,
      numberOfPeopleSelect: null
    }));
  });

  const handlerGetReservationBlockedTimes = async () => {
    setState((previous) => ({ ...previous, loadingBlockedTimes: true }));

    const formValues = getValues();
    const isDart = !!formValues?.dart;
    const isPool = !!formValues?.pool || !!formValues?.is_tournament;

    let blockedTimesByDateNumber:
      | NFormAddOrEditReservation.IState['blockedTimesByDateNumber']
      | null = null;
    let daysCount = 0;
    let validHour = 0;
    let validMinute = 0;

    let isMainLooping = true;

    while (isMainLooping) {
      const dateDayjs = dayjs(formValues?.date_time).add(daysCount, 'days');
      const dateNumber = +dateDayjs.format('YYYYMMDD');

      let whereBlockedTime: NHandlerReservationBlockedTimes.IBody['variablesBlockedTime']['whereBlockedTime'] =
        { id: { _eq: 0 } };

      if (isDart && isPool) {
        whereBlockedTime = {
          deleted_at: { _is_null: true },
          date_number: { _eq: dateNumber },
          _or: [{ dart: { _eq: true } }, { pool: { _eq: true } }]
        };
      } else if (isDart) {
        whereBlockedTime = {
          deleted_at: { _is_null: true },
          date_number: { _eq: dateNumber },
          dart: { _eq: true }
        };
      } else if (isPool) {
        whereBlockedTime = {
          deleted_at: { _is_null: true },
          date_number: { _eq: dateNumber },
          pool: { _eq: true }
        };
      }

      // eslint-disable-next-line no-await-in-loop
      const resBlockedTimes = await ReservationBlockedTimesApiQuery({
        gapMin,
        variablesBlockedTime: {
          whereBlockedTime,
          order_byBlockedTime: [{ date_number: 'asc' }]
        }
      });

      const resBlockedTimesByDateNumber = (
        resBlockedTimes?.status === 'ok'
          ? resBlockedTimes?.payload?.blockedTimesByDateNumber
          : {}
      ) as NFormAddOrEditReservation.IState['blockedTimesByDateNumber'];

      if (resBlockedTimesByDateNumber?.[dateNumber]?.allDayBlocked) {
        daysCount += 1;
      } else if (
        resBlockedTimesByDateNumber?.[dateNumber]?.blockedTimes?.includes?.(
          dateDayjs?.format?.('HH:mm')
        )
      ) {
        const foundTimeIndex = resBlockedTimesByDateNumber?.[
          dateNumber
        ]?.blockedTimes?.indexOf?.(dateDayjs?.format?.('HH:mm'));

        let timesToCheckArr = [
          ...(resBlockedTimesByDateNumber?.[dateNumber]?.blockedTimes || [])
        ];
        timesToCheckArr?.splice?.(0, foundTimeIndex + 1);

        let minutesCount = gapMin;

        while (timesToCheckArr?.length) {
          const nextTime = timesToCheckArr?.slice?.(0, 1)?.[0];
          const nextDateTime = dateDayjs
            .add(minutesCount, 'minutes')
            .format('HH:mm');

          if (nextTime !== nextDateTime) {
            validHour = +nextDateTime.split(':')[0];
            validMinute = +nextDateTime.split(':')[1];

            timesToCheckArr = [];
          } else if (timesToCheckArr?.length > 1) {
            minutesCount += gapMin;
            timesToCheckArr?.splice?.(0, 1);
          } else if (timesToCheckArr?.length === 1) {
            const validDateTime = dateDayjs
              .add(minutesCount + gapMin, 'minutes')
              .format('HH:mm');
            validHour = +validDateTime.split(':')[0];
            validMinute = +validDateTime.split(':')[1];
            timesToCheckArr = [];
          }
        }

        if (!validHour && !validMinute) {
          daysCount += 1;
        } else {
          isMainLooping = false;
        }
      } else {
        isMainLooping = false;
      }

      blockedTimesByDateNumber = resBlockedTimesByDateNumber;
    }

    let newValidDate = dayjs(formValues?.date_time).add(daysCount, 'days');
    if (validHour) {
      newValidDate = dayjs(newValidDate).set('hours', validHour);
    }
    if (validHour) {
      newValidDate = dayjs(newValidDate).set('minutes', validMinute);
    }

    if (
      dayjs(formValues?.date_time).format('YYYY-MM-DD HH:mm') !==
      newValidDate.format('YYYY-MM-DD HH:mm')
    ) {
      setValue(
        'date_time',
        nearestFutureMinutes(
          gapMin,
          HandlerGetCorrectInitialDate(newValidDate)
        ).toDate()
      );
    }

    setState((previous) => ({
      ...previous,
      blockedTimesByDateNumber:
        blockedTimesByDateNumber as NFormAddOrEditReservation.IState['blockedTimesByDateNumber'],
      loadingBlockedTimes: false
    }));
  };

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        name === 'date_time' ||
        name === 'pool' ||
        name === 'eat' ||
        name === 'dart' ||
        name === 'is_tournament'
      ) {
        testCheckboxHandler();
        setState((previous) => ({
          ...previous,
          debounceBlockedTimes: previous.debounceBlockedTimes + 1
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  React.useEffect(() => {
    handlerGetReservationBlockedTimes();
  }, [debounceBlockedTimes]);

  return (
    <ContainerFormAddOrEditReservation
      id="FormAddOrEditReservation"
      onSubmit={onSubmit}
    >
      {/* <div className="FormAddOrEditReservation_middle_r10">
              <Controller
                defaultValue
                name="is_tournament"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: field?.value,
                      placeholder: (
                        <>
                          {t(
                            'modals-and-forms:::FormAddOrEditReservation::text13'
                          )}

                          <InfoTooltip
                            title={t(
                              'modals-and-forms:::FormAddOrEditReservation::text19'
                            )}
                            placement="top"
                            arrow
                          >
                            <div
                              className="FormAddOrEditReservation_middle_r10_tooltip"
                              style={{ display: 'flex', marginLeft: '10px' }}
                            >
                              <SVGIconInfo />
                            </div>
                          </InfoTooltip>
                        </>
                      ),
                      onChange: (val) => {
                        field?.onChange?.(val);
                      }
                    }}
                    checkboxPlacement="right"
                  />
                )}
              />
            </div> */}

      <div className="FormAddOrEditReservation_inner">
        <div className="FormAddOrEditReservation_inner_inner">
          <div className="FormAddOrEditReservation_top">
            <h1 className="FormAddOrEditReservation_top_r1">
              {t('modals-and-forms:::FormAddOrEditReservation::text1')} -{' '}
              {companyContacts.contacts.name}
            </h1>

            <div className="FormAddOrEditReservation_top_r2">
              {state?.tabs?.map?.((tab, i) => {
                const isActive = tab?.value === state?.activeTab;

                return (
                  <p
                    key={i}
                    className={joinClasses(
                      `FormAddOrEditReservation_top_r2_item`,
                      isActive ? 'isActive' : ''
                    )}
                    onClick={() => {
                      setState((previous) => ({
                        ...previous,
                        activeTab: tab?.value
                      }));
                    }}
                  >
                    {tab?.label}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="FormAddOrEditReservation_middle">
            {isError ? (
              <div>
                <ErrorInput
                  msgError={t(
                    'modals-and-forms:::FormAddOrEditReservation::At least one value must be selected'
                  )}
                />
              </div>
            ) : null}
            <div className="FormAddOrEditReservation_middle_r7">
              <Controller
                defaultValue
                name="pool"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: field?.value,
                      placeholder: t(
                        'modals-and-forms:::FormAddOrEditReservation::text10'
                      ),
                      onChange: (val) => {
                        field?.onChange?.(val);
                      }
                    }}
                    checkboxPlacement="right"
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r8">
              <Controller
                defaultValue
                name="dart"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: field?.value,
                      placeholder: t(
                        'modals-and-forms:::FormAddOrEditReservation::text11'
                      ),
                      onChange: (val) => {
                        field?.onChange?.(val);
                      }
                    }}
                    checkboxPlacement="right"
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r9">
              <Controller
                defaultValue
                name="eat"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: field?.value,
                      placeholder: t(
                        'modals-and-forms:::FormAddOrEditReservation::text12'
                      ),
                      onChange: (val) => {
                        field?.onChange?.(val);
                      }
                    }}
                    checkboxPlacement="right"
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r6">
              <Controller
                name="number_of_people"
                control={control}
                render={({ field }) => (
                  <div className="FormAddOrEditReservation_middle_r6__inner">
                    <p>
                      {t('modals-and-forms:::FormAddOrEditReservation::text9')}
                    </p>

                    <InputSelect
                      select={{
                        ...field,
                        placeholder: '',
                        value: state?.numberOfPeopleSelect,
                        options: state?.numberOfPeopleOptions,
                        onChange: (val: any) => {
                          setState((previous) => ({
                            ...previous,
                            numberOfPeopleSelect: val
                          }));
                          field?.onChange?.(val?.value);
                        }
                      }}
                      selectHeight={45}
                      floatingLabel={false}
                      msgError={errors?.number_of_people?.message || ''}
                    />
                  </div>
                )}
              />
            </div>

            {state?.activeTab === EReservationType.group ? (
              <div className="FormAddOrEditReservation_middle_r1">
                <Input
                  input={{
                    placeholder: t(
                      'modals-and-forms:::FormAddOrEditReservation::text4'
                    ),
                    ...register('company_name')
                  }}
                />
              </div>
            ) : null}

            <div className="FormAddOrEditReservation_middle_r2">
              <Controller
                name="date_time"
                control={control}
                render={({ field }) => (
                  <InputDate
                    {...field}
                    placeholder={t(
                      'modals-and-forms:::FormAddOrEditReservation::text5'
                    )}
                    gapMin={gapMin}
                    isDart={!!getValues('dart')}
                    isPool={!!getValues('pool') || !!getValues('is_tournament')}
                    value={field?.value ? dayjs(field?.value) : null}
                    onChange={(val) => {
                      const valDay = val?.day();
                      const valHour = val?.get('hour');

                      const { workingHours } = companyContacts.contacts;
                      const currWorkingHours: typeof workingHours[0] = (
                        workingHours as any
                      )[valDay];
                      const [workingHourFrom] =
                        currWorkingHours.from.split(':');
                      if (valHour >= +workingHourFrom) {
                        field?.onChange?.(val.toDate());
                      }
                    }}
                    msgError={errors?.date_time?.message || ''}
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r3">
              {/* <Input
                input={{
                  placeholder: t(
                    'modals-and-forms:::FormAddOrEditReservation::text6'
                  ),
                  ...register('duration')
                }}
                icon={<SVGIconTimeClock />} */}
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <InputSelect
                    select={{
                      ...field,
                      placeholder: t(
                        'modals-and-forms:::FormAddOrEditReservation::text6'
                      ),
                      options: timeOptionsHook,
                      value:
                        timeOptionsHook?.find(
                          (item) => getValues('duration') === item?.value
                        ) || '',
                      onChange: (val) => {
                        const value = val as G.TSelect;
                        field?.onChange?.(value?.value);
                      }
                    }}
                    msgError={errors?.duration?.message || ''}
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    input={{
                      ...field,
                      placeholder: t(
                        'modals-and-forms:::FormAddOrEditReservation::yourName'
                      ),
                      value: field?.value || '',
                      onChange: (e) => {
                        field?.onChange?.(e?.target?.value);
                      }
                    }}
                    msgError={errors?.name?.message || ''}
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r5">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    input={{
                      ...field,
                      placeholder: t(
                        'modals-and-forms:::FormAddOrEditReservation::text7'
                      ),
                      value: field?.value || '',
                      onChange: (e) => {
                        const isPlus = e?.target?.value?.[0] === '+';
                        const val = e?.target?.value?.replace?.('+', '');
                        const { isNumber } = IsNumber(val);

                        if (isNumber) {
                          field?.onChange?.(`${isPlus ? '+' : ''}${val}`);
                        }
                      }
                    }}
                    msgError={errors?.phone?.message || ''}
                  />
                )}
              />
            </div>

            <div className="FormAddOrEditReservation_middle_r6">
              <InputTextarea
                textarea={{
                  placeholder: t(
                    'modals-and-forms:::FormAddOrEditReservation::text8'
                  ),
                  ...register('comment')
                }}
              />
            </div>
          </div>

          {/* {state?.activeTab === EReservationType.group ? (
              <div className="FormAddOrEditReservation_middle_r6">
                <Controller
                  name="number_of_people"
                  control={control}
                  render={({ field }) => (
                    <div className="FormAddOrEditReservation_middle_r6__inner">
                      <p>
                        {t(
                          'modals-and-forms:::FormAddOrEditReservation::text9'
                        )}
                      </p>

                      <InputSelect
                        select={{
                          ...field,
                          placeholder: '',
                          value: state?.numberOfPeopleSelect,
                          options: state?.numberOfPeopleOptions,
                          onChange: (val: any) => {
                            setState((previous) => ({
                              ...previous,
                              numberOfPeopleSelect: val
                            }));
                            field?.onChange?.(val?.value);
                          }
                        }}
                        selectHeight={45}
                        floatingLabel={false}
                      />
                    </div>
                  )}
                />
              </div>
            ) : null} */}

          <div className="FormAddOrEditReservation_bottom">
            <div className="FormAddOrEditReservation_bottom_r1">
              <Button
                button={{
                  type: 'submit',
                  onClick: () => testCheckboxHandler(),
                  disabled: isSubmitting || state?.loadingBlockedTimes
                }}
                isLoading={isSubmitting}
              >
                {t(`modals-and-forms:::FormAddOrEditReservation::text15`)}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div />
    </ContainerFormAddOrEditReservation>
  );
};

export namespace NFormAddOrEditReservation {
  export type TTab = { value: GQLEnums.EReservationType; label: string };

  export interface IState {
    activeTab: GQLEnums.EReservationType;
    tabs: TTab[];
    numberOfPeopleOptions: G.TSelect<number, number>[];
    numberOfPeopleSelect: G.TSelect<number, number> | null;
    debounceBlockedTimes: number;
    blockedTimesByDateNumber: NHandlerReservationBlockedTimes.TPayload['blockedTimesByDateNumber'];
    loadingBlockedTimes: boolean;
  }
}

// eslint-disable-next-line prettier/prettier
const ContainerFormAddOrEditReservation = styled(CustomForm)`
  --padding: 30px;
  --topHeight: 137px;
  --bottomHeight: 98px;

  .FormAddOrEditReservation_inner_inner {
    position: relative;
    width: 450px;
    max-width: 100%;
  }

  .FormAddOrEditReservation_top {
    position: absolute;
    top: calc(0px - var(--topHeight));
    left: 0;
    width: 100%;
    height: var(--topHeight);
    padding: 0 var(--padding);
    padding-top: 35px;
    border-radius: 20px 20px 0 0;
    background-color: #3838388d;
  }

  .FormAddOrEditReservation_top_r1 {
    margin: 0;
    margin-bottom: 50px;
    font: normal normal bold 18px/22px Roboto;
    letter-spacing: 0.36px;
    color: #ffffff;
  }

  .FormAddOrEditReservation_top_r2 {
    display: flex;
    align-items: center;
    box-shadow: inset 0 -1px 0 0 #383838;
  }

  .FormAddOrEditReservation_top_r2_item {
    cursor: pointer;
    position: relative;
    margin: 0;
    padding-bottom: 12px;
    font: normal normal normal 15px/18px Roboto;
    letter-spacing: 0.15px;
    color: #a9a9a9;

    margin: 0;

    :not(:last-child) {
      margin-right: 50px;
    }

    &.isActive {
      color: #ffffff;

      ::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #ff0055;
      }
    }
  }

  .FormAddOrEditReservation_middle {
    overflow: auto;
    background-color: #3838388d;
    max-height: calc(
      ${({ theme }) => theme?.cssVars?.screenHeight}px - var(--navbarHeight) -
        var(--footerHeight) - 2 * 40px - var(--topHeight) - var(--bottomHeight)
    );
    padding: 20px 0;

    > div {
      padding: 0 var(--padding);

      :not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .FormAddOrEditReservation_middle_r1 {
    //
  }

  .FormAddOrEditReservation_middle_r2 {
    //
  }

  .FormAddOrEditReservation_middle_r3 {
    //
  }

  .FormAddOrEditReservation_middle_r4 {
    //
  }

  .FormAddOrEditReservation_middle_r5 {
    //
  }

  .FormAddOrEditReservation_middle_r6 {
    //
  }

  .FormAddOrEditReservation_middle_r6__inner {
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > p {
      margin: 0;

      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.5px;
      color: #a9a9a9;
    }

    > div {
      width: 160px;
    }
  }

  .FormAddOrEditReservation_middle_r7,
  .FormAddOrEditReservation_middle_r8,
  .FormAddOrEditReservation_middle_r9,
  .FormAddOrEditReservation_middle_r10 {
    height: 56px;
    display: flex;
    align-items: center;

    > div {
      width: 100%;
    }

    .InputCheckbox_r1 {
      width: 100%;
      justify-content: space-between;
    }
  }

  .FormAddOrEditReservation_middle_r10_tooltip {
    display: flex;
    margin-left: 10px;

    :hover {
      svg {
        path {
          fill: #ffffff;
        }
      }
    }
  }

  .FormAddOrEditReservation_bottom {
    position: absolute;
    bottom: calc(0px - var(--bottomHeight));
    left: 0;
    width: 100%;
    height: var(--bottomHeight);
    padding: 0 var(--padding);
    border-radius: 0 0 20px 20px;
    background-color: #3838388d;
  }

  .FormAddOrEditReservation_bottom_r1 {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: inset 0 1px 0 0 #383838;
  }

  // mobile
  ${_(media.max.sm)} {
    --padding: 15px;

    .FormAddOrEditReservation_inner_inner {
      width: 100%;
    }

    .FormAddOrEditReservation_top {
      position: static;
    }

    .FormAddOrEditReservation_middle {
      max-height: unset;
    }

    .FormAddOrEditReservation_bottom {
      position: static;
      border-radius: 0;
    }

    .FormAddOrEditReservation_bottom_r1 {
      button {
        width: 100%;
        height: 50px;
        justify-content: center;
      }
    }
  }
`;
