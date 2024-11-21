import { Logo } from '@components/layout/components/logo';
import { LinksDefaultAdmin } from '@components/layout/functions/links-default-admin';
import { Button } from '@components/utils/buttons/button';
import { buildPath, routes } from '@constants/routes';
import { logout } from '@store/modules/auth/actions';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const DefaultDesktop = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);

  const { links } = LinksDefaultAdmin();

  const handlerDoLogin = (to: string) => {
    dispatch(
      setLoginData({
        openModalType: null,
        loginFrom: 'admin-login',
        redirectPathAfterLogin: to
      })
    );

    router?.push?.(buildPath(routes['admin-login'], { ...params }));
  };

  const handlerDoLogout = () => {
    dispatch(
      logout({ redirectPathAfterLogin: buildPath(routes.home, { ...params }) })
    );
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
                </Link>
              </div>
            );
          })}

          <div className="DefaultDesktop_c2_itemLogout">
            <Button
              button={{
                onClick: () => {
                  handlerDoLogout();
                }
              }}
            >
              {t(`navbar:::LinksDefaultAdmin::text2`)}
            </Button>
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

  .DefaultDesktop_c2_itemLogout {
    display: flex;
  }
`;
