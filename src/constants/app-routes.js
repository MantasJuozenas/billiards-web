const home = '/';
// const lang = '/[lang]';

const en = {
  home,
  // lang,
  login: `/login`,
  'admin-login': `/admin-login`,
  logout: `/logout`,
  menu: `/menu`,
  cart: `/cart`,
  contacts: `/contacts`,
  'about-us': `/about-us`,
  'our-tables': `/our-tables`,
  'es-support': `/es-support`,
  'order-success': `/order-success`,

  /** profile */
  profile: `/profile`,
  'profile/my-points': `/profile/my-points`,

  /** admin */
  admin: '/admin',
  'admin/time-blocking': '/admin/time-blocking'
};

/**
 * @type {Record<keyof typeof en, string>} ltRoutes
 */
const lt = {
  home,
  // lang,
  login: `/prisijungti`,
  'admin-login': `/admin-prisijungti`,
  logout: `/atsijungti`,
  menu: `/menu`,
  cart: `/krepselis`,
  contacts: `/kontaktai`,
  'about-us': `/apie-mus`,
  'our-tables': `/musu-stalai`,
  'es-support': `/es-parama`,
  'order-success': `/order-success`,

  /** profile */
  profile: `/profilis`,
  'profile/my-points': `/profilis/mano-taskai`,

  /** admin */
  admin: '/admin',
  'admin/time-blocking': '/admin/laiko-blokavimas'
};

const appRoutes = { en, lt };

const BuildRewritesBeforeFiles = () => {
  /**
   * @type {import('next/dist/lib/load-custom-routes').Rewrite[]}
   */
  const beforeFiles = [{ source: appRoutes.en.home, destination: home }];

  Object?.keys?.(appRoutes)?.forEach?.((locale) => {
    if (locale === 'en') return;

    const routeLocale = appRoutes?.[locale];

    Object?.keys?.(routeLocale)?.forEach?.((route) => {
      const isHomeRoute = route === 'home';
      const source = routeLocale?.[route];
      const destination = `/${isHomeRoute ? '' : route}`;

      if (source === destination) return;

      beforeFiles?.push?.({ source, destination });
    });
  });

  return { beforeFiles };
};

module.exports = { appRoutes, en, lt, BuildRewritesBeforeFiles };
