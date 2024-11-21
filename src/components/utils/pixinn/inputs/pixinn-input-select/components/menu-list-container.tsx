import React from 'react';
import { components } from 'react-select';
import styled from 'styled-components';

const MenuListContainer = (props: any) => {
  return (
    <ContainerMenuListContainer {...props}>
      {/* {props?.selectProps?.customMenuListTopItem} */}
      {props?.children}
      {/* {props?.selectProps?.customMenuListBottomItem} */}
    </ContainerMenuListContainer>
  );
};

export default MenuListContainer;

const ContainerMenuListContainer = styled(components.MenuList)``;
