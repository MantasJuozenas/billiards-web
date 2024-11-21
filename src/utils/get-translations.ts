import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
/**
 * https://www.npmjs.com/package/next-i18next
 */
const defaultNs = [
  'common',
  'navbar',
  'footer',
  'side-panel',
  'modals-and-forms',
  'shared',
  'toast'
];

export const getServerSideProps: G.TGetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string))
    }
  };
};

export const getServerSidePropsFactory =
  (namespaces = defaultNs): G.TGetServerSideProps =>
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(
          locale as string,
          namespaces?.length ? defaultNs?.concat(namespaces) : defaultNs
        ))
      }
    };
  };

export const GetServerSidePropsTranslations = async (
  locale: string,
  namespaces = defaultNs
) => {
  return {
    ...(await serverSideTranslations(
      locale as string,
      namespaces?.length ? defaultNs?.concat(namespaces) : defaultNs
    ))
  };
};

export const getStaticProps: G.TGetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string))
    }
  };
};

export const getStaticPropsFactory = (
  namespaces = defaultNs
): G.TGetStaticProps => {
  return async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(
          locale as string,
          namespaces?.length ? defaultNs?.concat(namespaces) : defaultNs
        ))
      }
    };
  };
};

/**
 * Need to use with dynamic routes and when translations is used
 */
export const GetStaticPaths = (): G.TGetStaticPaths => {
  return async () => {
    return { paths: [], fallback: 'blocking' };
  };
};
