import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { Button } from '@components/utils/buttons/button';
import { NHandlerGetCardData } from '@pages/api/customer/get-card-data';
import { logout } from '@store/modules/auth/actions';
import { GetCustomerCardDataApiQuery } from '@store/modules/customer/query';
import { med } from '@utilsFn/breakpoint';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useTranslation } from 'next-i18next';
import React from 'react';
// @ts-ignore
import Barcode from 'react-barcode';
import styled from 'styled-components';

const defaultState: NPageMyPoints.IState = {
  isLoadingCardData: true,
  cardData: null
};

export const PageMyPoints = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const loggedInUser = useSelector((s) => s.auth.loggedInUser);

  const [state, setState] = React.useState(defaultState);

  const handlerGetCardData = async () => {
    setState((previous) => ({ ...previous, isLoadingCardData: true }));

    const resCardData = await GetCustomerCardDataApiQuery({
      username: loggedInUser?.username || ''
    });

    if (resCardData?.status === 'error') {
      setState((previous) => ({
        ...previous,
        cardData: null,
        isLoadingCardData: false
      }));
    } else if (resCardData?.status === 'ok') {
      setState((previous) => ({
        ...previous,
        cardData: resCardData?.payload || null,
        isLoadingCardData: false
      }));
    }

    setState((previous) => ({ ...previous, isLoadingCardData: false }));
  };

  React.useEffect(() => {
    if (isLoggedIn) handlerGetCardData();
  }, [isLoggedIn]);

  return (
    <ContainerPageMyPoints>
      <StylePageDivCenter className="PageMyPoints_inner">
        <div className="PageMyPoints_r1">
          <Button
            button={{
              onClick: () => dispatch(logout({}))
            }}
          >
            {t('page-my-points:::main::text1')}
          </Button>
        </div>

        <div className="PageMyPoints_r2">
          <div className="PageMyPoints_r2_r1">
            <p className="label">{t('page-my-points:::main::text2')}</p>

            <p className="text">
              {state?.cardData?.walletBalance?.balance || 0} €
            </p>
          </div>

          <div className="PageMyPoints_r2_r2">
            <p className="label">{t('page-my-points:::main::text3')}</p>

            {state?.cardData?.card?.number ? (
              <div className="PageMyPoints_r2_r2_barcode">
                <Barcode value={state?.cardData?.card?.number || ''} />
              </div>
            ) : null}
          </div>
        </div>
      </StylePageDivCenter>
    </ContainerPageMyPoints>
  );
};

export namespace NPageMyPoints {
  export interface IState {
    isLoadingCardData: boolean;
    cardData: NHandlerGetCardData.IPayload | null;
  }
}

const ContainerPageMyPoints = styled.div`
  display: flex;
  justify-content: center;

  .PageMyPoints_inner {
    padding-top: 45px;
  }

  .PageMyPoints_r1 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 50px;
  }

  .PageMyPoints_r2 {
    width: 434px;
    max-width: 100%;
    margin: 0 auto;
    padding: 30px 40px;
    padding-bottom: 45px;
    border-radius: 10px;
    background-color: #181818;
  }

  .PageMyPoints_r2_r1 {
    margin-bottom: 30px;
  }

  .label {
    margin: 0;
    margin-bottom: 10px;

    font: normal normal normal 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #a9a9a9;
  }

  .text {
    margin: 0;

    font: normal normal medium 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #ffffff;
  }

  .PageMyPoints_r2_r2_barcode {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 5px 0;
    border-radius: 15px;
    background-color: #ffffff;
  }
  // mobile
  ${med.max.sm} {
    .PageMyPoints_inner {
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;

      padding-top: 35px;
    }

    .PageMyPoints_r2 {
      width: 100%;
      margin-bottom: 30px;
      padding: 0 var(--pagePaddingSide);
      background-color: transparent;
    }

    .PageMyPoints_r1 {
      margin-bottom: 25px;
      padding: 0 var(--pagePaddingSide);

      button {
        width: 100%;
        height: 50px;
      }
    }
  }
`;
