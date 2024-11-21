import React from 'react';

interface IUseIntersectionObserverProps {
  name: string;
  element: React.RefObject<any>;
  scrollElement: React.RefObject<any>;
  callBack: () => void;
  options?: {
    root?: IntersectionObserver['root'];
    rootMargin?: IntersectionObserver['rootMargin'];
    threshold?: number | number[];
  };
}

let listenerCallbacks: G.Dictionary<{
  name: string;
  WeakMap: WeakMap<any, any>;
}> = {};
let observer: G.Dictionary<{
  name: string;
  observer: IntersectionObserver;
}>;

const handleIntersections = (
  entries: IntersectionObserverEntry[],
  name: string
) => {
  entries?.forEach((entry) => {
    // console.log('listenerCallbacks', listenerCallbacks?.[`${name}`]);
    // console.log('observer', observer?.[`${name}`]);
    if (listenerCallbacks?.[`${name}`]?.WeakMap?.has?.(entry?.target)) {
      const cb = listenerCallbacks?.[`${name}`]?.WeakMap?.get(entry?.target);
      if (entry?.isIntersecting || entry?.intersectionRatio > 0) {
        observer?.[`${name}`]?.observer?.unobserve?.(entry?.target);
        listenerCallbacks?.[`${name}`]?.WeakMap?.delete(entry?.target);
        cb?.();
      }
    }
  });
};

const getIntersectionObserver = (
  name: string,
  scrollElement: IUseIntersectionObserverProps['scrollElement'],
  options?: IUseIntersectionObserverProps['options']
) => {
  if (!observer?.[`${name}`]?.name) {
    observer = {
      ...observer,
      [`${name}`]: {
        name,
        observer: new IntersectionObserver(
          (entries) => handleIntersections(entries, name),
          options || {
            root: scrollElement?.current,
            rootMargin: '100px',
            threshold: 1
          }
        )
      }
    };
  }
  return observer;
};

export const useIntersectionObserver = (
  props: IUseIntersectionObserverProps
) => {
  const { name, element, scrollElement, callBack, options } = props;
  //   console.log('props', props);
  React.useEffect(() => {
    if (!listenerCallbacks?.[`${name}`]?.name) {
      listenerCallbacks = {
        ...listenerCallbacks,
        [`${name}`]: {
          name,
          WeakMap: new WeakMap()
        }
      };
    }

    const target = element?.current;
    const targetObserver = getIntersectionObserver(
      name,
      scrollElement,
      options
    );
    listenerCallbacks?.[`${name}`]?.WeakMap?.set?.(target, callBack);
    targetObserver?.[`${name}`]?.observer?.observe?.(target);

    return () => {
      listenerCallbacks?.[`${name}`]?.WeakMap?.delete?.(target);
      targetObserver?.[`${name}`]?.observer?.unobserve?.(target);
    };
  }, [name]);
};
