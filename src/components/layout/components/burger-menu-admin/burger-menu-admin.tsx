import { LinksDefaultAdmin } from '@components/layout/functions/links-default-admin';
import { Button } from '@components/utils/buttons/button';
import { buildPath, routes } from '@constants/routes';
import { logout } from '@store/modules/auth/actions';
import { flag_SetNavbarMenuOpen } from '@store/modules/flags/actions';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { SVGIconBurger } from '@styles/global-icons/icons/svg-icon-burger';
import { SVGIconClose2 } from '@styles/global-icons/icons/svg-icon-close-2';
import { useOutsideClick } from '@utilsFn/hooks/use-outside-click';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { Logo } from '../logo';

export const BurgerMenuAdmin = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const navbarMenuOpen = useSelector((s) => s.flags.navbarMenuOpen);

  const refBurgerMenuAdmin = React.useRef<HTMLDivElement | null>(null);

  const { links } = LinksDefaultAdmin();

  const handlerOnClickBurger = () => {
    dispatch(flag_SetNavbarMenuOpen(!navbarMenuOpen));
  };

  const handlerOnClickClose = () => {
    dispatch(flag_SetNavbarMenuOpen(false));
  };

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

  React.useEffect(() => {
    return () => {
      handlerOnClickClose();
    };
  }, []);

  useOutsideClick(refBurgerMenuAdmin, () => {
    handlerOnClickClose();
  });

  return (
    <ContainerBurgerMenuAdmin ref={refBurgerMenuAdmin}>
      <div
        className="BurgerMenuAdmin_r1"
        onClick={() => {
          handlerOnClickBurger();
        }}
      >
        <SVGIconBurger />
      </div>

      {navbarMenuOpen ? (
        <div className="BurgerMenuAdmin_r2">
          <div className="BurgerMenuAdmin_r2_r1">
            <div
              className="BurgerMenuAdmin_r2_r1_r1"
              onClick={() => {
                handlerOnClickClose();
              }}
            >
              <SVGIconClose2 />
            </div>
          </div>

          <div className="BurgerMenuAdmin_r2_r2">
            <div className="BurgerMenuAdmin_r2_r2_r1">
              <Logo />
            </div>

            <div className="BurgerMenuAdmin_r2_r2_r3">
              {links?.map?.((link, i) => {
                const isActive = router?.pathname === link?.route;

                const classNames = [isActive ? 'isActive' : ''];

                return (
                  <div
                    key={i}
                    className={joinClasses(
                      `BurgerMenuAdmin_r2_r2_r3_item`,
                      ...classNames
                    )}
                  >
                    <Link
                      href={link?.to}
                      onClick={(e) => {
                        if (link?.isAuthRoute && !isLoggedIn) {
                          e.preventDefault();
                          handlerDoLogin(link?.to);
                        }
                      }}
                    >
                      {link?.label || ''}
                    </Link>
                  </div>
                );
              })}

              <div className="BurgerMenuAdmin_r2_r2_r3_itemLogout">
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
        </div>
      ) : null}
    </ContainerBurgerMenuAdmin>
  );
};

const ContainerBurgerMenuAdmin = styled.div`
  --padingSide: 32px;

  .BurgerMenuAdmin_r1 {
    cursor: pointer;
    display: flex;

    svg {
      width: 16px;
    }
  }

  .BurgerMenuAdmin_r2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
  }

  .BurgerMenuAdmin_r2_r1 {
    height: var(--navbarHeight);
    display: flex;
    align-items: center;
    padding: 0 var(--pagePaddingSide);
    box-shadow: inset 0 -1px 0 0 #383838;
  }

  .BurgerMenuAdmin_r2_r1_r1 {
    cursor: pointer;
    margin-left: auto;
  }

  .BurgerMenuAdmin_r2_r2 {
    overflow: auto;
    display: flex;
    flex-direction: column;
    max-height: calc(100% - var(--navbarHeight));

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .BurgerMenuAdmin_r2_r2_r1 {
    margin-top: 12px;
    margin-bottom: 20px;
    padding: 0 var(--padingSide);

    span {
      font: normal normal bold 29px/35px Roboto;
      letter-spacing: 0.58px;
    }
  }

  .BurgerMenuAdmin_r2_r2_r3 {
    padding: 0 var(--padingSide);
  }

  .BurgerMenuAdmin_r2_r2_r3_item {
    margin-bottom: 40px;

    a {
      font: normal normal normal 18px/22px Roboto;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

  .BurgerMenuAdmin_r2_r2_r3_itemLogout {
    display: flex;
  }
`;
