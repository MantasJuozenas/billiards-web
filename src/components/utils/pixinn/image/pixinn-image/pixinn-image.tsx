import React from 'react';

export const PixinnImage = (props: NPixinnImage.IProps) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props?.img} />;
};

export namespace NPixinnImage {
  export type TInput = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

  export interface IProps {
    img: TInput;
  }
}
