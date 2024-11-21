import { useAxiosApolloQuery } from '@clients/axios/client-axios-apollo';
import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { _, media } from '@utilsFn/breakpoint';
import { dayjs } from '@utilsFn/dayjs-fn';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { Event as _RBCEvent } from 'react-big-calendar';
import styled from 'styled-components';

import { Calendar } from './components';
import { GetBlockedTimeGqlQuery } from './gql-documents';

export const DateNumberToDate = (date: number, time: string | null = '') => {
  return dayjs(`${date} ${time}`).toDate();
};

export const DateToDateNumber = (date?: Date) => {
  if (!date) return 0;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return Number(
    `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`
  );
};

export const AreDaysSame = (...dates: Date[]) => {
  return !!dates?.every(
    (e) =>
      dates[0]?.getFullYear() === e?.getFullYear() &&
      dates[0]?.getMonth() === e?.getMonth() &&
      dates[0]?.getDate() === e?.getDate()
  );
};

export const IsTimeSame = (...dates: Date[]) => {
  return !!dates?.every(
    (e) =>
      dates[0]?.getHours() === e?.getHours() &&
      dates[0]?.getMinutes() === e?.getMinutes()
  );
};

export const IsValidDate = (date?: Date) => {
  return !Number.isNaN(date?.getTime());
};

export const PageTimeBlocking = () => {
  const { t } = useTranslation();

  const client = useAxiosApolloQuery;

  const [getBlockedTime, { data: blockedTime }] = client<
    GQL_gen.Queries.GetBlockedTimeGqlQuery,
    GQL_gen.Queries.GetBlockedTimeGqlQueryVariables
  >({
    query: GetBlockedTimeGqlQuery
  });

  const blockedTimeData =
    blockedTime?.blocked_time?.filter((item) => {
      const isKaunas = item?.location === 'Kaunas';

      return isKaunas
        ? GetRestaurantLocation().isKaunas
        : GetRestaurantLocation().isVilnius;
    }) || [];

  useEffect(() => {
    getBlockedTime({
      variables: {
        whereBlockedTime: {
          deleted_at: { _is_null: true }
        }
      }
    });
  }, []);

  return (
    <ContainerPageTimeBlocking>
      <StylePageDivCenter className="PageTimeBlocking_inner">
        <div className="PageTimeBlocking_r1">
          <Calendar
            events={
              blockedTimeData
                ?.map((item) => {
                  if (item?.date_number) {
                    const date = dayjs(
                      item?.date_number?.toString?.()
                    ).toDate();
                    const start = DateNumberToDate(
                      item?.date_number,
                      item?.time_from
                    );
                    const end = DateNumberToDate(
                      item?.date_number,
                      item?.time_to
                    );
                    return {
                      title: t(`page-time-blocking:::eventName`),
                      date,
                      start: IsValidDate(start) ? start : date,
                      end: IsValidDate(end) ? end : date,
                      allDay: item?.all_day,
                      resource: item
                    };
                  }
                  return null;
                })
                .filter((f) => !!f) as NPageTimeBlocking.RBCEvent[]
            }
            refetchQueries={['GetBlockedTimeGqlQuery']}
          />
        </div>
      </StylePageDivCenter>
    </ContainerPageTimeBlocking>
  );
};

export namespace NPageTimeBlocking {
  interface RBCEventPre {
    resource?: GQL_gen.Queries.GetBlockedTimeGqlQuery['blocked_time'][0];
  }
  export type RBCEvent = RBCEventPre &
    Omit<_RBCEvent, keyof RBCEventPre> & { date: Date };
}

const ContainerPageTimeBlocking = styled.div`
  display: flex;

  .PageTimeBlocking_inner {
    flex-grow: 1;
  }

  .PageTimeBlocking_r1 {
    color: white;
    height: 100%;
    padding-bottom: 24px;
    .calendar {
      .rbc-toolbar {
        position: relative;
        display: flex;
        justify-content: space-between;
        .rbc-main-header {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 0;
        }
        .rbc-views,
        .rbc-navbar {
          z-index: 1;
          display: flex;
        }
        .rbc-views {
          user-select: none;
          border-radius: 5px;
          overflow: hidden;
          [class^='rbc-view-'] {
            cursor: pointer;
            padding: 5px 10px;
            :not(:last-child) {
              padding-right: 10px;
            }
            &.selected {
              background-color: #383838;
            }
            p {
              margin: 0;
            }
          }
        }
        .rbc-navbar {
          border-radius: 5px;
          overflow: hidden;
          [class^='rbc-nav-control-'] {
            cursor: pointer;
            display: flex;
            height: 34px;
            width: 34px;
            align-items: center;
            justify-content: center;
            padding: 5px;
            svg {
              fill: #fff;
            }
            :active {
              background-color: #383838;
            }
          }
        }
      }
      .rbc-time-view,
      .rbc-month-view,
      .rbc-header,
      .rbc-day-bg,
      .rbc-month-row,
      .rbc-time-header-content,
      .rbc-time-content,
      .rbc-timeslot-group,
      .rbc-time-slot {
        border-color: #a9a9a9;
      }
      .rbc-off-range-bg {
        background-color: #3838388d;
      }
      .rbc-today {
        background-color: #ff005550;
      }
      .rbc-addons-dnd-resize-ew-anchor {
        display: flex;
        align-items: center;
        height: 100%;
        top: 0;
        .rbc-addons-dnd-resize-ew-icon {
          margin: 0;
        }
      }
      .rbc-event {
        border: none;
        outline: none;
        border-radius: 0;
        background-color: #383838bf;
      }
      .rbc-event-content {
        padding: 0 5px;
      }
      .rbc-day-bg {
        cursor: pointer;
      }
      .rbc-row-content {
        pointer-events: none;
        & > .rbc-row:first-child {
          pointer-events: auto;
        }
      }
      .rbc-events-container {
        margin-right: 0;
      }
      .rbc-show-more {
        background-color: transparent;
        color: #ffffff;
        font-weight: 400;
        pointer-events: auto;
        padding-left: 5px;
        :hover {
          color: #e0e0e0;
        }
      }
    }
  }

  ${_(media.max.sm)} {
    .rbc-main-header {
      position: relative !important;
    }
    .rbc-toolbar {
      flex-direction: column;
    }
  }
`;
