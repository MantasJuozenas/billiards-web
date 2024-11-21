/* eslint-disable max-len */
import { createActionCreator as action } from '@reduxify/utils';

import { IState as ST } from './types';

/* eslint-disable prettier/prettier */
/* Reducer actions */
export const flag_HideLang = action<ST['hideLang']>('flags.hide_lang');
export const flag_SetIdScrollTo = action<ST['idScrollTo']>('flags.set_id_scroll_to');
export const flag_SetNavbarWhite = action<ST['navbarWhite']>('flags.set_navbar_white');
export const flag_SetCartMenuOpen = action<ST['cartMenuOpen']>('flags.set_cart_menu_open');
export const flag_SetNavbarMenuOpen = action<ST['navbarMenuOpen']>('flags.set_navbar_menu_open');
export const flag_SetNavbarShowSearch = action<ST['navbarShowSearch']>('flags.set_navbar_show_search');
export const flag_setNavbarSidePanelWidth = action<ST['navbarSidePanelWidth']>('flags.flag_set_navbar_side_panel_width');
export const flag_setNavbarSidePanelCollapsed = action<ST['navbarSidePanelCollapsed']>('flags.flag_set_navbar_side_panel_collapsed');
export const flag_AutoScrollOnRouteChangeComplete = action<ST['autoScrollOnRouteChangeComplete']>('flags.set_auto_scroll_on_route_change_complete');
/* Saga actions */