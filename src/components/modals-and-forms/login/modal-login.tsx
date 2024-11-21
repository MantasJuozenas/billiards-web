import { CustomModal } from '@components/utils/pixinn/custom-modal';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';

import { FormLogin } from './form-login';

export const ModalLogin = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((s) => s.device.isMobile);
  const login = useSelector((s) => s.modalsAndForms.login);

  return (
    <CustomModal
      showCloseBtn
      isOpen={!!login?.openModalType}
      onReqClose={() => dispatch(setLoginData({ openModalType: null }))}
      modalType="stickyHeader"
      requiredIdOne="FormLogin"
      classNameButtonsDiv="__Modal_Buttons_Div__"
      isModalFullscreen={isMobile}
      style={{
        overlay: {
          zIndex: login?.modalZIndex || 1100,
          ...login?.styleOverlay
        },
        content: { ...login?.styleContent }
      }}
    >
      <FormLogin />
    </CustomModal>
  );
};
