import { LayoutSSR } from '@components/layout';
import { PageMenu } from '@components/pages/menu';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeMenu: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR>
      <PageMenu />
    </LayoutSSR>
  );
};

export default HomeMenu;

export const getStaticProps = getStaticPropsFactory(['page-menu']);

HomeMenu.defaultProps = { authLevel: 'public' };
