import { useEffect } from '@utilsFn/hooks/use-effect';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';

import { HandlerDefaultLocaleChange } from '../functions/handler-default-locale-change';

export const useDefaultLocaleChange = () => {
  const router = useRouter();

  const defaultLocale = useSelector((s) => s.translations.defaultLocale);
  const authCheckComplete = useSelector((s) => s.auth.authCheckComplete);

  useEffect({
    effect: () => {
      // console.log(
      //   '______HandlerDefaultLocaleChange',
      //   localeInitDone,
      //   authCheckComplete,
      //   router?.locale,
      //   defaultLocale
      // );

      // if (!localeInitDone) return;
      if (!authCheckComplete) return;
      if (router?.locale === defaultLocale) return;

      HandlerDefaultLocaleChange({ router, defaultLocale });
    },
    // deps: [localeInitDone, authCheckComplete, defaultLocale]
    deps: [authCheckComplete, defaultLocale]
  });
};
