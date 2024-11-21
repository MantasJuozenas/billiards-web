import { FormToast } from '@components/modals-and-forms/toast';
import {
  FOOTER_HEIGHT_DESKTOP,
  FOOTER_HEIGHT_MOBILE,
  FOOTER_HEIGHT_TABLET,
  LAYOUT_WIDTH,
  NAVBAR_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_TABLET,
  NAVBAR_SIDE_PANEL_WIDTH,
  PAGE_PADDING_SIDE_DESKTOP,
  PAGE_PADDING_SIDE_MOBILE,
  PAGE_PADDING_SIDE_TABLET
} from '@constants/app-constants';
import { flag_setNavbarSidePanelWidth } from '@store/modules/flags/actions';
import { _, media } from '@utilsFn/breakpoint';
import { isBrowser } from '@utilsFn/check-browser';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import React from 'react';
import styled, { css } from 'styled-components';

import { Footer } from './footer';
import { Navbar } from './navbar';
import { NavbarSidePanel } from './navbar-side-panel';

export const Layout = (props: NLayout.IProps) => {
  const {
    showNavbar = true,
    showWebNavbar = true,
    showTabletNavbar = true,
    showMobileNavbar = true,
    showSidePanel = false,
    showWebSidePanel = true,
    showTabletSidePanel = false,
    showMobileSidePanel = false,
    showFooter = true,
    showWebFooter = true,
    showTabletFooter = true,
    showMobileFooter = true,
    layoutClassNames = [''],
    mainContentPosition = 'left',
    mainContentUnderNavbar = false
  } = props;

  const dispatch = useDispatch();
  /* eslint-disable prettier/prettier */
  const toast = useSelector(s => s.modalsAndForms.toast);
  const navbarSidePanelWidth = useSelector((s) => s.flags.navbarSidePanelWidth);
  const navbarSidePanelCollapsed = useSelector((s) => s.flags.navbarSidePanelCollapsed);
  /* eslint-enable prettier/prettier */
  const classNames = [
    ...layoutClassNames,
    toast?.openModalType ? 'show_toast' : '',
    showNavbar ? '' : 'noNavbar',
    showWebNavbar ? '' : 'noWebNavbar',
    showTabletNavbar ? '' : 'noTabletNavbar',
    showMobileNavbar ? '' : 'noMobileNavbar',
    showSidePanel ? '' : 'noSidePanel',
    showWebSidePanel ? '' : 'noWebSidePanel',
    showTabletSidePanel ? '' : 'noTabletSidePanel',
    showMobileSidePanel ? '' : 'noMobileSidePanel',
    showFooter ? '' : 'noFooter',
    showWebFooter ? '' : 'noWebFooter',
    showTabletFooter ? '' : 'noTabletFooter',
    showMobileFooter ? '' : 'noMobileFooter',
    mainContentPosition,
    mainContentUnderNavbar ? 'mainContentUnderNavbar' : ''
  ]?.filter?.((v) => v?.length);

  let NavbarComponent = (
    <Navbar
      classNames={classNames}
      showWebNavbar={showWebNavbar}
      showTabletNavbar={showTabletNavbar}
      showMobileNavbar={showMobileNavbar}
    />
  );
  let NavbarSidePanelComponent = (
    <NavbarSidePanel
      classNames={classNames}
      showWebSidePanel={showWebSidePanel}
      showTabletSidePanel={showTabletSidePanel}
      showMobileSidePanel={showMobileSidePanel}
    />
  );
  let FooterComponent = (
    <Footer
      classNames={classNames}
      showWebFooter={showWebFooter}
      showTabletFooter={showTabletFooter}
      showMobileFooter={showMobileFooter}
    />
  );

  if (props?.customNavbar) NavbarComponent = props?.customNavbar;
  if (props?.customSidePanel) NavbarSidePanelComponent = props?.customSidePanel;
  if (props?.customFooter) FooterComponent = props?.customFooter;

  if (!showNavbar) NavbarComponent = <></>;
  if (!showSidePanel) NavbarSidePanelComponent = <></>;
  if (!showFooter) FooterComponent = <></>;

  const handlerSidePanelChanges = () => {
    let initialSidePanelWidth = NAVBAR_SIDE_PANEL_WIDTH;
    if (navbarSidePanelCollapsed) initialSidePanelWidth -= 250;
    if (initialSidePanelWidth !== navbarSidePanelWidth) {
      dispatch(flag_setNavbarSidePanelWidth(initialSidePanelWidth));
    }
    // dispatch(flag_setNavbarSidePanelCollapsed())
  };

  React.useEffect(() => {
    handlerSidePanelChanges();
  }, [navbarSidePanelCollapsed]);

  return (
    <ContainerLayout
      id="__Layout"
      className={joinClasses('__Layout__', ...classNames)}
      classNames={classNames}
    >
      {NavbarComponent}

      <main
        id="__Main__Content"
        className={joinClasses('__Main__Content__', ...classNames)}
      >
        {props?.children}

        {NavbarSidePanelComponent}
      </main>

      {FooterComponent}

      <FormToast />
    </ContainerLayout>
  );
};

export namespace NLayout {
  export interface IProps {
    children: React.ReactNode;

    showNavbar?: boolean;
    showWebNavbar?: boolean;
    showTabletNavbar?: boolean;
    showMobileNavbar?: boolean;

    showSidePanel?: boolean;
    showWebSidePanel?: boolean;
    showTabletSidePanel?: boolean;
    showMobileSidePanel?: boolean;

    showFooter?: boolean;
    showWebFooter?: boolean;
    showTabletFooter?: boolean;
    showMobileFooter?: boolean;

