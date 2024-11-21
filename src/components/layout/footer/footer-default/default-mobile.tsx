import { dayjs } from '@utilsFn/dayjs-fn';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import React from 'react';
import styled from 'styled-components';

export const DefaultMobile = () => {
  const contacts = GetCompanyContacts();

  return (
    <ContainerDefaultMobile>
      <div className="DefaultTablet_inner">
        <div className="DefaultTablet_r1">
          Copyright © {dayjs().format('YYYY')} {contacts.contacts.name} -{' '}
          {contacts.contacts.street} {contacts.contacts.houseNumber},{' '}
          {contacts.contacts.city} {contacts.contacts.country} - Tel.{' '}
          {contacts.contacts.phone}
        </div>
      </div>
    </ContainerDefaultMobile>
  );
};

const ContainerDefaultMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .DefaultTablet_inner {
    height: 100%;
    width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    max-width: 100%;
    display: flex;
    align-items: center;
    padding: 0 var(--pagePaddingSide);
  }

  .DefaultTablet_r1 {
    width: 291px;

    font: normal normal medium 15px/25px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }
`;
