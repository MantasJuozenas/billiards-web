export const windowScroll = (props: { top: number; left: number }) => {
  const { top, left } = props;
  return window.scrollTo({ top, left, behavior: 'smooth' });
};

export const windowScrollToId = (
  docName: string,
  isMobile = false,
  fromTopWeb = 63,
  fromTopMobile = 87
) => {
  const doc = document.getElementById(`${docName}`);
  if (doc) {
    const docTop = doc?.getBoundingClientRect()?.top;
    if (isMobile) {
      window.scrollBy(0, docTop - fromTopMobile);
    } else {
      window.scrollBy(0, docTop - fromTopWeb);
    }
  }
};

export const scrollHTMLElementByClassName = (
  docName: string,
  scrollY = 0,
  scrollX = 0
) => {
  const doc = document.querySelector(`.${docName}`);
  if (doc) {
    doc.scrollTo({ top: scrollY, left: scrollX, behavior: 'smooth' });
  }
};
