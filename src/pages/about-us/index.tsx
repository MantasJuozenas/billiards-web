import { LayoutSSR } from '@components/layout';
import { PageAboutUs } from '@components/pages/about-us';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeAboutUs: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR layoutClassNames={['navBorderBottom']}>
      <PageAboutUs />
    </LayoutSSR>
  );
};

export default HomeAboutUs;

export const getStaticProps = getStaticPropsFactory(['page-about-us']);

HomeAboutUs.defaultProps = { authLevel: 'public' };
