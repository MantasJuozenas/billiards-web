import { setToastData } from '@store/modules/modals-and-forms/actions';
import { SVGIconAlert } from '@styles/global-icons/icons/svg-icon-alert';
import { SVGIconClose3 } from '@styles/global-icons/icons/svg-icon-close-3';
import { SVGIconError } from '@styles/global-icons/icons/svg-icon-error';
import { SVGIconNotification } from '@styles/global-icons/icons/svg-icon-notification';
import { SVGIconOk } from '@styles/global-icons/icons/svg-icon-ok';
import { _, media } from '@utilsFn/breakpoint';
import { joinClasses } from '@utilsFn/join-classes';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

export const Toast = (props: NToast.IProps) => {
  const { title = '', msg = '', color = 'blue' } = props;

  const dispatch = useDispatch();

  let svg = <SVGIconOk />;
  if (color === 'red') svg = <SVGIconError />;
  if (color === 'yellow') svg = <SVGIconAlert />;
  if (color === 'blue') svg = <SVGIconNotification />;

  const classNames = [color];

  return (
    <ContainerToast width={props?.width}>
      <div className={joinClasses('Toast_inner', ...classNames)}>
        <div className="Toast_c1">{svg}</div>

        <div className="Toast_c2">
          {title ? <div className="Toast_c2_r1">{title}</div> : null}

          {msg ? <div className="Toast_c2_r2">{msg}</div> : null}
        </div>

        <div className="Toast_c3">
          <div
            className="Toast_c3_r1"
            onClick={() => {
              dispatch(setToastData({ openModalType: null }));
            }}
          >
            <SVGIconClose3 />
          </div>
        </div>
      </div>
    </ContainerToast>
  );
};

export namespace NToast {
  export interface IProps {
    color?: 'green' | 'red' | 'yellow' | 'blue';
    title?: string;
    msg: string;
    width?: G.IStore['modalsAndForms']['toast']['width'];
  }

  export interface IStyle {
    width?: IProps['width'];
  }
}

const ContainerToast = styled.div<NToast.IStyle>`
  pointer-events: all;
  position: relative;
  display: flex;
  /* margin-right: 20px; */
  margin-left: auto;

  .Toast_inner {
    display: flex;
    padding: 35px 40px;
    border-radius: 5px;

    ${({ width }) => {
      if (width && typeof width === 'string') {
        return css`
          width: ${width};
        `;
      }
      if (width && typeof width === 'number') {
        return css`
          width: ${width}px;
        `;
      }
      if (width === 0) return;

      return css`
        width: 350px;
      `;
    }}
    max-width: calc(100vw - 40px);

    &.green {
      background-color: #e4ffdd;

      .Toast_c2_r1,
      .Toast_c2_r2 {
        color: #1c8c00;
      }
    }

    &.red {
      background-color: #fff2f2;

      .Toast_c2_r1,
      .Toast_c2_r2 {
        color: #ff0000;
      }
    }

    &.yellow {
      background-color: #fffadf;

      .Toast_c2_r1,
      .Toast_c2_r2 {
        color: #ceac00;
      }
    }

    &.blue {
      background-color: #ffffff;
      /* background-color: #f0f8ff; */

      .Toast_c2_r1,
      .Toast_c2_r2 {
        /* color: #1d398d; */
      }
    }
  }

  .Toast_c1 {
    margin-right: 15px;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  .Toast_c2 {
    margin-right: 15px;
  }

  .Toast_c2_r1 {
    margin-top: 4px;
    margin-bottom: 4px;

    font: normal normal bold 20px/30px Roboto;
    letter-spacing: -0.32px;
    color: #352641;
  }

  .Toast_c2_r2 {
    font: normal normal normal 14px/17px Roboto;
    letter-spacing: -0.22px;
    color: #352641;
  }

  .Toast_c3 {
    margin-left: auto;
  }

  .Toast_c3_r1 {
    cursor: pointer;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  // mobile
  ${_(media.max.sm)} {
    width: 100%;

    .Toast_inner {
      width: 100%;
      max-width: 100%;
      padding: 15px 20px;
      border-radius: 0;
    }
  }
`;