    customNavbar?: JSX.Element;
    customSidePanel?: JSX.Element;
    customFooter?: JSX.Element;

    layoutClassNames?: string[];

    mainContentUnderNavbar?: boolean;
    mainContentPosition?: 'center' | 'left';
  }

  export interface IStyle {
    classNames: string[];
  }
}

const ContainerLayout = styled.div<NLayout.IStyle>`
  --screenWidth: 0px;
  --screenHeight: 0px;
  --layoutWidth: ${LAYOUT_WIDTH}px;
  --navbarHeight: ${NAVBAR_HEIGHT_DESKTOP}px;
  --sidePanelWidth: ${NAVBAR_SIDE_PANEL_WIDTH}px;
  --footerHeight: ${FOOTER_HEIGHT_DESKTOP}px;
  --pagePaddingSide: ${PAGE_PADDING_SIDE_DESKTOP}px;

  --layoutMinHeightPercent: max(100%, env(safe-area-inset-bottom));
  --layoutMinHeightVh: max(100vh, env(safe-area-inset-bottom));
  --pageWidth: 100%;

  --transitionSidePanel: all 0.3s ease-in;

  @media print {
    .__Main__Content__ {
      align-self: flex-start;
      max-width: 100vw;
      > div {
        :first-child {
          padding: 0;
        }
      }
    }
  }

  min-height: var(--layoutMinHeightPercent);
  min-height: var(--layoutMinHeightVh);
  display: flex;
  flex-direction: column;
  background-color: #000000;

  .__Main__Content__ {
    width: var(--pageWidth);
    max-width: var(--pageWidth);
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: center;

    > div {
      transition: var(--transitionSidePanel);

      :first-child {
        flex: 1;
        padding: 0 0 0 var(--sidePanelWidth);

        > div {
          transition: unset;
        }
      }
    }
    &.left {
      align-self: flex-start;
      max-width: 100vw;
    }
    &.noSidePanel,
    &.noWebSidePanel {
      > div {
        :first-child {
          padding: 0;
        }
      }
    }
    &.show_toast {
      #toast_form {
        transform: translateY(0px);
      }
    }
  }

  /**
  * for ssr only
  */
  // desktop
  ${_(media.max.lg)} {
    --navbarHeight: ${NAVBAR_HEIGHT_DESKTOP}px;
    /* --sidePanelWidth: ${NAVBAR_SIDE_PANEL_WIDTH}px; */
    --footerHeight: ${FOOTER_HEIGHT_DESKTOP}px;
    --pagePaddingSide: ${PAGE_PADDING_SIDE_DESKTOP}px;
  }

  ${_(media.max.md)} {
    --navbarHeight: ${NAVBAR_HEIGHT_DESKTOP}px;
    /* --sidePanelWidth: ${NAVBAR_SIDE_PANEL_WIDTH}px; */
    --footerHeight: ${FOOTER_HEIGHT_DESKTOP}px;
    --pagePaddingSide: ${PAGE_PADDING_SIDE_DESKTOP}px;
  }

  // tablet
  ${_(media.max.tablet)} {
    --navbarHeight: ${NAVBAR_HEIGHT_TABLET}px;
    /* --sidePanelWidth: ${NAVBAR_SIDE_PANEL_WIDTH}px; */
    --footerHeight: ${FOOTER_HEIGHT_TABLET}px;
    --pagePaddingSide: ${PAGE_PADDING_SIDE_TABLET}px;

    .__Main__Content__ {
      &.noWebSidePanel {
        > div {
          :first-child {
            padding: 0 0 0 var(--sidePanelWidth);
          }
        }
      }
      &.noTabletSidePanel {
        > div {
          :first-child {
            padding: 0;
          }
        }
      }
    }
  }

  // mobile
  ${_(media.max.sm)} {
    --navbarHeight: ${NAVBAR_HEIGHT_MOBILE}px;
    /* --sidePanelWidth: ${NAVBAR_SIDE_PANEL_WIDTH}px; */
    --footerHeight: ${FOOTER_HEIGHT_MOBILE}px;
    --pagePaddingSide: ${PAGE_PADDING_SIDE_MOBILE}px;

    .__Main__Content__ {
      &.noWebSidePanel {
        > div {
          :first-child {
            padding: 0 0 0 var(--sidePanelWidth);
          }
        }
      }
      &.noTabletSidePanel {
        > div {
          :first-child {
            padding: 0 0 0 var(--sidePanelWidth);
          }
        }
      }
      &.noMobileSidePanel {
        > div {
          :first-child {
            padding: 0;
          }
        }
      }
    }
  }

  ${_(media.max.xs)} {
    --navbarHeight: ${NAVBAR_HEIGHT_MOBILE}px;
    /* --sidePanelWidth: ${NAVBAR_SIDE_PANEL_WIDTH}px; */
    --footerHeight: ${FOOTER_HEIGHT_MOBILE}px;
    --pagePaddingSide: ${PAGE_PADDING_SIDE_MOBILE}px;
  }

  /**
  * for client side only
  */
  ${(props) => {
    if (isBrowser()) {
      return css`
        --screenWidth: ${props?.theme?.cssVars.screenWidth}px;
        --screenHeight: ${props?.theme?.cssVars.screenHeight}px;
        --layoutWidth: ${props?.theme?.cssVars.layoutWidth}px;
        --navbarHeight: ${props?.theme?.cssVars.navbarHeight}px;
        --sidePanelWidth: ${props?.theme?.cssVars.sidePanelWidth}px;
        --footerHeight: ${props?.theme?.cssVars.footerHeight}px;
        --pagePaddingSide: ${props?.theme?.cssVars.pagePaddingSide}px;
      `;
    }
  }}
`;
