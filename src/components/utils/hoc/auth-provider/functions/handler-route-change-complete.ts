import { windowScroll, windowScrollToId } from '@utilsFn/window-scroll';

export const HandlerRouteChangeComplete = (
  props: NHandlerRouteChangeComplete.IProps
) => {
  const { idScrollTo, isMobile, autoScrollOnRouteChangeComplete } = props;

  if (autoScrollOnRouteChangeComplete) {
    if (idScrollTo) {
      setTimeout(() => {
        windowScrollToId(idScrollTo, isMobile);
      }, 600);
    } else {
      windowScroll({ top: 0, left: 0 });
    }
  }
};

export namespace NHandlerRouteChangeComplete {
  export interface IProps {
    idScrollTo: string;
    isMobile: boolean;
    autoScrollOnRouteChangeComplete: boolean;
  }

  export const F = Function;
}
