// import { Layout } from '@components/layout';
import { PageLogout } from '@components/pages/logout';
import React from 'react';

const HomeLogout: G.TExtendedNextPageProps = () => {
  //
  return (
    // <Layout showNavbar={false} showSidePanel={false} showFooter={false}>
    <PageLogout />
    // </Layout>
  );
};

export default HomeLogout;

HomeLogout.defaultProps = { authLevel: 'public' };
