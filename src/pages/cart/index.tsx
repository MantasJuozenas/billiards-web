import { LayoutSSR } from '@components/layout';
import { PageCart } from '@components/pages/cart';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeCart: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR layoutClassNames={['navBorderBottom']}>
      <PageCart />
    </LayoutSSR>
  );
};

export default HomeCart;

export const getStaticProps = getStaticPropsFactory(['page-cart']);

HomeCart.defaultProps = { authLevel: 'public' };
