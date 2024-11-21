/* eslint-disable max-len */
import React from 'react';

export const SVGIconInfo = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      {...props}
    >
      <path
        id="circle-info-solid"
        d="M11,0A11,11,0,1,0,22,11,11,11,0,0,0,11,0Zm0,5.5A1.375,1.375,0,1,1,9.625,6.875,1.375,1.375,0,0,1,11,5.5Zm1.719,11H9.281a1.031,1.031,0,0,1,0-2.062h.688v-2.75H9.625a1.031,1.031,0,0,1,0-2.062H11a1.032,1.032,0,0,1,1.031,1.031v3.781h.688a1.031,1.031,0,0,1,0,2.063Z"
        fill="#a9a9a9"
      />
    </svg>
  );
};
