import { LayoutSSR } from '@components/layout';
import { PageContacts } from '@components/pages/contacts';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeContacts: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR layoutClassNames={['navBorderBottom']}>
      <PageContacts />
    </LayoutSSR>
  );
};

export default HomeContacts;

export const getStaticProps = getStaticPropsFactory(['page-contacts']);

HomeContacts.defaultProps = { authLevel: 'public' };
