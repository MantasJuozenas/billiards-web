import { useEffect } from '@utilsFn/hooks/use-effect';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';

import { HandlerRouteChangeComplete } from '../functions/handler-route-change-complete';

export const useRouteChangeComplete = () => {
  const router = useRouter();

  const isMobile = useSelector((s) => s.device.isMobile);
  const idScrollTo = useSelector((s) => s.flags.idScrollTo);
  const autoScrollOnRouteChangeComplete = useSelector(
    (s) => s.flags.autoScrollOnRouteChangeComplete
  );

  useEffect({
    effect: () => {
      router?.events.on('routeChangeComplete', (_url) => {
        HandlerRouteChangeComplete({
          idScrollTo,
          isMobile,
          autoScrollOnRouteChangeComplete
        });
      });
    },
    cleanup: () => {
      router?.events.off('routeChangeComplete', (_url) => {
        HandlerRouteChangeComplete({
          idScrollTo,
          isMobile,
          autoScrollOnRouteChangeComplete
        });
      });
    },
    deps: [autoScrollOnRouteChangeComplete, idScrollTo]
  });
};
