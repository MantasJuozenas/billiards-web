import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { NavbarDefault } from './navbar-default/index';
import { NavbarDefaultAdmin } from './navbar-default-admin';

const defaultState: NNavbar.IState = {
  showMobile: true,
  showTablet: true,
  showDesktop: true
};

export const Navbar = (props: NNavbar.IProps) => {
  const { classNames = [''] } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const refFirstLoad = React.useRef(true);

  const isMobile = useSelector((s) => s.device.isMobile);
  const isTablet = useSelector((s) => s.device.isTablet);
  const isDesktop = useSelector((s) => s.device.isDesktop);

  const [state, setState] = React.useState(defaultState);

  const showWebNavbar = props?.showWebNavbar && (state?.showDesktop ?? true);
  const showTabletNavbar =
    props?.showTabletNavbar && (state?.showTablet ?? true);
  const showMobileNavbar =
    props?.showMobileNavbar && (state?.showMobile ?? true);

  let NavbarComponent = NavbarDefault;

  if (props?.navbarFor === 'administrator') {
    NavbarComponent = NavbarDefaultAdmin;
  }

  React.useEffect(() => {
    if (refFirstLoad?.current) {
      setTimeout(() => {
        refFirstLoad.current = false;

        setState((previous) => ({
          ...previous,
          showMobile: isMobile,
          showTablet: isTablet,
          showDesktop: isDesktop
        }));
      }, 1);
    } else {
      setState((previous) => ({
        ...previous,
        showMobile: isMobile,
        showTablet: isTablet,
        showDesktop: isDesktop
      }));
    }
  }, [isMobile, isTablet, isDesktop]);

  return (
    <ContainerNavbar
      id="__Navbar"
      className={joinClasses('__Navbar__', ...classNames)}
    >
      {showWebNavbar ? (
        <div className={joinClasses('Navbar_inner desktop', ...classNames)}>
          <div className={joinClasses('Navbar_inner_inner', ...classNames)}>
            <NavbarComponent.D />
          </div>
        </div>
      ) : null}

      {showTabletNavbar ? (
        <div className={joinClasses('Navbar_inner tablet', ...classNames)}>
          <div className={joinClasses('Navbar_inner_inner', ...classNames)}>
            <NavbarComponent.T />
          </div>
        </div>
      ) : null}

      {showMobileNavbar ? (
        <div className={joinClasses('Navbar_inner mobile', ...classNames)}>
          <div className={joinClasses('Navbar_inner_inner', ...classNames)}>
            <NavbarComponent.M />
          </div>
        </div>
      ) : null}
    </ContainerNavbar>
  );
};

export namespace NNavbar {
  export interface IProps {
    classNames: string[];
    showWebNavbar: boolean;
    showTabletNavbar: boolean;
    showMobileNavbar: boolean;
    navbarFor?: G.TAuthLevel;
  }

  export interface IState {
    showMobile: boolean;
    showTablet: boolean;
    showDesktop: boolean;
  }
}

const ContainerNavbar = styled.nav`
  @media print {
    display: none;
  }

  z-index: 101;
  height: var(--navbarHeight);
  &.noWebNavbar {
    display: none;
  }
  &.mainContentUnderNavbar {
    height: 0;
  }
  .Navbar_inner {
    height: var(--navbarHeight);
    width: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #000000;
    /* display: flex; */
    &.desktop {
      display: flex;
    }
    &.tablet {
      display: none;
    }
    &.mobile {
      display: none;
    }
  }
  .Navbar_inner_inner {
    padding: 0 0 0 var(--sidePanelWidth);
    height: var(--navbarHeight);
    width: 100%;
    padding: 0 0 0 var(--sidePanelWidth);
    > div {
      height: var(--navbarHeight);
      width: 100%;
    }
    &.noSidePanel,
    &.noWebSidePanel {
      padding: 0;
    }
    &.navBorderBottom {
      box-shadow: inset 0 -1px 0 0 #383838;
    }
  }
  // tablet
  ${_(media.max.tablet)} {
    &.noWebNavbar {
      display: unset;
    }
    &.noTabletNavbar {
      display: none;
    }
    .Navbar_inner {
      &.desktop {
        display: none;
      }
      &.tablet {
        display: flex;
      }
    }
    .Navbar_inner_inner {
      &.noWebSidePanel {
        padding: 0 0 0 var(--sidePanelWidth);
      }
      &.noTabletSidePanel {
        padding: 0;
      }
    }
  }
  // mobile
  ${_(media.max.sm)} {
    &.noWebNavbar {
      display: unset;
    }
    &.noTabletNavbar {
      display: unset;
    }
    &.noMobileNavbar {
      display: none;
    }
    .Navbar_inner {
      &.tablet {
        display: none;
      }
      &.mobile {
        display: flex;
      }
    }
    .Navbar_inner_inner {
      &.noWebSidePanel {
        padding: 0 0 0 var(--sidePanelWidth);
      }
      &.noTabletSidePanel {
        padding: 0 0 0 var(--sidePanelWidth);
      }
      &.noMobileSidePanel {
        padding: 0;
      }
    }
  }
`;
