/* eslint-disable import/export */
import { GetLocaleStorageLocale } from '@store/modules/local-storage/functions/locale';
import { relativeTimeLocaleObjectLT } from '@store/modules/translations/functions/day-js-relative-time';
import { monthsLt, monthsLtKo } from '@store/modules/translations/lists';
import DayJS, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { IsNumber } from './is-number';

DayJS.extend(utc);
DayJS.extend(isBetween);
DayJS.extend(weekOfYear);
DayJS.extend(customParseFormat);
DayJS.extend(updateLocale);

/*
 * update locale formats
 */
DayJS.updateLocale('en', {
  weekStart: 1
});
DayJS.updateLocale('lt', {
  months: (dayjsInstance: Dayjs, format: string) => {
    if (format?.includes?.('MMMM[LT_KO]')) {
      return monthsLtKo[dayjsInstance.month()];
    }

    return monthsLt[dayjsInstance.month()];
  },
  relativeTime: relativeTimeLocaleObjectLT
});

/* eslint-disable prettier/prettier */
function dayjsFn(date?: DayJS.ConfigType): DayJS.Dayjs;
function dayjsFn(date?: DayJS.ConfigType, format?: DayJS.OptionType, strict?: boolean): DayJS.Dayjs;
function dayjsFn(date?: DayJS.ConfigType, format?: DayJS.OptionType, locale?: string, strict?: boolean): DayJS.Dayjs;
/* eslint-enable prettier/prettier */
function dayjsFn(...args: any[]): DayJS.Dayjs {
  const LOCALE = GetLocaleStorageLocale() || 'en';
  return DayJS(...args)?.locale(LOCALE);
}
export const dayjs = dayjsFn;

export const nearestMinutes = (interval: number, someDayjs: Dayjs) => {
  const roundedMinutes =
    Math.round(someDayjs.clone().minute() / interval) * interval;
  return someDayjs.clone().minute(roundedMinutes).second(0);
};

export const nearestPastMinutes = (interval: number, someDayjs: Dayjs) => {
  const roundedMinutes = Math.floor(someDayjs.minute() / interval) * interval;
  return someDayjs.clone().minute(roundedMinutes).second(0);
};

export const nearestFutureMinutes = (interval: number, someDayjs: Dayjs) => {
  const roundedMinutes = Math.ceil(someDayjs.minute() / interval) * interval;
  return someDayjs.clone().minute(roundedMinutes).second(0);
};

export const handlerCalendarMonthDays = (
  month: number,
  year: number
): handlerCalendarMonthDays.IReturn => {
  const endDate = dayjs().utc().year(year).month(month).endOf('month');

  return Array(endDate.date())
    .fill(0)
    .map((_, i) =>
      dayjs()
        .utc()
        .year(year)
        .month(month)
        .date(i + 1)
    )
    .map((day) => ({ day, week: day.week() }))
    .filter(
      ({ week }, i, arr) => arr.findIndex((info) => info.week === week) === i
    )
    .map(({ day, week }) => ({
      week,
      days: Array(7)
        .fill(0)
        .map((_, i) =>
          dayjs(day).utc().week(week).startOf('week').add(i, 'day')
        )
    }));
};

// eslint-disable-next-line no-redeclare
export namespace handlerCalendarMonthDays {
  export type IReturn = {
    week: number;
    days: Dayjs[];
  }[];
}

export const handlerCalendarYearMonthDays = (year: number) => {
  const monthsRequired = 12;
  const yearMonthsDays: handlerCalendarYearMonthDays.IReturn = [];
  // eslint-disable-next-line no-plusplus
  for (let month = 0; month < monthsRequired; month++) {
    yearMonthsDays?.push({
      monthNo: month + 1,
      monthName: dayjs().month(month).format('MMMM'),
      month: handlerCalendarMonthDays(month, year)
    });
  }
  return yearMonthsDays;
};

// eslint-disable-next-line no-redeclare
export namespace handlerCalendarYearMonthDays {
  export type IReturn = {
    monthNo: number;
    monthName: string;
    month: handlerCalendarMonthDays.IReturn;
  }[];
}

export const GetOneWeekDatesHeader = () => {
  const justStartOfWeek = dayjs().utc().startOf('week');

  const weekDays = Array.from({ length: 7 })
    ?.fill(0)
    ?.map((_v, i) => justStartOfWeek?.add(i, 'd'));

  return { weekDays };
};

/**
 * dateString ex: 201011160300 || 2010-11-1603:00
 */
export const GetDateFromDateString = (dateString: string) => {
  const dateStr = dateString?.replace(/-|:/g, '');
  const date = dayjs(dateStr);

  const year = date.get('year');
  const month = date.get('month');
  const day = date.get('date');
  const hour = date.get('hour');
  const minute = date.get('minutes');

  const newDate = dayjs()
    .set('year', year)
    .set('month', month)
    .set('date', day)
    .set('hour', hour)
    .set('minutes', minute)
    .set('seconds', 0)
    .set('ms', 0);

  return { dateDayjs: newDate, year, month, day, hour, minute };
};

export const SetTimeToDate = (
  hour: number,
  minute: number,
  date?: DayJS.ConfigType
) => {
  const newDate = date ? dayjs(date) : dayjs();

  return dayjs()
    .set('year', newDate?.get?.('year'))
    .set('month', newDate?.get?.('month'))
    .set('date', newDate?.get?.('date'))
    .set('hour', hour || 0)
    .set('minutes', minute || 0)
    .set('seconds', 0)
    .set('ms', 0);
};

export const GetDateFieldsForDb = (props: { date: DayJS.ConfigType }) => {
  const date = dayjs(props?.date);

  const dayTime = date.format('HH:mm');
  const dayTimeNumber = IsNumber(date.format('HHmm')).numberValue;
  const dateString = date.format('YYYY-MM-DD');
  const dateNumber = IsNumber(date.format('YYYYMMDD')).numberValue;

  return { date, dayTime, dayTimeNumber, dateString, dateNumber };
};

export const HandlerIsOverlapping = (props: HandlerIsOverlapping.IProps) => {
  const overlapFrom = props?.dateFrom2?.isBetween(
    props?.dateFrom,
    props?.dateTo,
    null,
    '[)'
  );

  const overlapTo = props?.dateTo2?.isBetween(
    props?.dateFrom,
    props?.dateTo,
    null,
    '(]'
  );

  const overlapFrom2 = props?.dateFrom?.isBetween(
    props?.dateFrom2,
    props?.dateTo2,
    null,
    '[)'
  );

  const overlapTo2 = props?.dateTo?.isBetween(
    props?.dateFrom2,
    props?.dateTo2,
    null,
    '(]'
  );

  return overlapFrom || overlapTo || overlapFrom2 || overlapTo2;
};

// eslint-disable-next-line no-redeclare
export namespace HandlerIsOverlapping {
  export interface IProps {
    dateFrom: Dayjs;
    dateTo: Dayjs;
    dateFrom2: Dayjs;
    dateTo2: Dayjs;
  }
}

export const GetTimeStrFromNr = (time: number) => {
  return dayjs(`${time}`.padStart(4, '0'), 'HHmm').format('HH:mm');
};

export type { ConfigType } from 'dayjs';
export { Dayjs } from 'dayjs';
