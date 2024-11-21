import { _, media } from '@utilsFn/breakpoint';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { LandingVideo } from '../components/landing-video';
import { AboutUsVideo } from './components/about-us-video';

export const PageAboutUs = () => {
  const { t } = useTranslation();
  return (
    <ContainerPageAboutUs>
      <div className="PageAboutUs_inner">
        <div className="PageAboutUs_inner_inner">
          <div className="PageAboutUs_r1">
            <div className="PageAboutUs_description">
              <h1 className="PageAboutUs_title">
                {t('page-about-us:::main::title')}
              </h1>
              <div className="description">
                {t('page-about-us:::main::description1')}
              </div>
              <div className="description">
                {t('page-about-us:::main::description2')}
              </div>
              <div className="description">
                {t('page-about-us:::main::description3')}
              </div>
              <div className="description">
                {t('page-about-us:::main::description4')}
              </div>
              <div>{t('page-about-us:::main::description5')}</div>
            </div>
          </div>
          <div className="PageAboutUs_r2">
            {GetRestaurantLocation().isKaunas ? (
              <AboutUsVideo />
            ) : (
              <LandingVideo />
            )}
          </div>
        </div>
      </div>
    </ContainerPageAboutUs>
  );
};

const ContainerPageAboutUs = styled.div`
  --paddingSide: 11px;
  display: flex;
  flex-direction: column;
  flex: 1;
  .PageAboutUs_inner {
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  .PageAboutUs_inner_inner {
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
  .PageAboutUs_title {
    text-align: left;
    font: normal normal bold 30px/37px Roboto;
    letter-spacing: 0.45px;
    color: ${({ theme }) => theme.colors.whiteFFF};
    opacity: 1;
    margin: 0 0 20px 0;
  }
  .PageAboutUs_description {
    text-align: left;
    font: normal normal normal 16px/19px Roboto;
    letter-spacing: 0px;
    color: ${({ theme }) => theme.colors.whiteFFF};
    opacity: 1;
    max-width: 700px;
    margin: 0;
  }
  .PageAboutUs_r1 {
    max-width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    width: 100%;
    padding: 45px var(--pagePaddingSide);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .PageAboutUs_r2 {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .PageAboutUs_inner {
    margin: 0 auto;
    margin-top: 0px;
  }
  .description {
    padding-bottom: 10px;
  }
  //mobile
  .PageAboutUs_inner {
  }
  ${_(media.max.sm)} {
    .PageAboutUs_r1 {
      padding: 35px var(--pagePaddingSide) 51px var(--pagePaddingSide);
    }
    .PageAboutUs_title {
      letter-spacing: 0.45px;
      margin: 0 0 30px 0;
      font: normal normal bold 20px/24px Roboto;
    }
    .PageAboutUs_description {
      text-align: left;
      font: normal normal normal 15px/18px Roboto;
      letter-spacing: 0px;
      color: ${({ theme }) => theme.colors.whiteFFF};
      opacity: 1;
      max-width: 700px;
      margin: 0;
    }
  }
`;
