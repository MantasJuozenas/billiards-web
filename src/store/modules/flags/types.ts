import { NAVBAR_SIDE_PANEL_WIDTH } from '@constants/app-constants';

export interface IState {
  hideLang: boolean;
  isAuthOn: boolean;
  idScrollTo: string;
  navbarWhite: boolean;
  cartMenuOpen: boolean;
  navbarMenuOpen: boolean;
  navbarShowSearch: boolean;
  navbarSidePanelWidth: number;
  navbarSidePanelCollapsed: boolean;
  autoScrollOnRouteChangeComplete: boolean;
}

export const defaultState: IState = {
  hideLang: true,
  idScrollTo: '',
  isAuthOn: true,
  navbarWhite: true,
  cartMenuOpen: false,
  navbarMenuOpen: false,
  navbarShowSearch: true,
  navbarSidePanelWidth: NAVBAR_SIDE_PANEL_WIDTH,
  navbarSidePanelCollapsed: false,
  autoScrollOnRouteChangeComplete: true
};
