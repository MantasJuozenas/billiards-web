import React from 'react';

const Hook = (
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

const Component = (props: useOutsideClick.IProps) => {
  const wrapperRef = React.useRef(null);
  Hook(wrapperRef, props?.onOutsideClick);
  return <div ref={wrapperRef}>{props?.children}</div>;
};

export namespace useOutsideClick {
  export interface IProps {
    children: React.ReactNode;
    onOutsideClick: (_event: MouseEvent) => void;
  }

  export const H = Hook;
  export const C = Component;
}
