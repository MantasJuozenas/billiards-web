/* eslint-disable jsx-a11y/anchor-is-valid */
import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import {
  flag_SetCartMenuOpen,
  flag_SetIdScrollTo
} from '@store/modules/flags/actions';
import {
  GetMenuList,
  MergeMenuList,
  SetTable
} from '@store/modules/menu/actions';
import { SVGIconShoppingBasket } from '@styles/global-icons/icons/svg-icon-shopping-basket';
import { med } from '@utilsFn/breakpoint';
import { isBrowser } from '@utilsFn/check-browser';
import { HandlerScrollTo } from '@utilsFn/handler-scroll-to';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import { getUrlFilterValue } from '@utilsFn/url-params-filter';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import { CartMenu } from './components/cart-menu';
import { MenuList } from './components/menu-list';

export const PageMenu = () => {
  const { cssVars } = useTheme();
  const router = useRouter();

  const params = router?.query as NPageMenu.TParams;

  const table = getUrlFilterValue(params, 'table').value;
  const t = getUrlFilterValue(params, 't').value;

  const dispatch = useDispatch();
  const isMobile = useSelector((s) => s.device.isMobile);
  const idScrollTo = useSelector((s) => s.flags.idScrollTo);
  const pageYOffset = useSelector((s) => s.device.pageYOffset);
  const cartMenuOpen = useSelector((s) => s.flags.cartMenuOpen);
  const screenWidth = useSelector((s) => s.device.screenWidth);
  const screenHeight = useSelector((s) => s.device.screenHeight);
  const isLoading = useSelector((s) => s.menu.menuList.isLoading);
  const group = useSelector((s) => s.menu.menuList.group);
  const groupIds = useSelector((s) => s.menu.menuList.groupIds);
  const mainGroups = useSelector((s) => s.menu.menuList.mainGroups);
  const totalCount = useSelector((s) => s.cart.totalCount);
  const navbarMenuOpen = useSelector((s) => s.flags.navbarMenuOpen);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handlerOnScroll = () => {
    const docsIdsNames = groupIds
      ?.map?.((_mgId, i) => {
        return `mainGroupName${i}`;
      })
      ?.map?.((item, i) => (!i ? `#${item}` : item))
      ?.join?.(' ,#');
    const docs = document?.querySelectorAll?.(docsIdsNames);
    // eslint-disable-next-line unicorn/prevent-abbreviations
    const modPageYOffset = pageYOffset + (isMobile ? 175 : 222);
    (docs as any)?.forEach?.((item: HTMLDivElement) => {
      if (
        idScrollTo !== item?.id &&
        modPageYOffset >= item?.offsetTop &&
        (item?.offsetTop || 0) + (item?.clientHeight || 0) >= modPageYOffset
      ) {
        dispatch(flag_SetIdScrollTo(item?.id));
      }
    });
  };

  const handlerOpenCartMenu = () => {
    dispatch(flag_SetCartMenuOpen(!cartMenuOpen));
  };

  const handlerCartMenuHeight = () => {
    const docSidePanel = document.getElementById('PageMenu_c2_CartMenu');
    const docFooter = document?.getElementById?.('__Footer');

    if (!docFooter || !docSidePanel) return;

    const docFooterRect = (
      docFooter ? docFooter?.getBoundingClientRect?.() : {}
    ) as DOMRect;

    const footerInTheView = (docFooterRect?.top || 0) <= screenHeight;

    if (isMobile) {
      docSidePanel.style.height = `${screenHeight - cssVars.navbarHeight}px`;
    } else {
      docSidePanel.style.height = footerInTheView
        ? `${docFooterRect.top - cssVars.navbarHeight - 96}px`
        : `${screenHeight - cssVars.navbarHeight - 96}px`;
    }
  };

  React.useEffect(() => {
    dispatch(
      GetMenuList({
        onPrepare: () => {
          dispatch(MergeMenuList({ whoDidId: 1, isLoading: true }));
        },
        onCleanup: () => {
          dispatch(MergeMenuList({ whoDidId: 2, isLoading: false }));
        }
      })
    );

    return () => {
      dispatch(flag_SetCartMenuOpen(false));
    };
  }, []);

  React.useEffect(() => {
    if (table || t) dispatch(SetTable(table || t));
  }, [table, t]);

  React.useEffect(() => {
    if (!idScrollTo && groupIds?.length) {
      const mainGroupNameId = `mainGroupName0`;

      dispatch(flag_SetIdScrollTo(mainGroupNameId));
    }
  }, [groupIds]);

  React.useEffect(() => {
    let timeout: any = 0;

    if (groupIds?.length) {
      timeout = setTimeout(() => {
        handlerOnScroll();
      }, 10);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [pageYOffset]);

  React.useEffect(() => {
    if (isBrowser()) handlerCartMenuHeight();
  }, [pageYOffset, screenHeight, screenWidth, isLoading]);

  return (
    <ContainerPageMenu>
      <div className="PageMenu_inner">
        <div className="PageMenu_c1_r1">
          <StylePageDivCenter className="PageMenu_c1_r1_inner">
            <div className="PageMenu_c1_r1_inner_inner">
              {groupIds?.map?.((id, i) => {
                const mainGroup = group?.[id];

                if (!mainGroup?.hasProducts) return null;

                const mainGroupData = mainGroups?.[id];
                const mainGroupName =
                  mainGroupData?.ikos_group_json?.group?.name || '';
                const mainGroupNameId = `mainGroupName${i}`;

                const isActive = idScrollTo === mainGroupNameId;
                const classNames = [isActive ? 'isActive' : ''];

                return (
                  <div
                    key={id}
                    className={joinClasses(
                      'PageMenu_c1_r1_item',
                      ...classNames
                    )}
                    onClick={() => {
                      HandlerScrollTo({
                        docIdName: mainGroupNameId,
                        fromTopWeb: 222,
                        fromTopMobile: 175,
                        isMobile
                      });

                      dispatch(flag_SetIdScrollTo(mainGroupNameId));
                    }}
                  >
                    <a
                    // href={`#${mainGroupName}`}
                    >
                      {mainGroupName}
                    </a>
                  </div>
                );
              })}
            </div>
          </StylePageDivCenter>
        </div>

        <StylePageDivCenter className="PageMenu_StylePageDivCenter">
          <div
            className={joinClasses(
              `PageMenu_c1`,
              cartMenuOpen ? 'isOpenCartMenu' : ''
            )}
          >
            <div className="PageMenu_c1_r2">
              <MenuList />
            </div>

            {totalCount && !navbarMenuOpen ? (
              <div className="PageMenu_c1_r3">
                <StylePageDivCenter className="PageMenu_c1_r3_inner">
                  <div
                    className={joinClasses(
                      `PageMenu_c1_r3_inner_inner`,
                      cartMenuOpen ? 'isOpenCartMenu' : ''
                    )}
                    onClick={() => {
                      handlerOpenCartMenu();
                    }}
                  >
                    <SVGIconShoppingBasket />

                    <div className="PageMenu_c1_r3_totalCount">
                      {totalCount}
                    </div>
                  </div>
                </StylePageDivCenter>
              </div>
            ) : null}
          </div>

          <div
            id="PageMenu_c2_CartMenu"
            className={joinClasses(
              `PageMenu_c2`,
              cartMenuOpen ? 'isOpenCartMenu' : ''
            )}
          >
            <div className="PageMenu_c2_inner">
              <CartMenu />
            </div>
          </div>
        </StylePageDivCenter>
      </div>
    </ContainerPageMenu>
  );
};

export namespace NPageMenu {
  export type TParams = {
    table?: string;
    t?: string;
  };
}

const ContainerPageMenu = styled.div`
  --cartMenuWidth: 272px;

  display: flex;
  flex: 1;

  .PageMenu_inner {
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 500px;
    max-width: 100%;
  }

  .PageMenu_StylePageDivCenter {
    display: flex;
    flex-direction: row-reverse;
    flex: 1;
  }

  .PageMenu_c1 {
    /* background-color: green; */

    width: 100%;

    display: flex;
    flex-direction: column;
  }

  .PageMenu_c1.isOpenCartMenu {
    padding-right: var(--cartMenuWidth);
  }

  .PageMenu_c1_r1 {
    position: sticky;
    top: calc(var(--navbarHeight));

    max-width: 100%;

    margin-bottom: 35px;

    background-color: #000000;
    box-shadow: inset 0 -1px 0 0 #383838;
  }

  .PageMenu_c1_r1_inner {
    //
  }

  .PageMenu_c1_r1_inner_inner {
    overflow: auto;
    height: 96px;
    max-width: 100%;

    display: flex;
    align-items: center;
  }

  .PageMenu_c1_r1_item {
    cursor: pointer;
    display: flex;

    a {
      display: flex;

      text-decoration: none;
      font: normal normal 500 15px/18px Roboto;
      letter-spacing: 0px;
      color: #808080;
      white-space: nowrap;
    }

    :not(:last-child) {
      margin-right: 40px;
    }

    &.isActive {
      a {
        color: #ff0055;
      }
    }
  }

  .PageMenu_c1_r2 {
    //
  }

  .PageMenu_c2 {
    position: fixed;
    top: calc(var(--navbarHeight) + 96px);

    min-width: 0;
    width: 0;
  }

  .PageMenu_c2.isOpenCartMenu {
    min-width: var(--cartMenuWidth);
    width: var(--cartMenuWidth);
    max-width: var(--cartMenuWidth);

    .PageMenu_c2_inner {
      max-height: 100%;

      > div {
        max-height: 100%;

        padding: 44px 0 32px 20px;

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

  .PageMenu_c2_inner {
    //
  }

  .PageMenu_c1_r3 {
    z-index: 101;
    pointer-events: none;

    position: fixed;
    left: 0;
    bottom: 0;

    width: 100%;
  }

  .PageMenu_c1_r3_inner {
    //
  }

  .PageMenu_c1_r3_inner_inner {
    pointer-events: all;
    cursor: pointer;
    position: relative;

    width: 60px;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 40px;
    margin-left: auto;

    border-radius: 50%;
    background-color: #ffffff;
  }

  .PageMenu_c1_r3_inner_inner.isOpenCartMenu {
    visibility: hidden;
  }

  .PageMenu_c1_r3_totalCount {
    min-width: 28px;
    min-height: 28px;
    height: 28px;
    max-height: 28px;

    position: absolute;
    top: -7px;
    right: -7px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: #ff0055;

    font: normal normal 500 14px/17px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  /** tablet */
  ${med.max.tablet} {
    .PageMenu_StylePageDivCenter,
    .PageMenu_c1_r3 {
      padding: 0 var(--pagePaddingSide);
    }

    .PageMenu_c1_r1_inner_inner {
      padding-left: var(--pagePaddingSide);
      padding-right: var(--pagePaddingSide);
    }
  }

  /** mobile */
  ${med.max.sm} {
    .PageMenu_StylePageDivCenter {
      padding: 0;
    }

    .PageMenu_c1_r1 {
      /* z-index: 102; */
    }

    .PageMenu_c1_r1_inner_inner {
      height: 70px;
    }

    .PageMenu_c1_r2 {
      padding: 0 var(--pagePaddingSide);
    }

    .PageMenu_c1_r3_inner_inner {
      width: 50px;
      height: 50px;

      margin-bottom: 30px;
      padding: 13px 15px;
    }

    .PageMenu_c1_r3_totalCount {
      top: -15px;
      right: 0px;
    }

    .PageMenu_c2.isOpenCartMenu {
      z-index: 101;

      top: calc(var(--navbarHeight));
      left: 0;

      min-width: 100%;
      width: 100%;
      max-width: 100%;

      .PageMenu_c2_inner {
        height: 100%;
        max-height: 100%;

        > div {
          height: 100%;
          max-height: 100%;

          padding: 0 var(--pagePaddingSide);
          padding-top: 25px;
          padding-bottom: 30px;

          :after {
            display: none;
          }
        }
      }
    }
  }
`;
