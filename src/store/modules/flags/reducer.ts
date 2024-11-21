import { createReducer as reducer, reduce, set } from '@reduxify/utils';
import { combineReducers } from 'redux';

import { SetLocaleStorageFlagSidePanelCollapsed } from '../local-storage/functions/flag-side-panel-collapsed';
import { setDefaultLanguage } from '../translations/actions';
import * as A from './actions';
import { defaultState as ds, IState as ST } from './types';

/* eslint-disable prettier/prettier */
export default combineReducers<ST>({
  autoScrollOnRouteChangeComplete: reducer<ST['autoScrollOnRouteChangeComplete']>(ds.autoScrollOnRouteChangeComplete,
    reduce(A.flag_AutoScrollOnRouteChangeComplete, set)),
  hideLang: reducer<ST['hideLang']>(ds.hideLang,
    reduce(A.flag_HideLang, set),
    reduce(setDefaultLanguage, (_, {payload: pl}) => !!pl?.hideLang)),
  idScrollTo: reducer<ST['idScrollTo']>(ds.idScrollTo,
    reduce(A.flag_SetIdScrollTo, set)),
  isAuthOn: () => ds.isAuthOn,
  navbarWhite: reducer<ST['navbarWhite']>(ds.navbarWhite,
    reduce(A.flag_SetNavbarWhite, set)),
  navbarMenuOpen: reducer<ST['navbarMenuOpen']>(ds.navbarMenuOpen,
    reduce(A.flag_SetNavbarMenuOpen, set)),
  navbarShowSearch: reducer<ST['navbarShowSearch']>(ds.navbarShowSearch,
    reduce(A.flag_SetNavbarShowSearch, set)),
  navbarSidePanelWidth: reducer<ST['navbarSidePanelWidth']>(ds.navbarSidePanelWidth,
    reduce(A.flag_setNavbarSidePanelWidth, set)),
  navbarSidePanelCollapsed: reducer<ST['navbarSidePanelCollapsed']>(ds.navbarSidePanelCollapsed,
    reduce(A.flag_setNavbarSidePanelCollapsed, (_, {payload: pl}) => {
      SetLocaleStorageFlagSidePanelCollapsed(`${pl}`)
      return pl
    })),
  cartMenuOpen: reducer<ST['cartMenuOpen']>(ds.cartMenuOpen,
    reduce(A.flag_SetCartMenuOpen, set))
});
