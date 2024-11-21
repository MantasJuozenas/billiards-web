import { Button } from '@components/utils/buttons/button';
import { MonthDateSelect } from '@components/utils/shared/month-date-select';
import { TimeDateSelect } from '@components/utils/shared/time-date-select';
import { _, media } from '@utilsFn/breakpoint';
import { Dayjs } from 'dayjs';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const FormDateSelect = (props: NFormDateSelect.IProps) => {
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    date: props?.date,
    hourFromErr: false,
    minuteFromErr: false,
    hasInitialHours: props?.hasInitialDate,
    hasInitialMinutes: props?.hasInitialDate
  });

  return (
    <ContainerFormDateSelect id="FormDateSelect">
      <div className="FormDateSelect_inner">
        <div className="FormDateSelect_inner_inner">
          <div className="FormDateSelect_r2">
            <MonthDateSelect
              date={state?.date}
              handlerOnDayClick={(val) => {
                const newDate = state?.date
                  ?.set?.('year', val?.get?.('year'))
                  ?.set?.('month', val?.get?.('month'))
                  ?.set?.('date', val?.get?.('date'));

                setState((previous) => ({ ...previous, date: newDate }));
              }}
              isDart={props?.isDart}
              isPool={props?.isPool}
            />
          </div>

          <div className="FormDateSelect_r3">
            <TimeDateSelect
              date={state?.date}
              handlerOnTimeClick={(val, timeType) => {
                const [hour, minutes] = (val || '').split(':');
                const newDate = state?.date
                  ?.set?.('hour', +hour)
                  ?.set?.('minute', +minutes);

                setState((previous) => ({
                  ...previous,
                  date: newDate,
                  hasInitialHours:
                    timeType === 'h' && !previous?.hasInitialHours
                      ? true
                      : previous?.hasInitialHours,
                  hasInitialMinutes:
                    timeType === 'm' && !previous?.hasInitialMinutes
                      ? true
                      : previous?.hasInitialMinutes
                }));
              }}
              gapMin={props?.gapMin}
              isDart={props?.isDart}
              isPool={props?.isPool}
              hourFromErr={state?.hourFromErr}
              minuteFromErr={state?.minuteFromErr}
              setHourFromErr={(val) => {
                setState((previous) => ({ ...previous, hourFromErr: val }));
              }}
              setMinuteFromErr={(val) => {
                setState((previous) => ({ ...previous, minuteFromErr: val }));
              }}
              hasInitialHours={state?.hasInitialHours}
              hasInitialMinutes={state?.hasInitialMinutes}
            />
          </div>
        </div>
      </div>

      <div className="__Modal_Buttons_Div__">
        <Button
          button={{
            onClick: () => {
              props?.onClickBack?.();
            }
          }}
        >
          {t('shared:::FormDateSelect::text1')}
        </Button>

        <Button
          button={{
            disabled: state?.hourFromErr || state?.minuteFromErr,
            onClick: () => {
              if (!state?.hasInitialHours || !state?.hasInitialMinutes) {
                setState((previous) => ({
                  ...previous,
                  hourFromErr: !state?.hasInitialHours,
                  minuteFromErr: !state?.hasInitialMinutes
                }));

                return;
              }

              props?.handlerOnSave?.(state?.date);
              props?.onClickBack?.();
            }
          }}
        >
          {t('shared:::FormDateSelect::text2')}
        </Button>
      </div>
    </ContainerFormDateSelect>
  );
};

export namespace NFormDateSelect {
  export interface IProps {
    date: Dayjs;
    onClickBack: () => void;
    handlerOnSave: (date: Dayjs) => void;
    gapMin: number;
    isDart: boolean;
    isPool: boolean;
    hasInitialDate: boolean;
  }
}

const ContainerFormDateSelect = styled.div`
  .FormDateSelect_inner {
    //
  }

  .FormDateSelect_inner_inner {
    width: 375px;
    max-width: 100%;
  }

  .FormDateSelect_r2 {
    position: relative;
    width: 100%;
    margin-bottom: 25px;
    padding-top: 27px;
    padding-bottom: 8px;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 15px;
      height: 1px;
      width: calc(100% - 2 * 15px);
      background-color: #383838;
    }
  }

  .FormDateSelect_r3 {
    padding-bottom: 20px;
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
    background-color: #000000;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 15px;
      height: 1px;
      width: calc(100% - 2 * 15px);
      background-color: #383838;
    }

    button {
      :first-child {
        margin-right: 15px;
        background-color: #383838;
        box-shadow: none;

        :hover {
          background-color: #000000;
        }
      }
    }
  }

  // mobile
  ${_(media.max.sm)} {
    .FormDateSelect_inner_inner {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .__Modal_Buttons_Div__ {
      button {
        :last-child {
          width: 100%;
        }
      }
    }
  }
`;
