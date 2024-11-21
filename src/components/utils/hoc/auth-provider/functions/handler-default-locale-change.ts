import { buildPath } from '@constants/routes';
import { NextRouter } from 'next/router';

export const HandlerDefaultLocaleChange = (
  props: NHandlerDefaultLocaleChange.IProps
) => {
  const { router, defaultLocale } = props;

  const params = router?.query as G.IQueryParams;

  if (router?.locale && defaultLocale && router?.locale !== defaultLocale) {
    router?.push(
      buildPath(router?.pathname, { ...params }, true, true),
      undefined,
      { locale: defaultLocale }
    );
  }
};

export namespace NHandlerDefaultLocaleChange {
  export interface IProps {
    router: NextRouter;
    defaultLocale: G.TDefaultLocales;
  }
}
