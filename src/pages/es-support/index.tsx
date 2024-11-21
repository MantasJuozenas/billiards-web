import { LayoutSSR } from '@components/layout';
import { PageEsSupport } from '@components/pages/es-support';
import { getStaticPropsFactory } from '@utilsFn/get-translations';
import React from 'react';

const HomeEsSupport: G.TExtendedNextPageProps = () => {
  return (
    <LayoutSSR layoutClassNames={['navBorderBottom']}>
      <PageEsSupport />
    </LayoutSSR>
  );
};

export default HomeEsSupport;

export const getStaticProps = getStaticPropsFactory(['page-es-support']);

HomeEsSupport.defaultProps = { authLevel: 'public' };
