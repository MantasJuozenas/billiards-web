import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { clientAxiosApollo } from '@clients/axios/client-axios-apollo';
import { axiosApolloEmitter } from '@clients/axios/client-axios-apollo/utils/refetch-emitter';
import { TIME_BLOCKING_EVENT_COLORS } from '@constants/app-constants';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { UpdateBlockedTimeGqlMutation } from '@store/modules/blocked-time/gql-documents';
import { setBlockedTimeData } from '@store/modules/modals-and-forms/actions';
import { defaultLocale } from '@store/modules/translations/types';
import { SVGIconCircle } from '@styles/global-icons/icons/svg-icon-circle';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import { HandlerShowToast } from '@utilsFn/handler-show-toast';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';
import {
  Calendar as RBC,
  CalendarProps as RBCP,
  DateCellWrapperProps,
  DateHeaderProps,
  DateLocalizer,
  DateRangeFormatFunction,
  Formats,
  HeaderProps,
  Messages,
  ToolbarProps,
  Views
} from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps
} from 'react-big-calendar/lib/addons/dragAndDrop';
import { useDispatch } from 'react-redux';
import { Optional } from 'sequelize/types';
import styled from 'styled-components';

import {
  AreDaysSame,
  DateToDateNumber,
  IsTimeSame,
  NPageTimeBlocking
} from '../page-time-blocking';

const DNDRBC = withDragAndDrop(RBC);

type TViews = typeof Views[keyof typeof Views];

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(localeData);
dayjs.extend(minMax);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const CapitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

export const IsAllDay = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return Math.abs(d1.getTime() - d2.getTime()) >= 84_600_000;
};

export const IsTimeOverlap = (
  range1: { start: Date; end: Date; allDay: boolean },
  range2: { start: Date; end: Date; allDay: boolean }
) => {
  const time1Start = range1.start.getTime();
  const time1End = range1.end.getTime();
  const time2Start = range2.start.getTime();
  const time2End = range2.end.getTime();
  return (
    (AreDaysSame(range1.start, range2.start) &&
      (range1.allDay || range2.allDay)) ||
    (time1Start > time2Start && time1Start < time2End) ||
    (time1End < time2End && time1End > time2Start) ||
    (time1Start < time2Start && time1End > time2End)
  );
};

const Locale = (m: Dayjs, c?: string) => (c ? m.locale(c) : m);

const DayjsLocalizer = () => {
  return new DateLocalizer({
    formats: {},
    firstOfWeek(_culture) {
      const data = dayjs.localeData();
      return data ? data?.firstDayOfWeek() : 0;
    },

    format(value, format, culture) {
      return Locale(dayjs(value), culture).format(format);
    }
  });
};

const EventTimeRangeFormat: DateRangeFormatFunction = (
  { start, end },
  culture,
  _localizer
) =>
  _localizer
    ? `${_localizer?.format(start, 'HH:mm', culture)} - ${_localizer?.format(
        end,
        'HH:mm',
        culture
      )}`
    : '';

