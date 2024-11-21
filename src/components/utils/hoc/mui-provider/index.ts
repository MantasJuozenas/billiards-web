import dynamic from 'next/dynamic';

import { NMuiCacheProvider } from './cache-provider';
import { NMuiLocalizationProvider } from './localization-provider';
import { NMuiThemeProvider } from './theme-provider';

export const MuiLocalizationProvider = dynamic<NMuiLocalizationProvider.IProps>(
  import('./localization-provider').then((m) => m.MuiLocalizationProvider)
);
export const MuiThemeProvider = dynamic<NMuiThemeProvider.IProps>(
  import('./theme-provider').then((m) => m.MuiThemeProvider)
);
export const MuiCacheProvider = dynamic<NMuiCacheProvider.IProps>(
  import('./cache-provider').then((m) => m.MuiCacheProvider)
);
