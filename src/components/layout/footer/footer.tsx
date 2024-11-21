import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { FooterDefault } from './footer-default';
import { FooterDefaultAdmin } from './footer-default-admin';

const defaultState: NFooter.IState = {
  showMobile: true,
  showTablet: true,
  showDesktop: true
};

export const Footer = (props: NFooter.IProps) => {
  const { classNames = [''] } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const refFirstLoad = React.useRef(true);

  const isMobile = useSelector((s) => s.device.isMobile);
  const isTablet = useSelector((s) => s.device.isTablet);
  const isDesktop = useSelector((s) => s.device.isDesktop);

  const [state, setState] = React.useState(defaultState);

  const showWebFooter = props?.showWebFooter && (state?.showDesktop ?? true);
  const showTabletFooter =
    props?.showTabletFooter && (state?.showTablet ?? true);
  const showMobileFooter =
    props?.showMobileFooter && (state?.showMobile ?? true);

  let FooterComponent = FooterDefault;

  if (props?.footerFor === 'administrator') {
    FooterComponent = FooterDefaultAdmin;
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
    <ContainerFooter
      id="__Footer"
      className={joinClasses('__Footer__', ...classNames)}
    >
      {showWebFooter ? (
        <div className={joinClasses('Footer_inner desktop', ...classNames)}>
          <div className={joinClasses('Footer_inner_inner', ...classNames)}>
            <FooterComponent.D />
          </div>
        </div>
      ) : null}

      {showTabletFooter ? (
        <div className={joinClasses('Footer_inner tablet', ...classNames)}>
          <div className={joinClasses('Footer_inner_inner', ...classNames)}>
            <FooterComponent.T />
          </div>
        </div>
      ) : null}

      {showMobileFooter ? (
        <div className={joinClasses('Footer_inner mobile', ...classNames)}>
          <div className={joinClasses('Footer_inner_inner', ...classNames)}>
            <FooterComponent.M />
          </div>
        </div>
      ) : null}
    </ContainerFooter>
  );
};

export namespace NFooter {
  export interface IProps {
    classNames: string[];
    showWebFooter: boolean;
    showTabletFooter: boolean;
    showMobileFooter: boolean;
    footerFor?: G.TAuthLevel;
  }

  export interface IState {
    showMobile: boolean;
    showTablet: boolean;
    showDesktop: boolean;
  }
}

const ContainerFooter = styled.footer`
  @media print {
    display: none;
  }

  z-index: 100;
  height: var(--footerHeight);
  &.noWebFooter {
    display: none;
  }
  .Footer_inner {
    height: var(--footerHeight);
    width: 100%;
    max-width: 100%;
    background-color: transparent;
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
  .Footer_inner_inner {
    height: var(--footerHeight);
    width: 100%;
    padding: 0 0 0 var(--sidePanelWidth);
    background-color: #000000;
    > div {
      height: var(--footerHeight);
      width: 100%;
    }
    &.noSidePanel,
    &.noWebSidePanel {
      padding: 0;
    }
  }
  // tablet
  ${_(media.max.tablet)} {
    &.noWebFooter {
      display: unset;
    }
    &.noTabletFooter {
      display: none;
    }
    .Footer_inner {
      &.desktop {
        display: none;
      }
      &.tablet {
        display: flex;
      }
    }
    .Footer_inner_inner {
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
    &.noWebFooter {
      display: unset;
    }
    &.noTabletFooter {
      display: unset;
    }
    &.noMobileFooter {
      display: none;
    }
    .Footer_inner {
      &.tablet {
        display: none;
      }
      &.mobile {
        display: flex;
      }
    }
    .Footer_inner_inner {
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
