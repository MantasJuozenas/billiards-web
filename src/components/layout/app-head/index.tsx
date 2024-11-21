/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/no-array-index-key */
// import { MAP_API_KEY } from '@constants/app-constants';
import { CITY } from '@constants/app-constants';
import { ELocation } from '@typings/graphql/enum-schema';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { fontsRobotoLinks } from './components/fonts-links';
import { PageSeo } from './components/page-seo';

const customPageSeoRoutesArr: string[] = [''];

export const AppHead = () => {
  const router = useRouter();

  const fontsLinksArr = [];

  fontsLinksArr?.push(
    ...fontsRobotoLinks
    // ...fontsOpenSansLinks,
  );

  let showDefaultPageSeo = true;

  // eslint-disable-next-line prettier/prettier
  if (customPageSeoRoutesArr?.includes(router?.pathname)) showDefaultPageSeo = false;

  return (
    <>
      <Head>
        {fontsLinksArr?.map((font, index) => {
          return (
            <link
              key={index}
              rel="preload"
              href={font?.from}
              as="font"
              crossOrigin=""
            />
          );
        })}

        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, user-scalable=no"
        />

        <link
          rel="canonical"
          href={
            CITY === ELocation.Kaunas
              ? 'https://arenabilliards.lt/'
              : 'https://dartsbilliards.lt'
          }
          crossOrigin="use-credentials"
        />

        {/* <script
          src={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${MAP_API_KEY}`}
        /> */}
      </Head>

      {showDefaultPageSeo ? <PageSeo /> : null}
    </>
  );
};
