import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { med } from '@utilsFn/breakpoint';
import { isBrowser } from '@utilsFn/check-browser';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import { OrderDetails } from './components/order-details';
import { OrderList } from './components/order-list';
import { OrderListTable } from './components/order-list-table';

export const PageCart = () => {
  const { cssVars } = useTheme();
  const { t } = useTranslation('page-cart');

  const totalCount = useSelector((s) => s.cart.totalCount);
  const isMobile = useSelector((s) => s.device.isMobile);
  const pageYOffset = useSelector((s) => s.device.pageYOffset);
  const screenWidth = useSelector((s) => s.device.screenWidth);
  const screenHeight = useSelector((s) => s.device.screenHeight);

  const handlerOrderDetailsHeight = () => {
    const docSidePanel = document.getElementById('PageCart_c2_OrderDetails');
    const docFooter = document?.getElementById?.('__Footer');

    if (!docFooter || !docSidePanel) return;

    const docFooterRect = (
      docFooter ? docFooter?.getBoundingClientRect?.() : {}
    ) as DOMRect;

    const footerInTheView = (docFooterRect?.top || 0) <= screenHeight;

    if (isMobile) {
      docSidePanel.style.height = `auto`;
    } else {
      docSidePanel.style.height = footerInTheView
        ? `${docFooterRect.top - cssVars.navbarHeight}px`
        : `${screenHeight - cssVars.navbarHeight}px`;
    }
  };

  React.useEffect(() => {
    if (isBrowser()) handlerOrderDetailsHeight();
  }, [pageYOffset, screenHeight, screenWidth]);

  return (
    <ContainerPageCart>
      <div className="PageCart_inner">
        <StylePageDivCenter className="PageCart_StylePageDivCenter">
          {totalCount ? (
            <>
              <div className="PageCart_c1">
                <div className="PageCart_c1_r1_OrderListTable">
                  <OrderListTable />
                </div>

                <div className="PageCart_c1_r1_OrderList">
                  <OrderList />
                </div>
              </div>

              <div id="PageCart_c2_OrderDetails" className="PageCart_c2">
                <div className="PageCart_c2_inner">
                  <OrderDetails />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="PageCart_c1_empty">{t('Main::text1')}</div>
            </>
          )}
        </StylePageDivCenter>
      </div>
    </ContainerPageCart>
  );
};

const ContainerPageCart = styled.div`
  --orderDetailsWidth: 360px;

  display: flex;
  flex: 1;

  .PageCart_inner {
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 500px;
    max-width: 100%;
  }

  .PageCart_StylePageDivCenter {
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
  }

  .PageCart_c1_empty {
    margin: auto;

    font: normal normal 500 16px/19px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .PageCart_c1 {
    /* background-color: green; */

    width: 100%;

    display: flex;
    flex-direction: column;

    padding-right: var(--orderDetailsWidth);
  }

  .PageCart_c1_r1_OrderListTable {
    overflow: auto;

    margin-top: 50px;
    margin-right: 50px;
  }

  .PageCart_c1_r1_OrderList {
    display: none;

    margin-top: 40px;
    margin-bottom: 65px;
  }

  .PageCart_c2 {
    position: fixed;
    top: calc(var(--navbarHeight));

    min-width: var(--orderDetailsWidth);
    width: var(--orderDetailsWidth);
    max-width: var(--orderDetailsWidth);

    .PageCart_c2_inner {
      height: 100%;

      > div {
        height: 100%;

        padding: 49px 0 46px 23px;

        :after {
          position: absolute;
          top: 0;
          left: 100%;
          content: '';
          width: 50vw;
          height: 100%;
          background-color: #181818;
        }
      }
    }
  }

  /** tablet */
  ${med.max.tablet} {
    .PageCart_StylePageDivCenter {
      padding: 0 var(--pagePaddingSide);
    }
  }

  /** mobile */
  ${med.max.sm} {
    .PageCart_StylePageDivCenter {
      padding: 0;
      flex-direction: column;
    }

    .PageCart_c1 {
      padding-right: 0;
    }

    .PageCart_c1_r1_OrderListTable {
      display: none;
    }

    .PageCart_c1_r1_OrderList {
      display: block;

      padding: 0 var(--pagePaddingSide);
    }

    .PageCart_c2 {
      position: static;

      min-width: 100%;
      width: 100%;
      max-width: 100%;

      margin-top: auto;

      .PageCart_c2_inner {
        > div {
          padding: 40px var(--pagePaddingSide);

          border-radius: 20px 20px 0px 0px;

          :after {
            display: none;
          }
        }
      }
    }
  }
`;
