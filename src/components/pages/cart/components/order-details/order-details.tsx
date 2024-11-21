/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button } from '@components/utils/buttons/button';
// import { Input } from '@components/utils/inputs/input';
// import { InputSelect } from '@components/utils/inputs/input-select';
import { buildPath, routes } from '@constants/routes';
import {
  CreateAnOrder,
  SetCartItems,
  SetOrderIsLoading,
  SetTotalAmount,
  SetTotalCount
} from '@store/modules/cart/actions';
import { SVGIconEuro } from '@styles/global-icons/icons/svg-icon-euro';
import { med } from '@utilsFn/breakpoint';
import { HandlerShowToast } from '@utilsFn/handler-show-toast';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

// const tableOptions: G.TSelect<number>[] = [
//   { value: 1, label: '1' },
//   { value: 2, label: '2' },
//   { value: 3, label: '3' },
//   { value: 4, label: '4' },
//   { value: 5, label: '5' }
// ];

export const OrderDetails = () => {
  const { t } = useTranslation('page-cart');
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const table = useSelector((s) => s.menu.table);
  const totalCount = useSelector((s) => s.cart.totalCount);
  const totalAmount = useSelector((s) => s.cart.totalAmount);
  const orderIsLoading = useSelector((s) => s.cart.orderIsLoading);

  // const [showError, setShowError] = React.useState(false);
  // const [fullName, setFullName] = React.useState('');
  const [, setShowError] = React.useState(false);
  const [fullName] = React.useState(' ');
  // const [tableSelect, setTableSelect] =
  //   React.useState<G.TSelect<number> | null>(null);

  const toastStrings: G.IToastStrings = {
    ok: {
      create: {
        title: t('OrderDetails::text8'),
        msg: t('OrderDetails::text9')
      }
    },
    error: {
      create: {
        title: t('OrderDetails::text8'),
        msg: t('OrderDetails::text10')
      }
    }
  };

  const handlerOnClickOrder = () => {
    let isError = false;

    if (!fullName) isError = true;
    // if (!tableSelect) isError = true;
    if (!table) isError = true;

    if (isError) {
      setShowError(() => true);

      return;
    }

    dispatch(
      CreateAnOrder({
        onPrepare: () => {
          dispatch(SetOrderIsLoading(true));
        },
        fullName,
        table,
        onSuccess: () => {
          dispatch(SetCartItems([]));
          dispatch(SetTotalCount(0));
          dispatch(SetTotalAmount(0));

          // HandlerShowToast({
          //   dispatch,
          //   color: 'blue',
          //   toastType: 'create',
          //   toastCode: 'ok',
          //   toastStrings,
          //   autoCloseAfter: 5000
          // });

          router?.replace?.(buildPath(routes['order-success']));
        },
        onError: () => {
          HandlerShowToast({
            dispatch,
            color: 'blue',
            toastType: 'create',
            toastCode: 'error',
            toastStrings,
            autoCloseAfter: 5000
          });
        },
        onCleanup: () => {
          dispatch(SetOrderIsLoading(false));
        }
      })
    );
  };

  return (
    <ContainerOrderDetails id="__OrderDetails">
      <div className="OrderDetails_inner">
        <div className="OrderDetails_r1">
          <p>{t('OrderDetails::text1')}</p>
        </div>

        <div className="OrderDetails_r2">
          {/* <Input
            input={{
              placeholder: t('OrderDetails::text2'),
              value: fullName,
              onChange: (e) => {
                const val = e?.target?.value || '';
                setFullName(() => val);
              }
            }}
            msgError={showError && !fullName ? t('OrderDetails::text7') : ''}
          /> */}
        </div>

        <div className="OrderDetails_r3">
          {/* <InputSelect
            select={{
              placeholder: t('OrderDetails::text5'),
              options: tableOptions,
              value: tableSelect,
              onChange: (val: any) => {
                setTableSelect(() => val);
              }
            }}
            selectHeight={56}
            floatingLabel
            msgError={showError && !tableSelect ? t('OrderDetails::text7') : ''}
          /> */}
        </div>

        <div className="OrderDetails_r4">
          <p className="OrderDetails_r4_label">{t('OrderDetails::text3')}</p>

          <p className="OrderDetails_r4_totalAmount">
            <SVGIconEuro />
            {totalAmount?.toFixed?.(2)?.replace?.('.', ',')}
          </p>
        </div>

        <div className="OrderDetails_r5">
          <Button
            isLoading={orderIsLoading}
            button={{
              disabled: !totalCount || orderIsLoading,
              onClick: () => {
                handlerOnClickOrder();
              }
            }}
          >
            {t('OrderDetails::text4')}
          </Button>
        </div>

        <div className="OrderDetails_r5_mobile">
          <Button
            btnHeight={50}
            isLoading={orderIsLoading}
            button={{
              disabled: !totalCount || orderIsLoading,
              onClick: () => {
                handlerOnClickOrder();
              }
            }}
          >
            {t('OrderDetails::text4')}
          </Button>

          <Link
            href={buildPath(routes.menu, { ...params })}
            className="OrderDetails_addMore"
          >
            {t('OrderDetails::text6')}
          </Link>
        </div>
      </div>
    </ContainerOrderDetails>
  );
};

const ContainerOrderDetails = styled.div`
  position: relative;

  background-color: #181818;

  .OrderDetails_inner {
    overflow: hidden;

    height: 100%;

    display: flex;
    flex-direction: column;
  }

  .OrderDetails_r1 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 30px;

    p {
      margin: 0;

      font: normal normal 500 20px/24px Roboto;
      letter-spacing: 0.3px;
      color: #ffffff;
    }
  }

  .OrderDetails_r2 {
    margin-bottom: 16px;
  }

  .OrderDetails_r3 {
    padding-bottom: 16px;
    margin-bottom: auto;
  }

  .OrderDetails_r4 {
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 10px;
    margin-bottom: 15px;
    padding: 0 25px;

    border-radius: 6px;
    background-color: #292929;
  }

  p.OrderDetails_r4_label {
    margin: 0;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0px;
    color: #a9a9a9;
  }

  p.OrderDetails_r4_totalAmount {
    display: flex;
    align-items: center;

    margin: 0;

    font: normal normal 500 25px/30px Roboto;
    letter-spacing: 0px;
    color: #ffffff;

    svg {
      width: 19px;
      height: 22px;

      margin-right: 7px;
    }
  }

  .OrderDetails_r5 {
    display: flex;

    button {
      width: 100%;
    }
  }

  .OrderDetails_r5_mobile {
    display: none;
  }

  /** mobile */
  ${med.max.sm} {
    .OrderDetails_r1 {
      p {
        font: normal normal 500 16px/19px Roboto;
        letter-spacing: 0.24px;
      }
    }

    .OrderDetails_r3 {
      padding-bottom: 0;
    }

    .OrderDetails_r4 {
      margin-top: 60px;
      margin-bottom: 16px;
    }

    .OrderDetails_r5 {
      display: none;
    }

    .OrderDetails_r5_mobile {
      display: flex;
      flex-direction: column;

      > button {
        margin-bottom: 15px;
      }
    }

    .OrderDetails_addMore {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 50px;

      font: normal normal 700 15px/16px Roboto;
      letter-spacing: 0px;
      color: #ff0055;
    }
  }
`;
