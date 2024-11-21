import { CustomModal } from '@components/utils/pixinn/custom-modal';
import { ErrorInput } from '@components/utils/shared/error-input';
import { SVGIconArrowLeft1 } from '@styles/global-icons/icons/svg-icon-arrow-left-1';
import { SVGIconCalendar } from '@styles/global-icons/icons/svg-icon-calendar';
import { dayjs, nearestFutureMinutes, SetTimeToDate } from '@utilsFn/dayjs-fn';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import { Dayjs } from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import { FormDateSelect } from './components/form-date-select';

const ModalHeader = (props: { onClickBack: () => void }) => {
  return (
    <ContainerModalHeader>
      <div className="ModalHeader_r1" onClick={() => props?.onClickBack?.()}>
        <SVGIconArrowLeft1 />
      </div>
    </ContainerModalHeader>
  );
};

const ContainerModalHeader = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  background-color: #000000;
  box-shadow: inset 0 -1px 0 0 #383838;

  .ModalHeader_r1 {
    cursor: pointer;
    display: flex;
    padding: 18px;
  }
`;

const defaultState: NInputDate.IState = {
  showCalendar: false
};

const HandlerGetCorrectInitialDate = (date?: Dayjs) => {
  const contacts = GetCompanyContacts();

  const { workingHours } = contacts.contacts;
  const currentDate = dayjs().format('YYYYMMDD');
  let currDate = date || dayjs();
  let currDay = currDate?.day();
  let currHour = currDate.get('hours');
  let currMinute = currDate.get('minutes');
  let currWorkingHours: typeof workingHours[0] = (workingHours as any)[currDay];

  let [workingHourFrom] = currWorkingHours.from.split(':');
  if (currHour >= 22) {
    currDate = currDate.add(1, 'day').startOf('day');
    currDay = currDate?.day();
    currHour = currDate.get('hours');
    currMinute = currDate.get('minutes');
    currWorkingHours = (workingHours as any)[currDay];
    workingHourFrom = currWorkingHours.from.split(':')?.[0];
  }
  let correctHourFrom =
    currHour >= +workingHourFrom ? currHour : +workingHourFrom;
  let correctMinuteFrom = currHour < correctHourFrom ? 0 : currMinute;

  if (currentDate === currDate.format('YYYYMMDD') && !date) {
    correctHourFrom = currHour + 1;

    if (correctMinuteFrom > 0) correctMinuteFrom = currMinute;
  }

  return SetTimeToDate(correctHourFrom, correctMinuteFrom, currDate);
};

export const InputDate = (props: NInputDate.IProps) => {
  const isMobile = useSelector((s) => s.device.isMobile);

  const [state, setState] = React.useState(defaultState);

  const msgError = props?.msgError || '';

  const classNames = [msgError ? 'isError' : '']?.filter?.((v) => v);

  const value = props?.value
    ? props?.value?.format?.('YYYY-MM-DD HH:mm')
    : null;

  const handlerCloseCalendar = () => {
    setState((previous) => ({ ...previous, showCalendar: false }));
  };

  return (
    <>
      <ContainerInputDate>
        <div
          className={joinClasses('InputDate_r1', ...classNames)}
          onClick={() => {
            setState((previous) => ({ ...previous, showCalendar: true }));
          }}
        >
          <SVGIconCalendar />

          {props?.placeholder || props?.value ? (
            <p>{value || props?.placeholder}</p>
          ) : null}

          {msgError ? <div className="Input_iconError" /> : null}
        </div>

        {msgError ? <ErrorInput msgError={msgError || ''} /> : null}
      </ContainerInputDate>

      {state?.showCalendar ? (
        <CustomModal
          isOpen
          onReqClose={() => {
            handlerCloseCalendar();
          }}
          requiredIdOne="FormDateSelect"
          style={{
            content: { backgroundColor: '#000000', borderRadius: '0' },
            overlay: { backgroundColor: 'rgb(104 104 104 / 25%)' }
          }}
          isModalFullscreen={isMobile}
          modalType="stickyHeader"
          customHeader={
            isMobile ? (
              <ModalHeader onClickBack={handlerCloseCalendar} />
            ) : (
              <></>
            )
          }
        >
          <FormDateSelect
            onClickBack={() => {
              handlerCloseCalendar();
            }}
            date={
              props?.value ||
              nearestFutureMinutes(30, HandlerGetCorrectInitialDate())
            }
            handlerOnSave={props?.onChange}
            gapMin={props?.gapMin}
            isDart={props?.isDart}
            isPool={props?.isPool}
            hasInitialDate={!!props?.value}
          />
        </CustomModal>
      ) : null}
    </>
  );
};

export namespace NInputDate {
  export interface IProps {
    placeholder?: React.ReactNode;
    value: Dayjs | null;
    onChange: (val: Dayjs) => void;
    msgError?: React.ReactNode;
    gapMin: number;
    isDart: boolean;
    isPool: boolean;
  }

  export interface IState {
    showCalendar: boolean;
  }
}

const ContainerInputDate = styled.div`
  --height: 56px;
  --colorError: #df0303;
  --borderHover: inset 0 0 0 1px #ff0055;
  --transition: 0.4s ease all;

  .InputDate_r1 {
    position: relative;
    cursor: pointer;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    padding-right: 15px;
    border-radius: 4px;
    background-color: #292929;
    transition: var(--transition);

    svg {
      margin-right: 10px;
    }

    p {
      margin: 0;
      font: normal normal normal 16px/24px Roboto;
      letter-spacing: 0.13px;
      color: #a9a9a9;
    }

    :hover {
      box-shadow: var(--borderHover);
      background-color: #383838;

      p {
        color: #ffffff;
      }
    }
  }

  .Input_iconError {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 6px;
    height: var(--height);
    border-radius: 2px;
    background-color: var(--colorError);
  }
`;
