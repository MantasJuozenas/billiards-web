import { CustomModal } from '@components/utils/pixinn/custom-modal';
import { SetMenuItemData } from '@store/modules/modals-and-forms/actions';
import { SVGIconClose3 } from '@styles/global-icons/icons/svg-icon-close-3';
import { med } from '@utilsFn/breakpoint';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import { FormViewMenuItem } from '.';

const CustomHeader = (props: { title: React.ReactNode }) => {
  const dispatch = useDispatch();

  const handlerCloseModal = () => {
    dispatch(SetMenuItemData({ openModalType: null }));
  };

  return (
    <ContainerCustomHeader>
      <p>{props?.title || ''}</p>

      <div
        onClick={() => {
          handlerCloseModal();
        }}
      >
        <SVGIconClose3 />
      </div>
    </ContainerCustomHeader>
  );
};

const ContainerCustomHeader = styled.div`
  --sidePadding: 30px;

  width: 450px;
  max-width: 100%;

  display: flex;

  padding: 0 var(--sidePadding);
  padding-top: 39px;
  padding-bottom: 15px;

  p {
    margin: 0;
    margin-right: 20px;
    padding-top: 4px;

    font: normal normal 500 25px/32px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  div {
    cursor: pointer;

    min-width: 40px;
    width: 40px;
    min-height: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: auto;

    border-radius: 50%;
    background-color: #292929;
  }

  /** mobile */
  ${med.max.sm} {
    --sidePadding: 15px;

    width: 100%;

    padding-top: 18px;
    padding-bottom: 20px;

    p {
      padding-top: 0;

      font: normal normal 500 22px/32px Roboto;
    }

    div {
      min-width: 17px;
      width: 17px;
      min-height: 32px;
      height: 32px;

      background-color: inherit;

      svg {
        path {
          fill: #ffffff;
          stroke: #ffffff;
        }
      }
    }
  }
`;

export const ModalViewMenuItem = () => {
  const { cssVars } = useTheme();

  const dispatch = useDispatch();
  const isMobile = useSelector((s) => s.device.isMobile);
  const products = useSelector((s) => s.menu.menuList.products);
  const menuItem = useSelector((s) => s.modalsAndForms.menuItem);

  const product =
    products?.[menuItem?.productId || '']?.ikos_product_json?.product;
  const productName = product?.name || '';

  return (
    <CustomModal
      customHeader={<CustomHeader title={productName} />}
      isOpen={!!menuItem?.openModalType}
      onReqClose={() => dispatch(SetMenuItemData({ openModalType: null }))}
      modalType="stickyHeaderAndFooter"
      requiredIdOne="FormViewMenuItem"
      classNameButtonsDiv="__Modal_Buttons_Div__"
      isModalMobile={isMobile}
      modalMarginTop={cssVars?.navbarHeight}
      style={{
        overlay: {
          zIndex: menuItem?.modalZIndex || 1100,
          ...menuItem?.styleOverlay
        },
        content: { ...menuItem?.styleContent }
      }}
    >
      <FormViewMenuItem />
    </CustomModal>
  );
};
