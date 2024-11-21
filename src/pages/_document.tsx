// import Document from 'next/document';
// import React from 'react';
// import { ServerStyleSheet } from 'styled-components';

// // @ts-ignore
// export default class MyDocument extends Document {
//   static async getInitialProps(ctx: any) {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App: any) => (props: any) =>
//             sheet.collectStyles(<App {...props} />)
//         });

//       const initialProps = await Document.getInitialProps(ctx);
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         )
//       };
//     } finally {
//       sheet.seal();
//     }
//   }
// }

import createEmotionCache from '@components/utils/pixinn/mui/create-motion-cache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

// @ts-ignore
export default class MyDocument extends Document {
  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with static-site generation (SSG).
  static async getInitialProps(ctx: DocumentContext) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
      // However, be aware that it can have global side effects.
      const cache = createEmotionCache();
      const { extractCriticalToChunks } = createEmotionServer(cache);

      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      // This is important. It prevents emotion to render invalid HTML.
      // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
      const emotionStyles = extractCriticalToChunks(initialProps.html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));

      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
        emotionStyleTags
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
