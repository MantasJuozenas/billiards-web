import { CustomModal } from '@components/utils/pixinn/custom-modal';
import { setBlockedTimeData } from '@store/modules/modals-and-forms/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';

import { FormInsertUpdateBlockedTime } from '.';

export const ModalInsertUpdateBlockedTime = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((s) => s.device.isMobile);
  const blockedTime = useSelector((s) => s.modalsAndForms.blockedTime);

  return (
    <CustomModal
      isOpen={!!blockedTime?.openModalType}
      onReqClose={() => dispatch(setBlockedTimeData({ openModalType: null }))}
      shouldCloseOnOverlayClick
      modalType="stickyHeader"
      requiredIdOne="FormInsertUpdateBlockedTime"
      classNameButtonsDiv="__Modal_Buttons_Div__"
      isModalFullscreen={isMobile}
      isModalMobile={isMobile}
      isModalMoveable={false}
      isModalResizeable={false}
      style={{
        overlay: {
          zIndex: blockedTime?.modalZIndex || 1100,
          ...blockedTime?.styleOverlay
        },
        content: { ...blockedTime?.styleContent }
      }}
    >
      <FormInsertUpdateBlockedTime />
    </CustomModal>
  );
};
