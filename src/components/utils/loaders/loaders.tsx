import React from 'react';

import { BubbleLoader } from './components/bubble-loader';
import { LoaderOne } from './components/loader-one';

export const Loaders = (props: NLoaders.IProps) => {
  const { loaderName = 'LoaderOne' } = props;

  let loader = <div>Loading...</div>;

  if (loaderName === 'LoaderOne') loader = <LoaderOne />;
  if (loaderName === 'BubbleLoader') loader = <BubbleLoader />;

  if (props?.isLoading) return loader;

  return <>{props?.children}</>;
};

export namespace NLoaders {
  export interface IProps {
    children?: React.ReactNode;
    isLoading: boolean;
    loaderName?: 'LoaderOne' | 'BubbleLoader';
  }
}
