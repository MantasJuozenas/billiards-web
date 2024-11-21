import { BurgerMenuAdmin } from '@components/layout/components/burger-menu-admin';
import { Logo } from '@components/layout/components/logo';
import React from 'react';
import styled from 'styled-components';

export const DefaultMobile = () => {
  return (
    <ContainerDefaultMobile>
      <div className="DefaultMobile_inner">
        <div className="DefaultMobile_c1">
          <Logo />
        </div>

        <div className="DefaultMobile_c2">
          <div className="DefaultMobile_c2_c2">
            <BurgerMenuAdmin />
          </div>
        </div>
      </div>
    </ContainerDefaultMobile>
  );
};

const ContainerDefaultMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .DefaultMobile_inner {
    height: 100%;
    width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--pagePaddingSide);
  }

  .DefaultMobile_c1 {
    //
  }

  .DefaultMobile_c2 {
    display: flex;
    align-items: center;
  }

  .DefaultMobile_c2_c2 {
    display: flex;
  }
`;
