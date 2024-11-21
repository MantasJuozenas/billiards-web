import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { FormAddOrEditReservation } from '@components/modals-and-forms/reservation/add-or-edit-reservation';
import { GoogleReCaptchaProvider } from '@components/utils/hoc/google-re-captcha-provider';
import { _, media } from '@utilsFn/breakpoint';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import React from 'react';
import styled from 'styled-components';

import { AboutUsVideo } from './about-us/components/about-us-video';
import { LandingVideo } from './components/landing-video';

export const PageHome = () => {
  return (
    <ContainerPageHome>
      <div className="PageHome_inner">
        <div className="PageHome_r1">
          {GetRestaurantLocation().isKaunas ? (
            <LandingVideo />
          ) : (
            <AboutUsVideo />
          )}
        </div>

        <div className="PageHome_r2">
          <StylePageDivCenter className="PageHome_r2_inner">
            <div className="PageHome_r2_inner_inner">
              <div className="PageHome_r2_r1">
                <GoogleReCaptchaProvider>
                  <FormAddOrEditReservation />
                </GoogleReCaptchaProvider>
              </div>
            </div>
          </StylePageDivCenter>
        </div>
      </div>
    </ContainerPageHome>
  );
};

const ContainerPageHome = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .PageHome_inner {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    max-height: calc(
      ${({ theme }) => theme?.cssVars?.screenHeight}px - var(--navbarHeight) -
        var(--footerHeight)
    );
  }

  .PageHome_r1 {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .PageHome_r2 {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .PageHome_r2_inner {
    display: flex;
    justify-content: center;
  }

  .PageHome_r2_inner_inner {
    margin: auto 0;
  }

  .PageHome_r2_r1 {
    pointer-events: all;
    margin: 40px 0;
  }

  // mobile
  ${_(media.max.sm)} {
    .PageHome_inner {
      overflow: unset;
      max-height: unset;
    }

    .PageHome_r1 {
      flex: unset;
    }

    .PageHome_r2 {
      position: static;
    }

    .PageHome_r2_inner_inner {
      width: 100%;
    }

    .PageHome_r2_r1 {
      margin: 0;
    }
  }
`;
