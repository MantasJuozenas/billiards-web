import { GoogleMap } from '@components/utils/map';
import { SVGIconCall } from '@styles/global-icons/icons/svg-icon-call';
import { SVGIconEmail } from '@styles/global-icons/icons/svg-icon-email';
import { SVGIconMap } from '@styles/global-icons/icons/svg-icon-map';
import { _, media } from '@utilsFn/breakpoint';
import { GetCompanyContacts } from '@utilsFn/get-restaurant-data';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const PageContacts = () => {
  const { t } = useTranslation();

  const contacts = GetCompanyContacts();

  const contactData = [
    {
      logo: <SVGIconMap />,
      title: (
        <div className="contacts">
          <p>{t('page-contacts:::Contacts::text1')}</p>
        </div>
      ),
      description: (
        <div>
          {`${contacts.contacts.street} ${contacts.contacts.houseNumber} ${contacts.contacts.city}, ${contacts.contacts.country}`}
        </div>
      )
    },
    {
      logo: <SVGIconCall />,
      title: (
        <div className="contacts">
          <p>{t('page-contacts:::Contacts::text2')}</p>
        </div>
      ),
      description: (
        <div className="contacts_phone">
          <Link href={`tel:${contacts.contacts.phone}`}>
            {contacts.contacts.phone}
          </Link>
        </div>
      )
      // description: <div>{contacts.contacts.phone}</div>
    },
    {
      logo: <SVGIconEmail />,
      title: (
        <div className="contacts">
          <p>{t('page-contacts:::Contacts::text3')}</p>
        </div>
      ),
      description: <div>{contacts.contacts.email}</div>
    }
  ];

  return (
    <ContainerPageContacts>
      <div className="PageContacts_inner">
        <div className="BigContainer">
          <div className="PageContacts_c1">
            <GoogleMap />
            <div className="ContactsHeight" />
          </div>

          <div className="PageContacts_c2">
            <div className="PageContacts_c2_r1">
              {t('page-contacts:::Contacts::text4')}
            </div>

            <div className="PageContacts_c2_r2">
              {contactData?.map?.((item, i) => {
                return (
                  <div key={i} className="PageContacts_c2_r2_item">
                    <div className="">{item?.logo}</div>

                    <div className="PageContacts_c2_r2_item_title">
                      {item?.title}
                    </div>

                    <div className="PageContacts_c2_r2_item_description">
                      {item?.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ContainerPageContacts>
  );
};

const ContainerPageContacts = styled.div`
  --paddingSide: 130px;

  .PageContacts_inner {
    background-color: ${({ theme }) => theme.colors.black000};
    height: 100%;
    width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    max-width: 100%;
    padding: 0 var(--pagePaddingSide);
    display: flex;
    margin: 0 auto;
    margin-top: 46px;

    .BigContainer {
      width: 100%;
      max-width: 100%;
      display: flex;
      position: relative;
    }
    .ContactsHeight {
      display: none;
    }
    .PageContacts_c2 {
      display: flex;
      flex-direction: column;
    }
    .PageContacts_c2_r2 {
      margin-left: 40px;
    }
    .PageContacts_c2_r1 {
      margin-left: 40px;
      margin-top: 36px;
      font-family: Roboto;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 1.5px;
      color: ${({ theme }) => theme.colors.whiteFFF};
      opacity: 1;
      margin-bottom: 11px;
      line-height: 37px;
    }
    .PageContacts_c2_r2_item {
      margin-top: 60px;
      width: 204px;
    }
    .PageContacts_c2_r2_item_title {
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.8px;
      color: ${({ theme }) => theme.colors.whiteFFF};
      opacity: 1;
      margin-top: 15px;
    }
    .PageContacts_c2_r2_item_description {
      font-family: Roboto;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.8px;
      color: ${({ theme }) => theme.colors.greyA9A};
      opacity: 1;
      margin-top: 15px;
      width: 200px;
    }
    .contacts {
      font-family: Roboto;
    }

    .contacts_phone {
      a {
        font-family: Roboto;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.8px;
        color: ${({ theme }) => theme.colors.greyA9A};
        opacity: 1;
        margin-top: 15px;
        width: 200px;
      }
    }
    //tablet
    ${_(media.max.tablet)} {
      --paddingSide: 40px;
      padding: 0px var(--paddingSide);
    }
    .PageContacts_inner {
      margin: 0 auto;
      margin-top: 0px;
      padding: 0 var(--pagePaddingSide);
    }
    .PageContacts_c2_r2,
    .PageContacts_c2_r1 {
      ${_(media.max.custom(800))} {
        margin-left: 20px;
      }
    }
    //mobile
    ${_(media.max.sm)} {
      --paddingSide: 0px;
      padding: 40px var(--paddingSide);
      padding-top: 0px;
      background-color: ${({ theme }) => theme.colors.black000};

      .PageContacts_c1 {
        width: 100%;
        opacity: 1;
        height: fit-content;
        > div {
          width: 100%;
        }
      }
      .PageContacts_c2_r1 {
        display: none;
      }
      .PageContacts_c2_r2 {
        margin-left: 15px;
      }
      .PageContacts_c2_r2_item {
        margin-top: 50px;
      }
      .PageContacts_c2 {
        margin-left: 0px;
        position: absolute;
        margin-top: 308px;
        background: transparent
          linear-gradient(
            180deg,
            ${({ theme }) => theme.colors.black0000} 0%,
            ${({ theme }) => theme.colors.black070} 28%,
            ${({ theme }) => theme.colors.black000} 53%,
            ${({ theme }) => theme.colors.black000} 100%
          )
          0% 0% no-repeat padding-box;
        width: 100%;
      }
      .ContactsHeight {
        height: 180px;
        width: 100%;
        display: block;
        flex-direction: column;
      }
      .PageContacts_inner {
        padding-top: 0px;
        height: fit-content;
      }
    }
  }
`;
