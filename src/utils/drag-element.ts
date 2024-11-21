/* eslint-disable no-param-reassign */
export const dragElement = (
  docClassName: string,
  docMoverClassName: string
) => {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  const doc: HTMLElement | null = document.querySelector(`.${docClassName}`);
  const docMover: HTMLElement | null = document.querySelector(
    `.${docMoverClassName}`
  );

  if (doc) {
    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
    };

    const elementDrag = (e: MouseEvent) => {
      e = e || (window?.event as any);
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      doc.style.top = `${doc.offsetTop - pos2}px`;
      doc.style.left = `${doc.offsetLeft - pos1}px`;
    };

    const dragMouseDown = (e: MouseEvent) => {
      e = e || (window?.event as any);
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementTouchDrag = (e: TouchEvent) => {
      const touchLocation = e?.targetTouches?.[0];

      pos1 = pos3 - (touchLocation?.clientX || 0);
      pos2 = pos4 - (touchLocation?.clientY || 0);
      pos3 = touchLocation?.clientX;
      pos4 = touchLocation?.clientY;

      // doc.style.top = `${doc.offsetTop - pos2}px`;
      // doc.style.left = `${doc.offsetLeft - pos1}px`;
      doc.style.top = `${pos4 - 20}px`;
      doc.style.left = `${pos3 - 20}px`;
    };

    const dragTouchMove = (e: TouchEvent) => {
      const touchLocation = e?.targetTouches?.[0];

      pos3 = touchLocation?.clientX;
      pos4 = touchLocation?.clientY;
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementTouchDrag;
    };

    if (docMover) {
      docMover.onmousedown = dragMouseDown;
      docMover.ontouchmove = dragTouchMove;
    } else {
      doc.onmousedown = dragMouseDown;
      doc.ontouchmove = dragTouchMove;
    }
  }
};
