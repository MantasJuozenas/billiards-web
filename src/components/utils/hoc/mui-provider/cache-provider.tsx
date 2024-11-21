import createEmotionCache from '@components/utils/pixinn/mui/create-motion-cache';
// Client-side cache, shared for the whole session of the user in the browser.
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

export const MuiCacheProvider = (props: NMuiCacheProvider.IProps) => {
  const { emotionCache = clientSideEmotionCache } = props;

  return <CacheProvider value={emotionCache}>{props?.children}</CacheProvider>;
};

export namespace NMuiCacheProvider {
  export interface IProps {
    children: React.ReactNode;
    emotionCache?: G.IExtendedAppProps['emotionCache'];
  }
}
