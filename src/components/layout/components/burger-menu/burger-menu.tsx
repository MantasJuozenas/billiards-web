import { LinksDefault } from '@components/layout/functions/links-default';
import { buildPath, routes } from '@constants/routes';
import { flag_SetNavbarMenuOpen } from '@store/modules/flags/actions';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { SVGIconBurger } from '@styles/global-icons/icons/svg-icon-burger';
import { SVGIconClose2 } from '@styles/global-icons/icons/svg-icon-close-2';
import { useOutsideClick } from '@utilsFn/hooks/use-outside-click';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Contact } from '../contact';
import { Logo } from '../logo';

export const BurgerMenu = () => {
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const navbarMenuOpen = useSelector((s) => s.flags.navbarMenuOpen);

  const refBurgerMenu = React.useRef<HTMLDivElement | null>(null);

  const { links } = LinksDefault();

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
        loginFrom: 'default-login',
        redirectPathAfterLogin: to
      })
    );

    router?.push?.(buildPath(routes.login, { ...params }));
  };

  React.useEffect(() => {
    return () => {
      handlerOnClickClose();
    };
  }, []);

  useOutsideClick(refBurgerMenu, () => {
    handlerOnClickClose();
  });

  return (
    <ContainerBurgerMenu ref={refBurgerMenu}>
      <div
        className="BurgerMenu_r1"
        onClick={() => {
          handlerOnClickBurger();
        }}
      >
        <SVGIconBurger />
      </div>

      {navbarMenuOpen ? (
        <div className="BurgerMenu_r2">
          <div className="BurgerMenu_r2_r1">
            <div
              className="BurgerMenu_r2_r1_r1"
              onClick={() => {
                handlerOnClickClose();
              }}
            >
              <SVGIconClose2 />
            </div>
          </div>

          <div className="BurgerMenu_r2_r2">
            <div className="BurgerMenu_r2_r2_r1">
              <Logo />
            </div>

            <div className="BurgerMenu_r2_r2_r2">
              <Contact />
            </div>

            <div className="BurgerMenu_r2_r2_r3">
              {links?.map?.((link, i) => {
                const isActive = link.activeRoutes?.includes(router?.pathname);
                const classNames = [isActive ? 'isActive' : ''];
                return (
                  <div
                    key={i}
                    className={joinClasses(
                      `BurgerMenu_r2_r2_r3_item`,
                      ...classNames
                    )}
                  >
                    <Link
                      href={link?.to}
                      onClick={(e) => {
                        if (link?.isAuthRoute && !isLoggedIn) {
                          e.preventDefault();
                          handlerDoLogin(link?.to);
                        } else {
                          handlerOnClickClose();
                        }
                      }}
                    >
                      {link?.label || ''}

                      {link?.count ? (
                        <div className="BurgerMenu_r2_r2_r3_item_count">
                          {link?.count}
                        </div>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </ContainerBurgerMenu>
  );
};

const ContainerBurgerMenu = styled.div`
  --padingSide: 32px;

  .BurgerMenu_r1 {
    cursor: pointer;
    display: flex;

    svg {
      width: 16px;
    }
  }

  .BurgerMenu_r2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
  }

  .BurgerMenu_r2_r1 {
    height: var(--navbarHeight);
    display: flex;
    align-items: center;
    padding: 0 var(--pagePaddingSide);
    box-shadow: inset 0 -1px 0 0 #383838;
  }

  .BurgerMenu_r2_r1_r1 {
    cursor: pointer;
    margin-left: auto;
  }

  .BurgerMenu_r2_r2 {
    overflow: auto;
    display: flex;
    flex-direction: column;
    max-height: calc(100% - var(--navbarHeight));

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .BurgerMenu_r2_r2_r1 {
    margin-top: 12px;
    margin-bottom: 20px;
    padding: 0 var(--padingSide);

    span {
      font: normal normal bold 29px/35px Roboto;
      letter-spacing: 0.58px;
    }
  }

  .BurgerMenu_r2_r2_r2 {
    margin-bottom: 46px;
    padding: 0 var(--padingSide);

    > div {
      flex-direction: row;

      .Contact_r1 {
        display: flex;
        align-items: center;
        margin: 0;
        margin-right: 16px;
      }

      .Contact_r2 {
        a {
          color: #ff0055;
        }
      }
    }
  }

  .BurgerMenu_r2_r2_r3 {
    padding: 0 var(--padingSide);
  }

  .BurgerMenu_r2_r2_r3_item {
    margin-bottom: 40px;

    a {
      display: flex;
      align-items: center;

      font: normal normal normal 18px/22px Roboto;
      letter-spacing: 0px;
      color: #a9a9a9;
    }
    &.isActive {
      a {
        color: #ffffff;
      }
    }
    :hover {
      a {
        color: #ffffff;
      }
    }
  }

  .BurgerMenu_r2_r2_r3_item_count {
    min-width: 22px;
    min-height: 22px;
    height: 22px;
    max-height: 22px;

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
`;
