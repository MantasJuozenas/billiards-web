import { LayoutSSR } from '@components/layout';
import { PageHome } from '@components/pages';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const Home: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR
      // showNavbar={false}
      // showWebNavbar={false}
      // showTabletNavbar={false}
      // showMobileNavbar={false}

      // showSidePanel={false}
      // showWebSidePanel={false}
      // showTabletSidePanel={false}
      // showMobileSidePanel={false}

      // showFooter={false}
      // showWebFooter={false}
      // showTabletFooter={false}
      // showMobileFooter={false}

      // mainContentUnderNavbar
      layoutClassNames={['navBorderBottom']}
    >
      <PageHome />
    </LayoutSSR>
  );
};

export default Home;

Home.defaultProps = { authLevel: 'public' };

export const getStaticProps = getStaticPropsFactory();

// export const getServerSideProps: G.TGetServerSideProps = async (ctx) => {
//   const locale = ctx?.locale as G.TDefaultLocales;
//   console.log('__getServerSideProps', { locale });

//   return { props: { pageSeo: {} } };
// };
