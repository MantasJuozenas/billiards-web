/* eslint-disable jsx-a11y/anchor-is-valid */
import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { NavbarSidePanelDefault } from './navbar-side-panel-default';
import { NavbarSidePanelDefaultAdmin } from './navbar-side-panel-default-admin';

const defaultState: NNavbarSidePanel.IState = {
  showMobile: true,
  showTablet: true,
  showDesktop: true
};

export const NavbarSidePanel = (props: NNavbarSidePanel.IProps) => {
  const { classNames = [''] } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const refFirstLoad = React.useRef(true);

  const isMobile = useSelector((s) => s.device.isMobile);
  const isTablet = useSelector((s) => s.device.isTablet);
  const isDesktop = useSelector((s) => s.device.isDesktop);

  const [state, setState] = React.useState(defaultState);

  const showWebSidePanel =
    props?.showWebSidePanel && (state?.showDesktop ?? true);
  const showTabletSidePanel =
    props?.showTabletSidePanel && (state?.showTablet ?? true);
  const showMobileSidePanel =
    props?.showMobileSidePanel && (state?.showMobile ?? true);

  let NavbarSidePanelComponent = NavbarSidePanelDefault;

  if (props?.sidePanelFor === 'administrator') {
    NavbarSidePanelComponent = NavbarSidePanelDefaultAdmin;
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
    <ContainerNavbarSidePanel
      id="__NavbarSidePanel"
      className={joinClasses(`__NavbarSidePanel__`, ...classNames)}
    >
      {showWebSidePanel ? (
        <div
          className={joinClasses(
            'NavbarSidePanel_inner desktop',
            ...classNames
          )}
        >
          <div
            className={joinClasses(
              'NavbarSidePanel_inner_inner',
              ...classNames
            )}
          >
            <NavbarSidePanelComponent.D />
          </div>
        </div>
      ) : null}

      {showTabletSidePanel ? (
        <div
          className={joinClasses('NavbarSidePanel_inner tablet', ...classNames)}
        >
          <div
            className={joinClasses(
              'NavbarSidePanel_inner_inner',
              ...classNames
            )}
          >
            <NavbarSidePanelComponent.T />
          </div>
        </div>
      ) : null}

      {showMobileSidePanel ? (
        <div
          className={joinClasses('NavbarSidePanel_inner mobile', ...classNames)}
        >
          <div
            className={joinClasses(
              'NavbarSidePanel_inner_inner',
              ...classNames
            )}
          >
            <NavbarSidePanelComponent.M />
          </div>
        </div>
      ) : null}
    </ContainerNavbarSidePanel>
  );
};

export namespace NNavbarSidePanel {
  export interface IProps {
    classNames: string[];
    showWebSidePanel?: boolean;
    showTabletSidePanel?: boolean;
    showMobileSidePanel?: boolean;
    sidePanelFor?: G.TAuthLevel;
  }

  export interface IState {
    showMobile: boolean;
    showTablet: boolean;
    showDesktop: boolean;
  }
}

const ContainerNavbarSidePanel = styled.div`
  @media print {
    display: none;
  }
  z-index: 100;
  position: fixed;
  top: 0;
  width: var(--sidePanelWidth);
  max-width: var(--sidePanelWidth);
  height: 100%;
  overflow: hidden;

  &.noWebSidePanel {
    display: none;
  }

  .NavbarSidePanel_inner {
    transition: unset;
    height: 100%;
    width: 100%;
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
  .NavbarSidePanel_inner_inner {
    height: 100%;
    width: 100%;
    display: flex;
  }
  // tablet
  ${_(media.max.tablet)} {
    &.noWebSidePanel {
      display: unset;
    }
    &.noTabletSidePanel {
      display: none;
    }
    .NavbarSidePanel_inner {
      &.desktop {
        display: none;
      }
      &.tablet {
        display: flex;
      }
    }
  }
  // mobile
  ${_(media.max.sm)} {
    &.noWebSidePanel {
      display: unset;
    }
    &.noTabletSidePanel {
      display: unset;
    }
    &.noMobileSidePanel {
      display: none;
    }
    .NavbarSidePanel_inner {
      &.tablet {
        display: none;
      }
      &.mobile {
        display: flex;
      }
    }
  }
`;
