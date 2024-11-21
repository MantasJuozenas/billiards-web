/* eslint-disable eqeqeq */
function GoogleTagManagerInit(w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': Date.now(),
    event: 'gtm.js'
  });
  const f = d.getElementsByTagName(s)[0];
  const index = d.createElement(s);
  const dl = l != 'dataLayer' ? `&l=${l}` : '';
  index.async = true;
  index.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
  f.parentNode.insertBefore(index, f);
}

GoogleTagManagerInit(window, document, 'script', 'dataLayer', 'GTM-WTNCB58T');
