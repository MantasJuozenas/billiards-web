import { flag_setNavbarSidePanelCollapsed } from '@store/modules/flags/actions';
import { SVGIconArrowLeft } from '@styles/global-icons/icons/svg-icon-arrow-left';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { joinClasses } from '@utilsFn/join-classes';
import React from 'react';
import styled from 'styled-components';

import { NavbarSidePanelLinks } from '../../components/navbar-side-panel-links';

export const DefaultDesktop = () => {
  const dispatch = useDispatch();
  /* eslint-disable prettier/prettier */
  const navbarSidePanelCollapsed = useSelector(s => s.flags.navbarSidePanelCollapsed);
  /* eslint-enable prettier/prettier */

  const handlerOnClickCollapseNavbarSidePanel = () => {
    dispatch(flag_setNavbarSidePanelCollapsed(!navbarSidePanelCollapsed));
  };

  return (
    <ContainerDefaultDesktop>
      <div className="DefaultDesktop_r1">
        <NavbarSidePanelLinks />
      </div>

      <div className="DefaultDesktop_r2">
        <div className="DefaultDesktop_r2_r1">
          <div
            className={joinClasses(
              `DefaultDesktop_r2_r1_SVGIconArrowLeft`,
              navbarSidePanelCollapsed ? 'closed' : ''
            )}
            onClick={() => {
              handlerOnClickCollapseNavbarSidePanel();
            }}
          >
            <SVGIconArrowLeft />
          </div>
        </div>
      </div>
    </ContainerDefaultDesktop>
  );
};

const ContainerDefaultDesktop = styled.div`
  width: 100%;
  border-right: 1px solid;

  display: flex;
  flex-direction: column;
  flex: 1;

  .DefaultDesktop_r1 {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .DefaultDesktop_r2 {
    display: flex;
  }

  .DefaultDesktop_r2_r1 {
    cursor: pointer;
    padding: 14px;
    margin-left: auto;

    .DefaultDesktop_r2_r1_SVGIconArrowLeft {
      width: 36px;
      min-width: 36px;
      max-width: 36px;
      height: 36px;
      min-height: 36px;
      max-height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &.closed {
        transform: rotate(180deg);
      }

      :hover {
        background-color: #e9eced;
      }

      :active {
        background-color: #e1e4e5;
      }
    }
  }
`;
