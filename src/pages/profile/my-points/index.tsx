import { Layout } from '@components/layout';
import { PageMyPoints } from '@components/pages/profile/my-points';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeMyPoints: G.TExtendedNextPageProps = () => {
  //
  return (
    <Layout>
      <PageMyPoints />
    </Layout>
  );
};

export default HomeMyPoints;

HomeMyPoints.defaultProps = { authLevelDic: { public: false, user: true } };

export const getStaticProps = getStaticPropsFactory(['page-my-points']);

// export const getServerSideProps: G.TGetServerSideProps = async (ctx) => {
//   const locale = ctx?.locale as G.TDefaultLocales;
//   console.log('__getServerSideProps', { locale });

//   return { props: { pageSeo: {} } };
// };
