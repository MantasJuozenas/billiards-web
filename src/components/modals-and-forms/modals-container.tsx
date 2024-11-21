/* eslint-disable react/no-array-index-key */
import React from 'react';

import { ModalInsertUpdateBlockedTime } from './add-or-edit-blocked-time';
import { ModalConfirmation } from './confirmation';
import { ModalLogin } from './login';
import { ModalViewMenuItem } from './menu-item/view-menu-item';

type Modals = Array<React.ComponentType<any>>;

const modals: Modals = [
  ModalLogin,
  ModalInsertUpdateBlockedTime,
  ModalViewMenuItem,
  ModalConfirmation
];

export const ModalsContainer = () => {
  return (
    <>
      {modals?.map((Modal, index) => (
        <Modal key={index} />
      ))}
    </>
  );
};
