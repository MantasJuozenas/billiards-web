import React, { RefObject, useEffect } from 'react';

export function useOutsideClickArr(
  handler: () => void,
  ...elements: Array<RefObject<HTMLElement>>
) {
  function f(event: MouseEvent) {
    const path = event.composedPath();
    if (
      (elements || [])
        ?.map((e) => e?.current)
        ?.filter((e) => e)
        ?.map((e) => path?.includes(e as any))
        ?.reduce((a, b) => a || b)
    ) {
      handler();
    }
  }
  useEffect(() => {
    document.addEventListener('click', f);
    return () => document.removeEventListener('click', f);
  }, []);
}

export const useOutsideClick = (
  ref: React.RefObject<any>,
  outsideClickHandler: (_event: MouseEvent) => void
) => {
  const handleOutsideClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      outsideClickHandler(event);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref, outsideClickHandler]);
};

export const UseOutsideClickComponent = (props: {
  children: React.ReactNode;
  onOutsideClick: (_event: MouseEvent) => void;
}) => {
  const wrapperRef = React.useRef(null);
  useOutsideClick(wrapperRef, props?.onOutsideClick);
  return <div ref={wrapperRef}>{props?.children}</div>;
};
