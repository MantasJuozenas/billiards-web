import { buildPath, routes } from '@constants/routes';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const LinksDefaultAdmin = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const params = router?.query as G.IQueryParams;

  const links: G.ILink[] = [
    {
      to: buildPath(routes['admin/time-blocking'], { ...params }),
      route: routes['admin/time-blocking'],
      label: t(`navbar:::LinksDefaultAdmin::text1`),
      icon: '',
      isAuthRoute: true
    }
  ];

  return { links };
};
