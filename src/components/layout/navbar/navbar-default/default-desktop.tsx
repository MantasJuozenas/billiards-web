import { BurgerMenu } from '@components/layout/components/burger-menu';
import { Contact } from '@components/layout/components/contact';
import { Logo } from '@components/layout/components/logo';
import { LinksDefault } from '@components/layout/functions/links-default';
import { buildPath, routes } from '@constants/routes';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { _, media } from '@utilsFn/breakpoint';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export const DefaultDesktop = () => {
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);

  const { links } = LinksDefault();

  const handlerDoLogin = (to: string) => {
    dispatch(
      setLoginData({
        openModalType: null,
        loginFrom: 'default-login',
        redirectPathAfterLogin: to
      })
    );

    router?.push?.(buildPath(routes.login, { ...params }));
  };

  return (
    <ContainerDefaultDesktop>
      <div className="DefaultDesktop_inner">
        <div className="DefaultDesktop_c1">
          <Logo />
        </div>

        <div className="DefaultDesktop_c2">
          {links?.map?.((item, i) => {
            const isActive = router?.pathname === item?.route;

            return (
              <div
                key={i}
                className={joinClasses(
                  `DefaultDesktop_c2_item`,
                  isActive ? 'isActive' : ''
                )}
              >
                <Link
                  href={item?.to}
                  onClick={(e) => {
                    if (item?.isAuthRoute && !isLoggedIn) {
                      e.preventDefault();
                      handlerDoLogin(item?.to);
                    }
                  }}
                >
                  {item?.label}

                  {item?.count ? (
                    <div className="DefaultDesktop_c2_item_count">
                      {item?.count}
                    </div>
                  ) : null}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="DefaultDesktop_c3">
          <Contact />
        </div>
      </div>

      <div className="DefaultTablet_innerTablet">
        <div className="DefaultTablet_c1">
          <Logo />
        </div>

        <div className="DefaultTablet_c2">
          <div className="DefaultTablet_c2_c1">
            <Contact />
          </div>

          <div className="DefaultTablet_c2_c2">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </ContainerDefaultDesktop>
  );
};

const ContainerDefaultDesktop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .DefaultDesktop_inner {
    height: 100%;
    width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--pagePaddingSide);
  }

  .DefaultDesktop_c1 {
    display: flex;
  }

  .DefaultDesktop_c2 {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .DefaultDesktop_c2_item {
    pointer-events: none;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    a {
      pointer-events: all;
      display: flex;
      align-items: center;
      font: normal normal normal 16px/19px Roboto;
      letter-spacing: 0px;
      color: #a9a9a9;
    }

    :not(:last-child) {
      margin-right: 25px;
    }

    :hover {
      ::after {
        content: '';
        position: absolute;
        bottom: 2px;
        height: 1px;
        width: 100%;
        background-color: #ffffff;
      }
    }

    &.isActive {
      a {
        color: #ffffff;
      }
    }
  }

  .DefaultDesktop_c2_item_count {
    min-width: 28px;
    min-height: 28px;
    height: 28px;
    max-height: 28px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: 7px;

    border-radius: 50%;
    background-color: #ff0055;

    font: normal normal 500 14px/17px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .DefaultDesktop_c3 {
    display: flex;
  }

  .DefaultTablet_innerTablet {
    display: none;
  }
  // custom
  ${_(media.max.custom(1160))} {
    .DefaultDesktop_inner {
      display: none;
    }

    .DefaultTablet_innerTablet {
      height: 100%;
      width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--pagePaddingSide);
    }

    .DefaultTablet_c1 {
      //
    }

    .DefaultTablet_c2 {
      display: flex;
      align-items: center;
    }

    .DefaultTablet_c2_c1 {
      margin-right: 50px;

      > div {
        flex-direction: row;

        .Contact_r1 {
          display: flex;
          align-items: center;
          margin: 0;
          margin-right: 20px;
        }
      }
    }

    .DefaultTablet_c2_c2 {
      display: flex;
    }
  }
`;
