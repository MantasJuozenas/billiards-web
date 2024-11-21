/* eslint-disable react/no-array-index-key */
import { omit } from '@utilsFn/omit';
import React from 'react';

export const Table = (
  props: React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
) => {
  return <table {...omit(props, 'children')}>{props?.children}</table>;
};
