import React from 'react';
import { components, MenuProps } from 'react-select';
import styled from 'styled-components';

const MenuContainer = (props: MenuProps) => {
  return (
    <ContainerMenuContainer>
      <components.Menu {...props} />
    </ContainerMenuContainer>
  );
};

export default MenuContainer;

const ContainerMenuContainer = styled.div``;
