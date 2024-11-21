import { buildPath, routes } from '@constants/routes';
import { useRouter } from 'next/router';
import React from 'react';

const Page500 = () => {
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const handlerRedirect = () => {
    router.push(buildPath(routes.home, { ...params }));
  };

  React.useEffect(() => {
    handlerRedirect();
  }, []);

  return <h1>500 - Page Not Found</h1>;
};

export default Page500;
