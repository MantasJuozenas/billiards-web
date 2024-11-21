import { LayoutSSR } from '@components/layout';
import { PageOrderSuccess } from '@components/pages/order-success';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeOrderSuccess: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR>
      <PageOrderSuccess />
    </LayoutSSR>
  );
};

export default HomeOrderSuccess;

export const getStaticProps = getStaticPropsFactory(['page-order-success']);

HomeOrderSuccess.defaultProps = { authLevel: 'public' };
