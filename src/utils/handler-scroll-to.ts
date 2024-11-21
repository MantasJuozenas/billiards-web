export const HandlerScrollTo = (props: NHandlerScrollTo.IProps) => {
  const {
    docIdName,
    docClassName,
    isMobile,
    fromTopMobile = 63,
    fromTopWeb = 87
  } = props;

  const minusFromTop = isMobile ? fromTopMobile : fromTopWeb;

  let docTop = 0;

  if (docIdName) {
    const doc = document.getElementById(`${docIdName}`);
    if (doc) {
      docTop = doc?.getBoundingClientRect()?.top;
    }
  }

  if (docClassName) {
    const doc = document.querySelector(`.${docClassName}`);
    if (doc) {
      docTop = doc?.getBoundingClientRect()?.top;
    }
  }

  if (docTop) {
    setTimeout(() => {
      window?.scrollBy?.({
        left: 0,
        top: docTop - (minusFromTop || 0),
        behavior: 'smooth'
      });
    }, 0);
  }
};

namespace NHandlerScrollTo {
  export interface IProps {
    docIdName?: string;
    docClassName?: string;
    isMobile?: boolean;
    fromTopWeb?: number;
    fromTopMobile?: number;
  }
}
