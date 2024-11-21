import { LayoutAdmin } from '@components/layout';
import { PageTimeBlocking } from '@components/pages/admin/time-blocking';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeTimeBlocking: G.TExtendedNextPageProps = () => {
  //
  return (
    <LayoutAdmin layoutClassNames={['navBorderBottom']}>
      <PageTimeBlocking />
    </LayoutAdmin>
  );
};

export default HomeTimeBlocking;

HomeTimeBlocking.defaultProps = { authLevel: 'administrator' };

export const getStaticProps = getStaticPropsFactory(['page-time-blocking']);

// export const getServerSideProps: G.TGetServerSideProps = async (ctx) => {
//   const locale = ctx?.locale as G.TDefaultLocales;
//   console.log('__getServerSideProps', { locale });

//   return { props: { pageSeo: {} } };
// };
