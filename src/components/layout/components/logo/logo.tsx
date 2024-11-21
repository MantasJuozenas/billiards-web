import { buildPath, routes } from '@constants/routes';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import { useSelector } from '@utilsFn/hooks/use-selector';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export const Logo = () => {
  const isAdministrator = useSelector((s) => s.auth.isAdministrator);

  const companyContacts = GetCompanyContacts();

  return (
    <Link
      href={
        isAdministrator
          ? buildPath(routes['admin/time-blocking'])
          : buildPath(routes.home)
      }
    >
      <ContainerLogo>{companyContacts.contacts.name}</ContainerLogo>
    </Link>
  );
};

const ContainerLogo = styled.span`
  font: normal normal 700 20px/24px Roboto;
  letter-spacing: 0.4px;
  color: #ffffff;
`;
