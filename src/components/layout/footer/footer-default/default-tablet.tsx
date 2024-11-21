import { dayjs } from '@utilsFn/dayjs-fn';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import React from 'react';
import styled from 'styled-components';

export const DefaultTablet = () => {
  const contacts = GetCompanyContacts();

  return (
    <ContainerDefaultTablet>
      <div className="DefaultTablet_inner">
        <div className="DefaultTablet_r1">
          Copyright © {dayjs().format('YYYY')} {contacts.contacts.name} -{' '}
          {contacts.contacts.street} {contacts.contacts.houseNumber},{' '}
          {contacts.contacts.city} {contacts.contacts.country} - Tel.{' '}
          {contacts.contacts.phone}
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
    justify-content: center;
    padding: 0 var(--pagePaddingSide);
  }

  .DefaultTablet_r1 {
    font: normal normal medium 16px/19px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }
`;
