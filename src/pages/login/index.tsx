import { LayoutSSR } from '@components/layout';
import { PageLogin } from '@components/pages/login';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeLogin: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR
      showNavbar
      showSidePanel={false}
      layoutClassNames={['navBorderBottom']}
    >
      <PageLogin />
    </LayoutSSR>
  );
};

export default HomeLogin;

HomeLogin.defaultProps = { authLevel: 'public' };

export const getStaticProps = getStaticPropsFactory();
