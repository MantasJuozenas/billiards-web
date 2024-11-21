import { PixinnImage } from '@components/utils/pixinn/image/pixinn-image/pixinn-image';
import { _, media } from '@utilsFn/breakpoint';
// import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const PageEsSupport = () => {
  const { t } = useTranslation();
  return (
    <ContainerPageEsSupport>
      <div className="PageEsSupport_inner">
        <div className="PageEsSupport_inner_inner">
          <div className="PageEsSupport_r1">
            <div className="PageEsSupport_es_img">
              <PixinnImage
                img={{
                  src: '/img/ES.jpg',
                  alt: 'ES'
                }}
              />
            </div>
            <div className="PageEsSupport_description">
              <h1 className="PageEsSupport_title">
                {t('page-es-support:::main::title')}
              </h1>
              <div className="description">
                {t('page-es-support:::main::description1')}
              </div>
              <div className="description">
                {t('page-es-support:::main::description2')}
              </div>
              <div className="description">
                {t('page-es-support:::main::description3')}
              </div>
              <div className="description">
                {t('page-es-support:::main::description4')}
              </div>
              <div>{t('page-es-support:::main::description5')}</div>
            </div>
            <div className="PageEsSupport_description">
              <h1 className="PageEsSupport_title">
                {t('page-es-support:::main::title-2')}
              </h1>
              <div className="description">
                {t('page-es-support:::main::description1-2')}
              </div>
              <div className="description">
                {t('page-es-support:::main::description2-2')}
              </div>
              <div className="description">
                {t('page-es-support:::main::description3-2')}
              </div>
              <div className="description">
                {t('page-es-support:::main::description4-2')}
              </div>
              <div>{t('page-es-support:::main::description5-2')}</div>
            </div>
          </div>
        </div>
      </div>
    </ContainerPageEsSupport>
  );
};

const ContainerPageEsSupport = styled.div`
  --paddingSide: 11px;
  display: flex;
  flex-direction: column;
  flex: 1;
  .PageEsSupport_inner {
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  .PageEsSupport_inner_inner {
    height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
  .PageEsSupport_title {
    text-align: left;
    font: normal normal bold 30px/37px Roboto;
    letter-spacing: 0.45px;
    color: ${({ theme }) => theme.colors.whiteFFF};
    opacity: 1;
    margin: 0 0 20px 0;
  }
  .PageEsSupport_description {
    text-align: left;
    font: normal normal normal 16px/19px Roboto;
    letter-spacing: 0px;
    color: ${({ theme }) => theme.colors.whiteFFF};
    opacity: 1;
    max-width: 700px;
    margin: 0;
    :last-child {
      .PageEsSupport_title {
        margin-top: 45px;
      }
    }
  }
  .PageEsSupport_r1 {
    max-width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    width: 100%;
    padding: 45px var(--pagePaddingSide);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .PageEsSupport_r2 {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .PageEsSupport_inner {
    margin: 0 auto;
    margin-top: 0px;
  }
  .description {
    padding-bottom: 10px;
  }
  .PageEsSupport_es_img {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 45px;
    > img {
      max-width: 350px;
    }
  }
  //mobile
  .PageEsSupport_inner {
  }
  ${_(media.max.sm)} {
    .PageEsSupport_r1 {
      padding: 35px var(--pagePaddingSide) 51px var(--pagePaddingSide);
    }
    .PageEsSupport_title {
      letter-spacing: 0.45px;
      margin: 0 0 30px 0;
      font: normal normal bold 20px/24px Roboto;
    }
    .PageEsSupport_description {
      text-align: left;
      font: normal normal normal 15px/18px Roboto;
      letter-spacing: 0px;
      color: ${({ theme }) => theme.colors.whiteFFF};
      opacity: 1;
      max-width: 700px;
      margin: 0;
    }
    .PageEsSupport_es_img {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 35px;
      > img {
        max-width: 100%;
      }
    }
  }
`;