// import { setToastData } from '@store/modules/modals-and-forms/actions';
// import { SVGIconAlert } from '@styles/global-icons/icons/svg-icon-alert';
// import { SVGIconClose } from '@styles/global-icons/icons/svg-icon-close';
// import { SVGIconError } from '@styles/global-icons/icons/svg-icon-error';
// import { SVGIconInformation } from '@styles/global-icons/icons/svg-icon-information';
// import { SVGIconOk } from '@styles/global-icons/icons/svg-icon-ok';
// import { joinClasses } from '@utilsFn/join-classes';
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import styled, { css } from 'styled-components';

// export const Toast = (props: NToast.IProps) => {
//   const { title = '', msg = '', color = 'blue' } = props;

//   const dispatch = useDispatch();

//   let svg = <SVGIconOk />;
//   if (color === 'red') svg = <SVGIconError />;
//   if (color === 'yellow') svg = <SVGIconAlert />;
//   if (color === 'blue') svg = <SVGIconInformation />;

//   const classNames = [color];

//   return (
//     <ContainerToast width={props?.width}>
//       <div className={joinClasses('Toast_inner', ...classNames)}>
//         <div className="Toast_c1">{svg}</div>

//         <div className="Toast_c2">
//           {title ? <div className="Toast_c2_r1">Title</div> : null}

//           {msg ? <div className="Toast_c2_r2">Desc</div> : null}
//         </div>

//         <div className="Toast_c3">
//           <div
//             className="Toast_c3_r1"
//             onClick={() => {
//               dispatch(setToastData({ openModalType: null }));
//             }}
//           >
//             <SVGIconClose />
//           </div>
//         </div>
//       </div>
//     </ContainerToast>
//   );
// };

// export namespace NToast {
//   export interface IProps {
//     color?: 'green' | 'red' | 'yellow' | 'blue';
//     title?: string;
//     msg: string;
//     width?: G.IStore['modalsAndForms']['toast']['width'];
//   }

//   export interface IStyle {
//     width?: IProps['width'];
//   }
// }

// const ContainerToast = styled.div<NToast.IStyle>`
//   pointer-events: all;
//   position: relative;
//   display: flex;
//   /* margin-right: 20px; */
//   margin-left: auto;

//   .Toast_inner {
//     display: flex;
//     padding: 15px;
//     border-radius: 5px;

//     ${({ width }) => {
//       if (width && typeof width === 'string') {
//         return css`
//           width: ${width};
//         `;
//       }
//       if (width && typeof width === 'number') {
//         return css`
//           width: ${width}px;
//         `;
//       }
//       if (width === 0) return;

//       return css`
//         width: 345px;
//       `;
//     }}
//     max-width: calc(100vw - 40px);

//     &.green {
//       background-color: #e4ffdd;

//       .Toast_c2_r1,
//       .Toast_c2_r2 {
//         color: #1c8c00;
//       }
//     }

//     &.red {
//       background-color: #fff2f2;

//       .Toast_c2_r1,
//       .Toast_c2_r2 {
//         color: #ff0000;
//       }
//     }

//     &.yellow {
//       background-color: #fffadf;

//       .Toast_c2_r1,
//       .Toast_c2_r2 {
//         color: #ceac00;
//       }
//     }

//     &.blue {
//       background-color: #f0f8ff;

//       .Toast_c2_r1,
//       .Toast_c2_r2 {
//         color: #1d398d;
//       }
//     }
//   }

//   .Toast_c1 {
//     margin-right: 10px;

//     svg {
//       width: 21px;
//       height: 21px;
//     }
//   }

//   .Toast_c2 {
//     margin-right: 45px;
//   }

//   .Toast_c2_r1 {
//     margin-bottom: 3px;

//     font: normal normal 600 16px/21px Open sans;
//     letter-spacing: 0px;
//     color: black;
//   }

//   .Toast_c2_r2 {
//     font: normal normal 400 16px/21px Open sans;
//     letter-spacing: 0px;
//   }

//   .Toast_c3 {
//     margin-left: auto;
//   }

//   .Toast_c3_r1 {
//     cursor: pointer;
//     display: flex;
//   }
// `;
