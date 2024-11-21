import { BurgerMenuAdmin } from '@components/layout/components/burger-menu-admin';
import { Logo } from '@components/layout/components/logo';
import React from 'react';
import styled from 'styled-components';

export const DefaultTablet = () => {
  return (
    <ContainerDefaultTablet>
      <div className="DefaultTablet_inner">
        <div className="DefaultTablet_c1">
          <Logo />
        </div>

        <div className="DefaultTablet_c2">
          <div className="DefaultTablet_c2_c2">
            <BurgerMenuAdmin />
          </div>
        </div>
      </div>
    </ContainerDefaultTablet>
  );
};

const ContainerDefaultTablet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .DefaultTablet_inner {
    height: 100%;
    width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--pagePaddingSide);
  }

  .DefaultTablet_c1 {
    //
  }

  .DefaultTablet_c2 {
    display: flex;
    align-items: center;
  }

  .DefaultTablet_c2_c2 {
    display: flex;
  }
`;
