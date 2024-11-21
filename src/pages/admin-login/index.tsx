import { LayoutAdminSSR } from '@components/layout';
import { PageAdminLogin } from '@components/pages/admin-login';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeAdminLogin: G.TExtendedNextPageProps = () => {
  return (
    <LayoutAdminSSR
      showNavbar={false}
      showSidePanel={false}
      showFooter={false}
      layoutClassNames={['navBorderBottom']}
    >
      <PageAdminLogin />
    </LayoutAdminSSR>
  );
};

export default HomeAdminLogin;

HomeAdminLogin.defaultProps = { authLevel: 'public' };

export const getStaticProps = getStaticPropsFactory();
