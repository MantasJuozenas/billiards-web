import { useAxiosApolloQuery } from '@clients/axios/client-axios-apollo';
import { GetBlockedTimeGqlQuery } from '@components/pages/admin/time-blocking/gql-documents';
import {
  AreDaysSame,
  NPageTimeBlocking
} from '@components/pages/admin/time-blocking/page-time-blocking';
import { Button } from '@components/utils/buttons/button';
import { CustomForm } from '@components/utils/form';
import { InputCheckbox } from '@components/utils/inputs/input-checkbox';
import { InputSelect } from '@components/utils/inputs/input-select';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  setBlockedTimeData,
  setConfirmationData
} from '@store/modules/modals-and-forms/actions';
import { _, media } from '@utilsFn/breakpoint';
import { dayjs, GetDateFromDateString } from '@utilsFn/dayjs-fn';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import { HandlerShowToast } from '@utilsFn/handler-show-toast';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { i18n, useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import styled from 'styled-components';
import * as yup from 'yup';

import { DeleteBlockedTimeConfirmation } from '../confirmation/components/delete-blocked-time/delete-blocked-time-confirmation';
import { ELocation } from '../forms-interfaces';
import { AddOrEditBlockedTimeMutation, NHandlers } from './gql-documents';

const jumpMin = 30;

const GenerateRangesFromEvents = (
  events: NPageTimeBlocking.RBCEvent[],
  current: { start?: Date; end?: Date }
) => {
  return (
    (events
      ?.map((m) => {
        const hrsStart = m?.start?.getHours() || 0;
        const minStart = m?.start?.getMinutes() || 0;
        const hrsEnd = m?.end?.getHours() || 0;
        const minEnd = m?.end?.getMinutes() || 0;
        return m?.start &&
          m?.end &&
          current?.start &&
          current?.end &&
          (hrsStart || hrsStart === 0) &&
          (minStart || minStart === 0) &&
          (hrsEnd || hrsEnd === 0) &&
          (minEnd || minEnd === 0) &&
          AreDaysSame(m?.start, m?.end, current?.start, current?.end)
          ? [hrsStart * 60 + minStart, hrsEnd * 60 + minEnd]
          : null;
      })
      .filter((f) => !!f) as [number, number][]) || []
  );
};

const RequiredString = () =>
  i18n?.t('modals-and-forms:::FormInsertUpdateBlockedTime::required');
const RequiredString2 = () =>
  i18n?.t(`modals-and-forms:::FormInsertUpdateBlockedTime::required2`);

const Schemas = () => {
  const schema = yup.object().shape<G.YupMap<Form.FAddOrEditBlockedTime>>(
    {
      all_day: yup.bool().optional(),
      time_from: yup
        .number()
        .nullable()
        .when('all_day', (value: boolean, _schema) =>
          value ? _schema.optional() : _schema.required(RequiredString)
        ),
      time_to: yup
        .number()
        .nullable()
        .when('time_from', (value: number, _schema) =>
          _schema.min((value || 0) + jumpMin)
        )
        .when('all_day', (value: boolean, _schema) =>
          value ? _schema.optional() : _schema.required(RequiredString)
        ),
      pool: yup
        .bool()
        .when('dart', (value: boolean, _schema) =>
          !value ? _schema.oneOf([true], RequiredString2) : _schema
        )
        .optional(),
      dart: yup
        .bool()
        .when('pool', (value: boolean, _schema) =>
          !value ? _schema.oneOf([true], RequiredString2) : _schema
        )
        .optional(),
      location: yup
        .mixed()
        .oneOf(Object.keys(ELocation))
        .required(RequiredString)
    },
    [
      ['pool', 'dart'],
      ['dart', 'pool']
    ]
  );
  return { schema };
};

const TimeToMinutes = (time?: string) => {
  if (!time) return 0;
  const parts = time.split(':');
  if (parts.length !== 2 || parts.some((s) => Number.isNaN(Number(s))))
    return Number.NaN;
  return Number(parts[0]) * 60 + Number(parts[1]);
};

const MinutesToTime = (min: number) => {
  const mins = min % 60;
  const hrs = (min - mins) / 60;
  return `${hrs}:${mins < 10 ? `0${mins}` : mins}`;
};

export const FormInsertUpdateBlockedTime = () => {
  const dispatch = useDispatch();
  const blockedTime = useSelector((s) => s.modalsAndForms.blockedTime);

  const { t } = useTranslation();

  const client = useAxiosApolloQuery;

  const [getBlockedTime, { data: blockedTimeDataPre }] = client<
    GQL_gen.Queries.GetBlockedTimeGqlQuery,
    GQL_gen.Queries.GetBlockedTimeGqlQueryVariables
  >({
    query: GetBlockedTimeGqlQuery
  });

  const blockedTimeData = (blockedTimeDataPre?.blocked_time || [])
    .map((m) => {
      const date = m?.date_number?.toString() || '';
      const start = `${date}${m?.time_from}`;
      const end = `${date}${m?.time_to}`;
      return {
        ...m,
        date: GetDateFromDateString(date)?.dateDayjs?.toDate(),
        start: GetDateFromDateString(start)?.dateDayjs?.toDate(),
        end: GetDateFromDateString(end)?.dateDayjs?.toDate()
      };
    })
    .filter((f) => f.id !== blockedTime?.data?.resource?.id);

  const blockedRanges = GenerateRangesFromEvents(blockedTimeData, {
    start: blockedTime.start,
    end: blockedTime.end
  });

  const toastStrings: G.IToastStrings = {
    ok: {
      create: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventCreated')
      },
      edit: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventEdited')
      },
      delete: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventDeleted')
      }
    },
    error: {
      create: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventCreateFailed')
      },
      edit: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventEditFailed')
      }
    }
  };

  const resource = blockedTime?.data?.resource || {
    all_day: true,
    pool: true,
    dart: true
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    getValues: getFormValues,
    setValue: setFormValue,
    clearErrors: clearFormErrors,
    setError: setFormError,
    watch: watchFormFields,
    trigger: forceValidate
  } = useForm<Form.FAddOrEditBlockedTime>({
    resolver: yupResolver(Schemas().schema),
    defaultValues: {
      all_day: resource.all_day || undefined,
      time_from: !resource.all_day
        ? TimeToMinutes(
            (blockedTime?.data?.start &&
              dayjs(blockedTime?.data?.start).format('HH:mm')) ||
              blockedTime?.data?.resource?.time_from ||
              ''
          ) || undefined
        : undefined,
      time_to: !resource.all_day
        ? TimeToMinutes(
            (blockedTime?.data?.end &&
              dayjs(blockedTime?.data?.end).format('HH:mm')) ||
              blockedTime?.data?.resource?.time_to ||
              ''
          ) || undefined
        : undefined,
      pool: resource.pool || undefined,
      dart: resource.dart || undefined
    }
  });

  const {
    all_day: watchedAllDay,
    time_from: watchedTimeFrom,
    time_to: watchedTimeTo
  } = watchFormFields();

  const companyContacts = GetCompanyContacts();

  const blockingDateDJS = dayjs(blockedTime?.data?.date || new Date());
  const { workingHours } = companyContacts.contacts;
  const currWorkingHours: typeof workingHours[0] =
    workingHours[blockingDateDJS.day() as keyof typeof workingHours];
  const currWorkingHoursMin: [number, number] = [
    TimeToMinutes(currWorkingHours?.from),
    TimeToMinutes(currWorkingHours?.to)
  ];

  const allTimeOptions: G.TSelect<number, number>[] = Array.from({
    length: (currWorkingHoursMin[1] - currWorkingHoursMin[0]) / jumpMin + 1
  })
    .map((_item, index) => {
      const min = currWorkingHoursMin[0] + index * jumpMin;
      return !blockedRanges?.some(
        (s) =>
          (s[1] === min && currWorkingHoursMin[1] === s[1]) ||
          (s[0] === min && currWorkingHoursMin[0] === s[0]) ||
          (min > s[0] && min < s[1]) ||
          blockedRanges?.some((s2) => s2[1] === min && s[0] === s2[1])
      )
        ? { label: MinutesToTime(min), value: min }
        : null;
    })
    .filter((item) => item || item === 0) as G.TSelect<number, number>[];

  const handleCheckboxError = (
    val: boolean,
    currentName: keyof Form.FAddOrEditBlockedTime,
    names: (keyof Form.FAddOrEditBlockedTime)[]
  ) => {
    if (val) {
      names.map((name) => clearFormErrors(name));
    } else if (
      names
        .filter((f) => f !== currentName)
        .every((name) => !getFormValues(name))
    ) {
      names.map((name) => setFormError(name, { message: RequiredString2() }));
    }
  };

  const afterQueryDone = (data?: NHandlers.IDoneProps) => {
    HandlerShowToast({
      dispatch,
      color: 'green',
      toastType: data?.action || 'create',
      toastCode: 'ok',
      toastStrings,
      autoCloseAfter: 5000
    });
  };

  const afterQueryError = (data?: NHandlers.IErrorProps) => {
    HandlerShowToast({
      dispatch,
      color: 'red',
      toastType: data?.action || 'create',
      toastCode: 'error',
      toastStrings,
      autoCloseAfter: 5000
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    if (
      blockedTimeData?.some(
        (event) =>
          event?.id !== blockedTime?.data?.resource?.id &&
          (!event?.start || !event?.end)
      )
    ) {
      afterQueryError({
        error: new Error('Ranges overlapping'),
        action: blockedTime?.data?.resource?.id ? 'edit' : 'create'
      });
      return;
    }

    await AddOrEditBlockedTimeMutation({
      dispatch,
      toastStrings,
      refetchQueries: blockedTime?.refetchQueries,
      mutationData: {
        id: blockedTime?.data?.resource?.id,
        values: {
          ...data,
          time_from: data?.time_from
            ? MinutesToTime(data.time_from)
            : undefined,
          time_to: data?.time_to ? MinutesToTime(data.time_to) : undefined,
          date_number: Number(blockingDateDJS.format('YYYYMMDD')),
          location: data.location
        }
      },
      afterQueryDone,
      afterQueryError
    });
  });

  const onDelete = async () => {
    if (blockedTime?.data?.resource?.id) {
      dispatch(
        setConfirmationData({
          openModalType: 'delete',
          refetchQueries: blockedTime?.refetchQueries,
          styleContent: {
            backgroundColor: 'transparent'
          },
          component: (
            <DeleteBlockedTimeConfirmation
              id={blockedTime?.data?.resource?.id}
              dateIntervalString={`${dayjs(
                blockedTime?.data?.start || new Date()
              ).format('HH:mm')} - ${dayjs(
                blockedTime?.data?.end || new Date()
              ).format('HH:mm')}`}
              toastStrings={toastStrings}
              refetchQueries={blockedTime?.refetchQueries || []}
              afterQueryDone={afterQueryDone}
              afterQueryError={afterQueryError}
            />
          )
        })
      );
    }
  };

  useEffect(() => {
    getBlockedTime({
      variables: {
        whereBlockedTime: {
          deleted_at: { _is_null: true },
          date_number: { _eq: blockedTime?.data?.resource?.date_number }
        }
      }
    });
  }, [blockedTime]);

  return (
    <ContainerFormInsertUpdateBlockedTime
      id="FormInsertUpdateBlockedTime"
      onSubmit={onSubmit}
    >
      <div className="FormInsertUpdateBlockedTime_inner">
        <div className="FormInsertUpdateBlockedTime_inner_inner">
          <div className="FormInsertUpdateBlockedTime_top">
            <p className="FormInsertUpdateBlockedTime_top_r1">
              {t('modals-and-forms:::FormInsertUpdateBlockedTime::title', {
                date: blockingDateDJS.format('YYYY-MM-DD')
              })}
            </p>
          </div>

          <div className="FormInsertUpdateBlockedTime_middle">
            <div className="FormInsertUpdateBlockedTime_middle_r1">
              <Controller
                name="all_day"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: watchedAllDay,
                      placeholder: t(
                        'modals-and-forms:::FormInsertUpdateBlockedTime::allDay'
                      ),
                      onChange: (val) => {
                        if (val) {
                          setFormValue('time_from', null);
                          setFormValue('time_to', null);
                        }
                        field?.onChange?.(val);
                        forceValidate(['time_from', 'time_to']);
                      }
                    }}
                    checkboxPlacement="right"
                  />
                )}
              />
            </div>

            <div className="FormInsertUpdateBlockedTime_middle_r2">
              <Controller
                name="time_from"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="FormInsertUpdateBlockedTime_middle_r2__inner">
                      <p className="tiny-label">
                        {t(
                          'modals-and-forms:::FormInsertUpdateBlockedTime::timeFrom'
                        )}
                      </p>

                      <InputSelect
                        select={{
                          ...field,
                          placeholder: '',
                          value:
                            allTimeOptions.find(
                              (f) => f.value === watchedTimeFrom
                            ) || null,
                          options: allTimeOptions,
                          filterOption: (
                            option: FilterOptionOption<
                              typeof allTimeOptions[0]['data']
                            >,
                            inputValue
                          ) => {
                            const time = getFormValues('time_to');
                            return (
                              (!time || Number(option?.value) < time) &&
                              (!inputValue ||
                                option?.label?.startsWith(inputValue)) &&
                              !blockedRanges?.some(
                                (s) => s[0] === Number(option?.value)
                              )
                            );
                          },
                          onChange: (val: any) => {
                            if (val?.value && watchedAllDay) {
                              setFormValue('all_day', false);
                            }
                            field?.onChange?.(val?.value);
                          },
                          menuPosition: 'fixed'
                        }}
                        selectHeight={45}
                        floatingLabel={false}
                        msgError={errors?.time_from?.message}
                      />
                    </div>
                  );
                }}
              />
            </div>

            <div className="FormInsertUpdateBlockedTime_middle_r3">
              <Controller
                name="time_to"
                control={control}
                render={({ field }) => (
                  <div className="FormInsertUpdateBlockedTime_middle_r3__inner">
                    <p className="tiny-label">
                      {t(
                        'modals-and-forms:::FormInsertUpdateBlockedTime::timeTo'
                      )}
                    </p>

                    <InputSelect
                      select={{
                        ...field,
                        placeholder: '',
                        value:
                          allTimeOptions.find(
                            (f) => f.value === watchedTimeTo
                          ) || null,
                        options: allTimeOptions,
                        filterOption: (
                          option: FilterOptionOption<
                            typeof allTimeOptions[0]['data']
                          >,
                          inputValue
                        ) => {
                          const time = getFormValues('time_from');
                          return (
                            (!time || Number(option?.value) > time) &&
                            (!inputValue ||
                              option?.label?.startsWith(inputValue)) &&
                            !blockedRanges?.some(
                              (s) => s[1] === Number(option?.value)
                            )
                          );
                        },
                        onChange: (val: any) => {
                          if (val?.value && watchedAllDay) {
                            setFormValue('all_day', false);
                          }
                          field?.onChange?.(val?.value);
                        },
                        menuPosition: 'fixed'
                      }}
                      selectHeight={45}
                      floatingLabel={false}
                      msgError={errors?.time_to?.message}
                    />
                  </div>
                )}
              />
            </div>

            <div className="FormInsertUpdateBlockedTime_middle_r4">
              <Controller
                name="pool"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: field?.value,
                      placeholder: t(
                        'modals-and-forms:::FormInsertUpdateBlockedTime::pool'
                      ),
                      onChange: (val) => {
                        handleCheckboxError(val as boolean, 'pool', [
                          'pool',
                          'dart'
                        ]);
                        field?.onChange?.(val);
                      }
                    }}
                    checkboxPlacement="right"
                    msgError={errors?.pool?.message}
                  />
                )}
              />
            </div>

            <div className="FormInsertUpdateBlockedTime_middle_r5">
              <Controller
                name="dart"
                control={control}
                render={({ field }) => (
                  <InputCheckbox
                    input={{
                      ...(field as any),
                      checked: field?.value,
                      placeholder: t(
                        'modals-and-forms:::FormInsertUpdateBlockedTime::dart'
                      ),
                      onChange: (val) => {
                        handleCheckboxError(val as boolean, 'dart', [
                          'pool',
                          'dart'
                        ]);
                        field?.onChange?.(val);
                      }
                    }}
                    checkboxPlacement="right"
                    msgError={errors?.dart?.message}
                  />
                )}
              />
            </div>

            <div className="FormInsertUpdateBlockedTime_middle_r6">
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <div className="FormInsertUpdateBlockedTime_middle_r6__inner">
                    <p className="tiny-label">
                      {t(
                        'modals-and-forms:::FormInsertUpdateBlockedTime::location'
                      )}
                    </p>

                    <InputSelect
                      select={{
                        ...field,
                        placeholder: '',
                        value: Object.values(ELocation).find(
                          (f) => f === field?.name
                        ),
                        options: Object.values(ELocation)
                          .filter((f) => typeof f === 'string')
                          .map((m) => ({
                            label: m,
                            value: m
                          })),
                        onChange: (val: any) => {
                          field?.onChange?.(val?.value);
                        },
                        menuPosition: 'fixed'
                      }}
                      selectHeight={45}
                      floatingLabel={false}
                      msgError={errors?.location?.message}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="__Modal_Buttons_Div__">
        {blockedTime?.data?.resource ? (
          <Button
            btnType="text"
            btnColor="redFF0055"
            button={{
              type: 'button',
              disabled: isSubmitting,
              onClick: () => onDelete()
            }}
            isLoading={isSubmitting}
          >
            {t(`modals-and-forms:::FormInsertUpdateBlockedTime::delete`)}
          </Button>
        ) : null}
        <Button
          btnType="text"
          btnColor="redFF0055"
          button={{
            type: 'button',
            disabled: isSubmitting,
            onClick: () => dispatch(setBlockedTimeData({ openModalType: null }))
          }}
          isLoading={isSubmitting}
        >
          {t(`modals-and-forms:::FormInsertUpdateBlockedTime::cancel`)}
        </Button>
        <Button
          button={{ type: 'submit', disabled: isSubmitting }}
          isLoading={isSubmitting}
        >
          {t(`modals-and-forms:::FormInsertUpdateBlockedTime::submit`)}
        </Button>
      </div>
    </ContainerFormInsertUpdateBlockedTime>
  );
};

