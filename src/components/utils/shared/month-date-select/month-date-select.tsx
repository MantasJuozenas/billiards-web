import { NHandlerReservationBlockedDays } from '@pages/api/reservation/reservation-blocked-days';
import { ReservationBlockedDaysApiQuery } from '@store/modules/reservation/query';
import { SVGIconArrowLeft2 } from '@styles/global-icons/icons/svg-icon-arrow-left-2';
import { handlerCalendarMonthDays } from '@utilsFn/dayjs-fn';
import { joinClasses } from '@utilsFn/join-classes';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

const defaultState: NMonthDateSelect.IState = {
  date: null,
  month: [],
  blockedDays: [],
  loadingBlockedDays: false
};

export const MonthDateSelect = (props: NMonthDateSelect.IProps) => {
  const [state, setState] =
    React.useState<NMonthDateSelect.IState>(defaultState);

  const currDateString = dayjs().format('YYYYMMDD');

  const handlerGetMonth = async () => {
    if (state?.date) {
      setState((previous) => ({
        ...previous,
        month: handlerCalendarMonthDays(
          state?.date?.get('month') || 0,
          state?.date?.get('year') || 0
        ),
        loadingBlockedDays: true
      }));

      const dateFromNumber = +state.date.startOf('month').format('YYYYMMDD');
      const dateToNumber = +state.date.endOf('month').format('YYYYMMDD');

      let whereBlockedTime: NHandlerReservationBlockedDays.IBody['variablesBlockedTime']['whereBlockedTime'] =
        { id: { _eq: 0 } };

      if (props?.isDart && props?.isPool) {
        whereBlockedTime = {
          deleted_at: { _is_null: true },
          date_number: { _gte: dateFromNumber, _lte: dateToNumber },
          _or: [{ dart: { _eq: true } }, { pool: { _eq: true } }],
          all_day: { _eq: true }
        };
      } else if (props?.isDart) {
        whereBlockedTime = {
          deleted_at: { _is_null: true },
          date_number: { _gte: dateFromNumber, _lte: dateToNumber },
          dart: { _eq: true },
          all_day: { _eq: true }
        };
      } else if (props?.isPool) {
        whereBlockedTime = {
          deleted_at: { _is_null: true },
          date_number: { _gte: dateFromNumber, _lte: dateToNumber },
          pool: { _eq: true },
          all_day: { _eq: true }
        };
      }

      const resBlockedDays = await ReservationBlockedDaysApiQuery({
        variablesBlockedTime: { whereBlockedTime }
      });

      const blockedDays = (
        resBlockedDays?.status === 'ok'
          ? resBlockedDays?.payload?.blockedDays
          : []
      ) as number[];

      setState((previous) => ({
        ...previous,
        blockedDays,
        loadingBlockedDays: false
      }));
    }
  };

  const handlerChangeMonth = (dir: '-' | '+') => {
    if (state?.date) {
      const newDate = state?.date.add(dir === '-' ? -1 : 1, 'month');

      setState((previous) => ({ ...previous, date: newDate }));
    }
  };

  React.useEffect(() => {
    if (state?.date) handlerGetMonth();
  }, [state?.date]);

  React.useEffect(() => {
    if (props?.date) {
      setState((previous) => ({ ...previous, date: props?.date }));
    }
  }, [props?.date]);

  if (!state?.date) return <></>;

  return (
    <ContainerMonthDateSelect>
      <div className="MonthDateSelect_r1">
        <div
          className="MonthDateSelect_r1_c1"
          onClick={() => handlerChangeMonth('-')}
        >
          <SVGIconArrowLeft2 />
        </div>

        <p className="MonthDateSelect_r1_c2">
          {`${state?.date?.format('MMMM')?.[0]?.toUpperCase()}${state?.date
            ?.format('MMMM')
            ?.slice(1)}`}
        </p>

        <div
          className="MonthDateSelect_r1_c3"
          onClick={() => handlerChangeMonth('+')}
        >
          <SVGIconArrowLeft2 />
        </div>
      </div>

      <div className="MonthDateSelect_r2">
        <table>
          <thead>
            <tr>
              {state?.month?.[0]?.days?.map((day) => {
                return (
                  <th key={day?.date()}>
                    <div>{day.format('dd')?.slice(0, 1)}</div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {state?.month?.map?.((week) => {
              return (
                <tr key={week?.week}>
                  {week?.days?.map((day) => {
                    const dayDateString = day?.format?.('YYYYMMDD');
                    const isAllDayBlocked = state?.blockedDays?.includes?.(
                      +dayDateString
                    );
                    const isPastDay =
                      dayDateString < currDateString ||
                      (dayDateString === currDateString &&
                        dayjs().get('hours') >= 22);
                    const thisMonthDay =
                      day.format('MM') === state?.date?.format('MM');
                    const selectedDay =
                      day.format('MMDD') === props?.date?.format('MMDD');

                    const classNames = [
                      thisMonthDay ? 'thisMonthDay' : '',
                      selectedDay ? 'selectedDay' : '',
                      isPastDay ? 'isPastDay' : '',
                      isAllDayBlocked ? 'isAllDayBlocked' : ''
                    ];

                    return (
                      <td
                        key={day?.date()}
                        className={joinClasses(``, ...classNames)}
                      >
                        <div
                          onClick={() => {
                            if (
                              thisMonthDay &&
                              !isPastDay &&
                              !isAllDayBlocked
                            ) {
                              props?.handlerOnDayClick?.(day);
                            }
                          }}
                        >
                          <div className="dayNumber">{day?.date()}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ContainerMonthDateSelect>
  );
};

export namespace NMonthDateSelect {
  export interface IProps {
    date: Dayjs | null;
    handlerOnDayClick: (date: Dayjs) => void;
    isDart: boolean;
    isPool: boolean;
  }

  export interface IState {
    date: Dayjs | null;
    month: handlerCalendarMonthDays.IReturn;
    blockedDays: number[];
    loadingBlockedDays: boolean;
  }
}

const ContainerMonthDateSelect = styled.div`
  .MonthDateSelect_r1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    padding: 0 20px;
  }

  .MonthDateSelect_r1_c1,
  .MonthDateSelect_r1_c3 {
    cursor: pointer;
    width: 37px;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .MonthDateSelect_r1_c2 {
    margin: 0;
    font: normal normal normal 26px/38px Roboto;
    letter-spacing: -0.33px;
    color: #ffffff;
  }

  .MonthDateSelect_r1_c3 {
    transform: rotate(180deg);
  }

  .MonthDateSelect_r2 {
    padding: 0 15px;

    table {
      height: 1px;
      width: 100%;
      overflow: auto;
      border-collapse: separate; /* Don't collapse */
      border-spacing: 0;
    }

    thead {
      th {
        padding: 0;

        > div {
          width: 40px;
          min-width: 40px;
          max-width: 40px;
          height: 13px;
          min-height: 13px;
          max-height: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-bottom: 23px;

          font: normal normal normal 11px/20px Roboto;
          letter-spacing: 1px;
          color: #ffffff;
          text-transform: uppercase;
        }
      }
    }

    tbody {
      td {
        padding: 0;

        > div {
          width: 40px;
          min-width: 40px;
          max-width: 40px;
          height: 40px;
          min-height: 40px;
          max-height: 40px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-bottom: 10px;
        }

        .dayNumber {
          display: none;
          font: normal normal 500 13px/16px Roboto;
          letter-spacing: 0px;
          color: #ffffff;
        }

        &.thisMonthDay {
          > div {
            :hover {
              cursor: pointer;
              background-color: #383838;
            }
          }

          .dayNumber {
            display: block;
          }
        }

        &.selectedDay.thisMonthDay {
          > div {
            background-color: #ff0055;
          }
        }

        &.isPastDay {
          > div {
            :hover {
              cursor: not-allowed;
              background-color: transparent;
            }
          }

          .dayNumber {
            color: #383838;
          }
        }

        &.isAllDayBlocked {
          > div {
            :hover {
              cursor: not-allowed;
              background-color: transparent;
            }
          }

          .dayNumber {
            color: #383838;
          }
        }
      }
    }
  }
`;
