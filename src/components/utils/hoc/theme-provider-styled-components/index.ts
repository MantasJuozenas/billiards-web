import dynamic from 'next/dynamic';

import { NThemeProviderStyledComponents } from './theme-provider-styled-components';

export const ThemeProviderStyledComponents =
  dynamic<NThemeProviderStyledComponents.IProps>(
    import('./theme-provider-styled-components').then(
      (m) => m.ThemeProviderStyledComponents
    )
  );
