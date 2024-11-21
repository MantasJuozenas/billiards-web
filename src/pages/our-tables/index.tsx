import { LayoutSSR } from '@components/layout';
import { PageOurTables } from '@components/pages/our-tables';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeContacts: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR layoutClassNames={['navBorderBottom']}>
      <PageOurTables />
    </LayoutSSR>
  );
};

export default HomeContacts;

export const getStaticProps = getStaticPropsFactory(['page-our-tables']);

HomeContacts.defaultProps = { authLevel: 'public' };
