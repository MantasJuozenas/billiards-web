import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { CustomForm } from '@components/utils/form';
import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled from 'styled-components';

import { Toast } from './components/toast';

export const FormToast = () => {
  const toast = useSelector((s) => s.modalsAndForms.toast);

  const isToastShown = toast?.openModalType ? 'show_toast' : '';
  // const isToastShown = !toast?.openModalType ? 'show_toast' : '';

  return (
    <ContainerToast id="toast_form" className={isToastShown}>
      {isToastShown &&
        (toast?.compCustomToast || (
          <StylePageDivCenter className="StylePageDivCenter">
            <Toast
              color={toast?.color}
              title={toast?.title}
              msg={toast?.msg || ''}
              width={toast?.width}
            />
          </StylePageDivCenter>
        ))}
    </ContainerToast>
  );
};

const ContainerToast = styled(CustomForm)`
  pointer-events: none;
  position: fixed;
  z-index: 1000;
  bottom: 90px;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  transform: translateY(calc(100% + 20px));
  transition: all 0.1s ease-in 25ms;

  .StylePageDivCenter {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.show_toast {
    transform: translateY(0px);
  }

  // mobile
  ${_(media.max.sm)} {
    top: 0;
    bottom: unset;
  }
`;
