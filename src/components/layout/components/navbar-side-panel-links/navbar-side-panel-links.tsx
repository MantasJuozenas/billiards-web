import { LinksDefault } from '@components/layout/functions/links-default';
import { buildPath, routes } from '@constants/routes';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export const NavbarSidePanelLinks = () => {
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
    <ContainerNavbarSidePanelLinks>
      {links?.map?.((item, i) => {
        const isActive = router?.pathname === item?.route;
        const classNames = [isActive ? 'isActive' : ''];

        return (
          <div
            key={i}
            className={joinClasses(
              `NavbarSidePanelLinks_r1_item`,
              ...classNames
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
              {item?.icon || null}
              {item?.label || ''}
            </Link>
          </div>
        );
      })}
    </ContainerNavbarSidePanelLinks>
  );
};

const ContainerNavbarSidePanelLinks = styled.div`
  padding: 10px;

  .NavbarSidePanelLinks_r1_item {
    padding: 15px 0;
    border-bottom: 1px solid #d9d9d9;

    a {
      display: flex;
      width: 100%;
      text-decoration: none;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #0a0039;
      transition: text-shadow 0.3s;

      svg {
        margin-right: 7px;
        path {
          stroke: #0a0039;
        }
      }
    }

    :hover:not(&.isActive) {
      a {
        /* font-weight: 600; */
        text-shadow: 0 0 0.65px #333, 0 0 0.65px #333;
        /* use the line below if you want a more intense effect */
        /* text-shadow: 0 0 .9px #333, 0 0 .9px #333, 0 0 .9px #333; */
      }
    }

    &.isActive {
      a {
        color: #3e60d8;

        svg {
          path {
            stroke: #3e60d8;
          }
        }
      }
    }
  }
`;
