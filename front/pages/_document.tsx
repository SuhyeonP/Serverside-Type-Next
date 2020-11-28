import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { commonCss } from '../css/newLayout';

export default class MyDocument extends Document {
  // eslint-disable-next-line consistent-return
  static async getInitialProps(ctx:DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => (<App {...props} />),
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body css={commonCss}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
