/* eslint-disable sonarjs/no-duplicated-branches */
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
import { colors } from '@styles/global-colors';
import { EBreakpoint } from '@typings/custom/enum-custom';
import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

export const ThemeProviderStyledComponents = (
  props: NThemeProviderStyledComponents.IProps
) => {
  /* eslint-disable prettier/prettier */
  // const isAppReady = useSelector((s) => s.global.isAppReady);
  const breakpoint = useSelector((s) => s.device.breakpoint);
  const screenWidth = useSelector((s) => s.device.screenWidth);
  const screenHeight = useSelector((s) => s.device.screenHeight);
  const navbarSidePanelWidth = useSelector((s) => s.flags.navbarSidePanelWidth);
  /* eslint-enable prettier/prettier */

  const themeColors = colors;

  const cssVariables = React.useMemo(() => {
    const cssVariablesBuilder: DefaultTheme['cssVars'] = {
      screenHeight,
      screenWidth,
      layoutWidth: LAYOUT_WIDTH,
      navbarHeight: NAVBAR_HEIGHT_DESKTOP,
      sidePanelWidth: navbarSidePanelWidth || NAVBAR_SIDE_PANEL_WIDTH,
      footerHeight: FOOTER_HEIGHT_DESKTOP,
      pagePaddingSide: PAGE_PADDING_SIDE_DESKTOP
    };

    /**
     * Auto navbar, footer height
     * Use only on client side, when ssr is done
     */
    if (
      breakpoint === EBreakpoint.ExtraLarge ||
      breakpoint === EBreakpoint.Large ||
      breakpoint === EBreakpoint.Medium
    ) {
      cssVariablesBuilder.navbarHeight = NAVBAR_HEIGHT_DESKTOP;
      cssVariablesBuilder.footerHeight = FOOTER_HEIGHT_DESKTOP;
      cssVariablesBuilder.pagePaddingSide = PAGE_PADDING_SIDE_DESKTOP;
    } else if (breakpoint === EBreakpoint.Tablet) {
      cssVariablesBuilder.navbarHeight = NAVBAR_HEIGHT_TABLET;
      cssVariablesBuilder.footerHeight = FOOTER_HEIGHT_TABLET;
      cssVariablesBuilder.pagePaddingSide = PAGE_PADDING_SIDE_TABLET;
    } else if (
      breakpoint === EBreakpoint.Small ||
      breakpoint === EBreakpoint.ExtraSmall
    ) {
      cssVariablesBuilder.navbarHeight = NAVBAR_HEIGHT_MOBILE;
      cssVariablesBuilder.footerHeight = FOOTER_HEIGHT_MOBILE;
      cssVariablesBuilder.pagePaddingSide = PAGE_PADDING_SIDE_MOBILE;
    } else {
      cssVariablesBuilder.navbarHeight = NAVBAR_HEIGHT_DESKTOP;
      cssVariablesBuilder.footerHeight = FOOTER_HEIGHT_DESKTOP;
      cssVariablesBuilder.pagePaddingSide = PAGE_PADDING_SIDE_DESKTOP;
    }

    return cssVariablesBuilder;
  }, [breakpoint, screenHeight, screenWidth, navbarSidePanelWidth]);

  return (
    // @ts-ignore
    <ThemeProvider
      theme={{
        colors: themeColors,
        // isAppReady
        /* , fonts, /> */
        cssVars: cssVariables
      }}
    >
      {props?.children}
    </ThemeProvider>
  );
};

export namespace NThemeProviderStyledComponents {
  export interface IProps {
    children: React.ReactNode;
  }
}
