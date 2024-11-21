import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const Contact = () => {
  const { t } = useTranslation();
  const companyContacts = GetCompanyContacts();

  return (
    <ContainerContact>
      <div className="Contact_r1">{t('navbar:::Contact::text1')}</div>

      <div className="Contact_r2">
        <Link href={`tel:${companyContacts?.contacts?.phone}`}>
          {companyContacts?.contacts?.phone}
        </Link>
      </div>
    </ContainerContact>
  );
};

const ContainerContact = styled.div`
  display: flex;
  flex-direction: column;

  .Contact_r1 {
    margin-bottom: 7px;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0px;
    color: #a9a9a9;
  }

  .Contact_r2 {
    a {
      font: normal normal medium 16px/19px Roboto;
      letter-spacing: 0.32px;
      color: #ffffff;
    }
  }
`;
