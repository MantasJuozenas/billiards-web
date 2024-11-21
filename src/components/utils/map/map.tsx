import { MAP_API_KEY } from '@constants/app-constants';
import { _, media } from '@utilsFn/breakpoint';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import GoogleMapReact from 'google-map-react';
import React from 'react';
import styled from 'styled-components';

import { MapStyles } from './index';
import { MapMarker } from './marker';

const GoogleMap: React.FC = () => {
  const zoom = 14;
  const MapStyle = MapStyles()?.styles;

  const contacts = GetCompanyContacts();

  const defaultCenter = {
    lat: 54.922_566_099_620_84,
    lng: 23.956_945_014_766_01
  };

  return (
    <ContainerMap>
      <GoogleMapReact
        defaultZoom={zoom}
        bootstrapURLKeys={{ key: MAP_API_KEY }}
        defaultCenter={{
          lat: defaultCenter?.lat,
          lng: defaultCenter?.lng
        }}
        yesIWantToUseGoogleMapApiInternals
        options={{
          fullscreenControl: false,
          zoomControl: false,
          styles: MapStyle
        }}
        draggable
        style={{}}
      >
        <MapMarker
          lat={contacts.contacts.location.lat}
          lng={contacts.contacts.location.lng}
        />
      </GoogleMapReact>
    </ContainerMap>
  );
};

export default GoogleMap;

const ContainerMap = styled.div`
  position: relative;
  opacity: 1;
  width: 522px;
  height: 586px;
  > div > div {
    border-radius: 27px;
    opacity: 1;
  }
  ${_(media.max.sm)} {
    > div > div {
      border-radius: 0;
    }
  }
`;