// eslint-disable-next-line prettier/prettier
const ContainerFormInsertUpdateBlockedTime = styled(CustomForm)`
  --padding: 30px;
  --topHeight: 75px;
  --bottomHeight: 98px;

  .tiny-label {
    color: #ffffff;
    font-size: 13px;
    font-weight: 300;
    margin-bottom: 0;
    opacity: 0.7;
  }

  .FormInsertUpdateBlockedTime_inner_inner {
    position: relative;
    width: 450px;
    max-width: 100%;
  }

  .FormInsertUpdateBlockedTime_top {
    top: calc(0px - var(--topHeight));
    left: 0;
    width: 100%;
    height: var(--topHeight);
    padding: 0 var(--padding);
    padding-top: 35px;
    border-radius: 20px 20px 0 0;
  }

  .FormInsertUpdateBlockedTime_top_r1 {
    margin: 0;
    margin-bottom: 50px;
    font: normal normal bold 18px/22px Roboto;
    letter-spacing: 0.36px;
    color: #ffffff;
  }

  .FormInsertUpdateBlockedTime_middle {
    overflow: auto;
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

  .FormInsertUpdateBlockedTime_middle_r2,
  .FormInsertUpdateBlockedTime_middle_r3 {
    > [class$='inner'] {
      :not(:has(div[class^='error-input'])) {
        padding-bottom: 28px;
      }
    }
  }

  .FormInsertUpdateBlockedTime_middle_r1,
  .FormInsertUpdateBlockedTime_middle_r4,
  .FormInsertUpdateBlockedTime_middle_r5 {
    height: 56px;
    display: flex;

    > div {
      width: 100%;
    }

    .InputCheckbox_r1 {
      width: 100%;
      justify-content: space-between;
    }
  }

  .__Modal_Buttons_Div__ {
    position: relative;
    height: 100px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;
    padding: 0 15px;
    background-color: transparent !important;
  }

  // mobile
  ${_(media.max.sm)} {
    --padding: 15px;

    .FormInsertUpdateBlockedTime_inner_inner {
      width: 100%;
    }

    .FormInsertUpdateBlockedTime_top {
      position: static;
    }

    .FormInsertUpdateBlockedTime_middle {
      max-height: unset;
    }

    .FormInsertUpdateBlockedTime_bottom {
      position: static;
      border-radius: 0;
    }
  }
`;
