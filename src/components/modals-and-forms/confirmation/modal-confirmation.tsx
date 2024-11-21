import { CustomModal } from '@components/utils/pixinn/custom-modal';
import { setConfirmationData } from '@store/modules/modals-and-forms/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { omit } from '@utilsFn/omit';
import React from 'react';

import { FormConfirmation } from './form-confirmation';

export const ModalConfirmation = () => {
  const dispatch = useDispatch();
  const confirmation = useSelector((s) => s.modalsAndForms.confirmation);
  const isMobile = useSelector((s) => s.device.isMobile);

  return (
    <CustomModal
      isOpen={!!confirmation.openModalType}
      onReqClose={() => {
        dispatch(
          setConfirmationData({
            openModalType: null
          })
        );
      }}
      title={confirmation.modalTitle}
      modalType="stickyHeaderAndFooter"
      requiredIdOne="FormConfirmation"
      customHeader={<div />}
      classNameButtonsDiv="__Modal_Buttons_Div__"
      isModalResizable={false}
      isModalMoveable={false}
      isModalFullscreen={isMobile}
      isModalMobile={isMobile}
      style={{
        overlay: {
          zIndex: confirmation.modalZIndex || 1100,
          ...confirmation.styleOverlay
        },
        content: { ...confirmation.styleContent }
      }}
      {...(omit(confirmation, 'component') as any)}
    >
      <FormConfirmation />
    </CustomModal>
  );
};
