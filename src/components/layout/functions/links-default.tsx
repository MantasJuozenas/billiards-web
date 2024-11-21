/* eslint-disable sonarjs/no-duplicate-string */
import { buildPath, routes } from '@constants/routes';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const LinksDefault = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const params = router?.query as G.IQueryParams;

  const isKaunas = GetRestaurantLocation()?.isKaunas;

  // const totalCount = useSelector((s) => s.cart.totalCount);

  const linksKaunas: G.ILink[] = [
    {
      to: buildPath(routes.home, { ...params }),
      route: routes.home,
      label: t(`navbar:::LinksDefault::text1`),
      icon: '',
      activeRoutes: [routes.home]
    },
    // {
    //   to: buildPath(routes.menu, { ...params }),
    //   route: routes.menu,
    //   label: t(`navbar:::LinksDefault::text2`),
    //   icon: ''
    // },
    // {
    //   to: buildPath(routes.cart, { ...params }),
    //   route: routes.cart,
    //   label: t(`navbar:::LinksDefault::text3`),
    //   icon: '',
    //   count: totalCount
    // },
    {
      to: buildPath(routes['profile/my-points'], { ...params }),
      route: routes['profile/my-points'],
      label: t(`navbar:::LinksDefault::text4`),
      icon: '',
      isAuthRoute: true,
      activeRoutes: [routes.login, routes['profile/my-points']]
    },
    {
      to: buildPath(routes['our-tables'], { ...params }),
      route: routes['our-tables'],
      label: t(`navbar:::LinksDefault::text5`),
      icon: '',
      activeRoutes: [routes['our-tables']]
    },
    {
      to: buildPath(routes['about-us'], { ...params }),
      route: routes['about-us'],
      label: t(`navbar:::LinksDefault::text6`),
      icon: '',
      activeRoutes: [routes['about-us']]
    },

    {
      to: buildPath(routes['es-support'], { ...params }),
      route: routes['es-support'],
      label: t(`navbar:::LinksDefault::text8`),
      icon: '',
      activeRoutes: [routes['es-support']]
    },
    {
      to: buildPath(routes.contacts, { ...params }),
      route: routes.contacts,
      label: t(`navbar:::LinksDefault::text7`),
      icon: '',
      activeRoutes: [routes.contacts]
    }
  ];

  const linksVilnius: G.ILink[] = [
    {
      to: buildPath(routes.home, { ...params }),
      route: routes.home,
      label: t(`navbar:::LinksDefault::text1`),
      icon: '',
      activeRoutes: [routes.home]
    },
    // {
    //   to: buildPath(routes.menu, { ...params }),
    //   route: routes.menu,
    //   label: t(`navbar:::LinksDefault::text2`),
    //   icon: ''
    // },
    // {
    //   to: buildPath(routes.cart, { ...params }),
    //   route: routes.cart,
    //   label: t(`navbar:::LinksDefault::text3`),
    //   icon: '',
    //   count: totalCount
    // },
    {
      to: buildPath(routes['profile/my-points'], { ...params }),
      route: routes['profile/my-points'],
      label: t(`navbar:::LinksDefault::text4`),
      icon: '',
      isAuthRoute: true,
      activeRoutes: [routes.login, routes['profile/my-points']]
    },
    {
      to: buildPath(routes['our-tables'], { ...params }),
      route: routes['our-tables'],
      label: t(`navbar:::LinksDefault::text5`),
      icon: '',
      activeRoutes: [routes['our-tables']]
    },
    {
      to: buildPath(routes['about-us'], { ...params }),
      route: routes['about-us'],
      label: t(`navbar:::LinksDefault::text6`),
      icon: '',
      activeRoutes: [routes['about-us']]
    },
    {
      to: buildPath(routes.contacts, { ...params }),
      route: routes.contacts,
      label: t(`navbar:::LinksDefault::text7`),
      icon: '',
      activeRoutes: [routes.contacts]
    }
  ];

  const links: G.ILink[] = isKaunas ? linksKaunas : linksVilnius;

  return { links };
};
