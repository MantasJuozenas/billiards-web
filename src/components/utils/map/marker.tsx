import { SVGIconMapCircle } from '@styles/global-icons/icons/svg-icon-map-circle';
import { _, media } from '@utilsFn/breakpoint';
import React from 'react';
import styled from 'styled-components';

export const MapMarker = (_props: MapsMarker.IProps) => {
  return (
    <ContainerMapMarker>
      <div className="MapMarker_pointer">
        <SVGIconMapCircle />
      </div>
    </ContainerMapMarker>
  );
};

export namespace MapsMarker {
  export interface IProps {
    lat: number;
    lng: number;
  }
}

const ContainerMapMarker = styled.div`
  position: relative;
  .MapMarker_pointer {
    position: absolute;
    display: flex;
    top: -72px;
    left: -40px;
    //mobile
    ${_(media.max.sm)} {
      top: -52px;
      left: -30px;
      svg {
        width: 50px;
        height: 50px;
      }
    }
  }
`;