export const Calendar = (
  props: Omit<Optional<RBCP, 'localizer'>, 'events'> & {
    refetchQueries?: string[];
    events: NPageTimeBlocking.RBCEvent[];
  }
) => {
  const { refetchQueries } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isMobile = useSelector((s) => s.device.isMobile);
  const isAdministrator = useSelector((s) => s.auth.isAdministrator);

  const [calDate, setCalDate] = React.useState<Date>(new Date());
  const [calView, setCalView] = React.useState<TViews>(Views.MONTH);
  const [canEditEvent, setCanEditEvent] = React.useState<boolean>(true);

  const companyContacts = GetCompanyContacts();

  const client = clientAxiosApollo;

  const localizer = DayjsLocalizer();

  const toastStrings: G.IToastStrings = {
    ok: {
      edit: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventEdited')
      }
    },
    error: {
      edit: {
        msg: t('modals-and-forms:::FormCreateEditEventInfo::EventEditFailed')
      }
    }
  };

  const formats: Formats = {
    weekdayFormat: (date, culture, _localizer) =>
      _localizer ? _localizer?.format(date, 'dd', culture).toUpperCase() : '',
    dayFormat: (date, culture, _localizer) =>
      _localizer
        ? isMobile
          ? (_localizer?.format(date, 'D ', culture) || '') +
            CapitalizeFirstLetter(_localizer?.format(date, 'dd', culture))
          : (_localizer?.format(date, 'D ', culture) || '') +
            CapitalizeFirstLetter(_localizer?.format(date, 'dddd', culture))
        : '',
    dateFormat: (date, culture, _localizer) =>
      _localizer ? _localizer?.format(date, 'D', culture) : '',
    monthHeaderFormat: (date, culture, _localizer) =>
      _localizer
        ? CapitalizeFirstLetter(_localizer?.format(date, 'MMMM, YYYY', culture))
        : '',
    dayRangeHeaderFormat: (date, culture, _localizer) =>
      _localizer
        ? CapitalizeFirstLetter(
            _localizer?.format(date?.start, 'MMMM D [-] ', culture)
          ) +
          CapitalizeFirstLetter(
            _localizer?.format(
              date?.end,
              `${
                date?.start?.getMonth() !== date?.end?.getMonth() ? 'MMMM ' : ''
              }D[,] YYYY`,
              culture
            )
          )
        : '',
    dayHeaderFormat: (date, culture, _localizer) =>
      _localizer
        ? CapitalizeFirstLetter(
            _localizer?.format(date, 'MMMM D [d.,] YYYY', culture)
          )
        : '',
    eventTimeRangeFormat: EventTimeRangeFormat,
    timeGutterFormat: 'HH:mm'
  };

  const messages: Messages = {
    allDay: t(`page-time-blocking:::Calendar::allDay`),
    week: t(`page-time-blocking:::Calendar::week`),
    day: t(`page-time-blocking:::Calendar::day`),
    month: t(`page-time-blocking:::Calendar::month`),
    today: t(`page-time-blocking:::Calendar::today`),
    agenda: t(`page-time-blocking:::Calendar::agenda`),
    showMore: (total: number) =>
      isMobile
        ? `+${total}`
        : t(`page-time-blocking:::Calendar::showMore`, {
            replace: { num: total }
          })
  };

  const onNavigate = useCallback(
    (newDate: Date) => setCalDate(newDate),
    [setCalDate]
  );
  const onView = useCallback(
    (newView: TViews) => {
      setCalView(newView);
    },
    [setCalView]
  );

  const CalWeekHead = React.useCallback((data: HeaderProps) => {
    return <div title={data?.label}>{data?.label}</div>;
  }, []);

  const CalToolbar = React.useCallback((data: ToolbarProps) => {
    return (
      <div className="rbc-toolbar">
        <div className="rbc-views">
          {Array.isArray(data?.views)
            ? data?.views?.map((viewName: TViews, index: number) => (
                <div
                  key={index}
                  className={joinClasses(
                    `rbc-view-${viewName}`,
                    viewName === data?.view ? 'selected' : ''
                  )}
                  onClick={() => onView(viewName)}
                >
                  <p>{data?.localizer?.messages?.[viewName]}</p>
                </div>
              ))
            : null}
        </div>
        <div className="rbc-main-header">{data?.label}</div>
        <div className="rbc-navbar">
          <div
            className="rbc-nav-control-left"
            onClick={() => {
              onNavigate(
                dayjs(data?.date)
                  .add(-1, data?.view as ManipulateType)
                  .toDate()
              );
            }}
          >
            <ArrowLeft />
          </div>
          <div
            className="rbc-nav-control-middle"
            onClick={() => {
              onNavigate(new Date());
            }}
          >
            <SVGIconCircle />
          </div>
          <div
            className="rbc-nav-control-right"
            onClick={() => {
              onNavigate(
                dayjs(data?.date)
                  .add(1, data?.view as ManipulateType)
                  .toDate()
              );
            }}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
    );
  }, []);

  const CalDateHeader = React.useCallback((data: DateHeaderProps) => {
    return (
      <DateHeaderStyle>
        <div className="date-header-box">
          <div className="date-header-filler" />
          <button
            type="button"
            className="rbc-button-link"
            onClick={data?.onDrillDown}
          >
            {data?.label}
          </button>
        </div>
      </DateHeaderStyle>
    );
  }, []);

  const CalDateCellWrapper = React.useCallback((data: DateCellWrapperProps) => {
    const dateCell: Date | undefined = data?.value;
    const dateNow = new Date();
    return (
      <div
        className={joinClasses(
          'rbc-day-bg',
          dateCell?.getDate() === dateNow.getDate() &&
            dateCell?.getMonth() === dateNow.getMonth() &&
            dateCell?.getFullYear() === dateNow.getFullYear()
            ? 'rbc-today'
            : ''
        )}
        onClick={onEventOpenModal('create', {
          start: dateCell,
          end: dateCell,
          date: dayjs(`${DateToDateNumber(dateCell)}`).toDate()
        })}
      />
    );
  }, []);

  const components = React.useMemo(
    () => ({
      toolbar: CalToolbar,
      month: {
        dateHeader: CalDateHeader
      },
      week: {
        header: CalWeekHead
      },
      dateCellWrapper: CalDateCellWrapper
    }),
    []
  );

  const eventPropertyGetter = useCallback(
    (
      event: NPageTimeBlocking.RBCEvent,
      _start: Date,
      _end: Date,
      isSelected: boolean
    ) => {
      const bs = [
        Number(!!event?.resource?.pool),
        Number(!!event?.resource?.dart)
      ].join('');
      return {
        ...(bs in TIME_BLOCKING_EVENT_COLORS
          ? {
              style: {
                ...(isSelected
                  ? {
                      filter: 'brightness(.9)'
                    }
                  : {}),
                borderTop: `2px solid ${
                  TIME_BLOCKING_EVENT_COLORS[
                    bs as keyof typeof TIME_BLOCKING_EVENT_COLORS
                  ]
                }EE`,
                pointerEvents: 'auto'
              }
            }
          : {})
      };
    },
    []
  );

  const handleSelecting = useCallback((data: { start: Date; end: Date }) => {
    setTimeout(() => {
      const element = document.getElementsByClassName('rbc-slot-selection')[0];
      if (element?.children?.[0])
        element.children[0].innerHTML = EventTimeRangeFormat(
          data,
          undefined,
          localizer
        );
    }, 1);
  }, []);

  const handleEventDrop = useCallback(
    (
      data?: Omit<
        Parameters<withDragAndDropProps['onEventDrop'] & {}>[0],
        'event'
      > & {
        event: NPageTimeBlocking.RBCEvent;
      }
    ) => {
      setCanEditEvent(false);
      setTimeout(() => {
        setCanEditEvent(true);
      }, 100);
      if (data && 'event' in data) {
        const id = data?.event?.resource?.id;
        if (!!id && data?.start && data?.end) {
          updateEventRange(id, {
            start: new Date(data?.start),
            end: new Date(data?.end),
            allDay: data?.isAllDay
          });
        }
      }
    },
    [props?.events]
  );

  const handleEventResize = useCallback(
    (
      data?: Omit<
        Parameters<withDragAndDropProps['onEventResize'] & {}>[0],
        'event'
      > & {
        event: NPageTimeBlocking.RBCEvent;
      }
    ) => {
      if (data && 'event' in data) {
        const { event }: { event: NPageTimeBlocking.RBCEvent } = data;
        const id = event?.resource?.id;
        if (!!id && data?.start && data?.end) {
          updateEventRange(id, {
            start: new Date(data?.start),
            end: new Date(data?.end),
            allDay: data?.isAllDay
          });
        }
      }
    },
    [props?.events]
  );

  const onEventOpenModal =
    (type: G.TOpenModalTypes, event: NPageTimeBlocking.RBCEvent) =>
    (_mouseEvent?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startDate = new Date(event?.start || Date.now());
      const endDate = new Date(event?.end || startDate.getTime() + 60_000);
      if (isAdministrator && type === 'create') {
        const { workingHours } = companyContacts.contacts;
        const day = dayjs(startDate).day();
        const range = workingHours[
          day as keyof typeof workingHours
        ] as typeof workingHours[0];
        const start = IsTimeSame(startDate, endDate, event?.date)
          ? dayjs(startDate)
              .set('h', Number(range?.from?.split(':')[0]) || 0)
              .set('m', Number(range?.from?.split(':')[1]) || 0)
              .toDate()
          : event?.start;
        const end = IsTimeSame(startDate, endDate, event?.date)
          ? dayjs(endDate)
              .set('h', Number(range?.to?.split(':')[0]) || 0)
              .set('m', Number(range?.to?.split(':')[1]) || 0)
              .toDate()
          : event?.end;
        dispatch(
          setBlockedTimeData({
            openModalType: type,
            start,
            end,
            refetchQueries,
            styleContent: {
              backgroundColor: '#383838ee',
              borderRadius: '20px'
            },
            data: {
              date: dayjs(`${DateToDateNumber(start)}`).toDate(),
              start,
              end
            }
          })
        );
      }
      if (isAdministrator && type === 'edit') {
        dispatch(
          setBlockedTimeData({
            openModalType: type,
            start: startDate,
            end: endDate,
            refetchQueries: props?.refetchQueries,
            styleContent: {
              backgroundColor: '#383838ee',
              borderRadius: '20px'
            },
            data: {
              start: startDate,
              end: endDate,
              ...event,
              date: dayjs(`${DateToDateNumber(startDate)}`).toDate()
            }
          })
        );
      }
    };

  const handlerAfterQueryDone = (type?: string) => {
    if (type === 'range_update') {
      HandlerShowToast({
        toastType: 'edit',
        toastCode: 'ok',
        color: 'green',
        toastStrings,
        autoCloseAfter: 5000,
        dispatch
      });
    }
    if (refetchQueries)
      for (let i = 0; i < refetchQueries.length; i++)
        axiosApolloEmitter.emit(refetchQueries[i]);
  };

  const handlerQueryError = (typeName: string) => (error: Error) => {
    console.error(typeName, error);
    HandlerShowToast({
      toastType: 'edit',
      toastCode: 'error',
      color: 'red',
      toastStrings,
      autoCloseAfter: 5000,
      dispatch
    });
  };

  const updateEventRange = (
    id: number,
    range: { start: Date; end: Date; allDay?: boolean }
  ) => {
    if (!AreDaysSame(range?.start, range?.end) && range?.end)
      range.end = dayjs(`${DateToDateNumber(range?.start)}T23:59:59`).toDate();

    if (IsTimeSame(range?.start, range?.end))
      return HandlerShowToast({
        toastType: 'edit',
        toastCode: 'error',
        color: 'red',
        toastStrings,
        autoCloseAfter: 5000,
        dispatch
      });

    if (
      props?.events?.some(
        (event) => event?.resource?.id !== id && (!event?.start || !event?.end)
      )
    )
      return handlerQueryError('UpdateBlockedTimeGqlMutation')(
        new Error('Ranges overlapping')
      );

    client<
      GQL_gen.Queries.UpdateBlockedTimeGqlMutation,
      GQL_gen.Queries.UpdateBlockedTimeGqlMutationVariables
    >({
      query: UpdateBlockedTimeGqlMutation,
      variables: {
        whereUpdateBlockedTime: { id: { _eq: id } },
        _setUpdateBlockedTime: {
          date_number: DateToDateNumber(range?.start),
          ...(range?.allDay || IsAllDay(range?.start, range?.end)
            ? {
                all_day: true,
                time_from: null,
                time_to: null
              }
            : {
                all_day: null,
                time_from: `${range?.start?.getHours()}:${range?.start?.getMinutes()}`,
                time_to: `${range?.end?.getHours()}:${range?.end?.getMinutes()}`
              })
        }
      }
    })
      .then(() => handlerAfterQueryDone('range_update'))
      .catch(handlerQueryError('UpdateBlockedTimeGqlMutation'));
  };

  return (
    <DNDRBC
      {...(props as any)}
      date={calDate}
      onNavigate={onNavigate}
      onView={onView}
      view={calView}
      min={dayjs(0).set('hour', 12).toDate()}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      culture={defaultLocale}
      className="calendar"
      localizer={localizer}
      components={components}
      onSelectEvent={(event: NPageTimeBlocking.RBCEvent) => {
        if (canEditEvent) onEventOpenModal('edit', event)();
      }}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onSelectSlot={(data) =>
        onEventOpenModal('create', {
          start: data?.start,
          end: data?.end,
          date: dayjs(`${DateToDateNumber(data?.start)}`).toDate()
        })()
      }
      onSelecting={handleSelecting}
      eventPropGetter={eventPropertyGetter}
      messages={messages}
      formats={formats}
      resizable={calView === Views.WEEK || calView === Views.DAY}
      selectable
      showMultiDayTimes
    />
  );
};

// Calendar styling in [[src\components\pages\admin\time-blocking\page-time-blocking.tsx]]

const DateHeaderStyle = styled.div`
  .date-header-box {
    display: flex;
    .date-header-filler {
      flex-grow: 1;
      cursor: pointer;
    }
    .rbc-button-link {
      padding: 0 5px;
    }
  }
`;
