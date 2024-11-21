/* eslint-disable sonarjs/no-duplicate-string */
import { DEV_URL, IS_PROD } from '@constants/app-constants';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export const SEOMetaDefault: G.ISEOMetaDefault = {
  imgSize: `500`,
  metaTitle: `Pixinn`,
  metaDescription: `Pixinn`,
  metaImage: `/img/seo/`,
  ogTitle: `Pixinn`,
  ogDescription: `Pixinn`,
  ogType: `website`,
  ogUrl: IS_PROD ? '' : DEV_URL,
  ogSiteName: `Pixinn`,
  ogImage: `/img/seo/`,
  ogImageWidth: `1200`,
  ogImageHeight: `630`
};

export const PageSeo = (props: G.ISEOMetaDefault) => {
  // const { metaTitle: mTitle } = tStrings.default;
  // const { ogTitle: oTitle } = tStrings.default;
  // const { metaDescription: mDescription } = tStrings.default;
  // const { ogDescription: oDescription } = tStrings.default;

  const isKaunas = GetRestaurantLocation()?.isKaunas;

  const {
    metaTitle = isKaunas ? 'Arena Billiards' : 'Darts Billiards',
    metaDescription = isKaunas ? 'Arena Billiards' : 'Darts Billiards',
    metaImage = '',
    ogTitle = isKaunas ? 'Arena Billiards' : 'Darts Billiards',
    ogDescription = isKaunas ? 'Arena Billiards' : 'Darts Billiards',
    ogType = SEOMetaDefault.ogType,
    ogUrl = SEOMetaDefault.ogUrl,
    ogSiteName = isKaunas ? 'arenabilliards.lt' : 'dartsbilliards.lt',
    ogImage = SEOMetaDefault.ogImage,
    ogImageWidth = SEOMetaDefault.ogImageWidth,
    ogImageHeight = SEOMetaDefault.ogImageHeight
  } = props;

  const router = useRouter();

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="image" content={metaImage} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${ogUrl}${router?.asPath}`} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
    </Head>
  );
};
