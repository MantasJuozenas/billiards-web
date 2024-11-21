import { BurgerMenu } from '@components/layout/components/burger-menu';
import { Logo } from '@components/layout/components/logo';
import { flag_SetCartMenuOpen } from '@store/modules/flags/actions';
import { SVGIconClose3 } from '@styles/global-icons/icons/svg-icon-close-3';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled from 'styled-components';

export const DefaultMobile = () => {
  const dispatch = useDispatch();
  const cartMenuOpen = useSelector((s) => s.flags.cartMenuOpen);

  return (
    <ContainerDefaultMobile>
      <div className="DefaultMobile_inner">
        <div className="DefaultMobile_c1">
          <Logo />
        </div>

        <div className="DefaultMobile_c2">
          <div
            className="DefaultMobile_c2_c2"
            onClick={() => {
              if (cartMenuOpen) dispatch(flag_SetCartMenuOpen(false));
            }}
          >
            {cartMenuOpen ? <SVGIconClose3 /> : <BurgerMenu />}
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
    cursor: pointer;
    display: flex;
  }
`;
