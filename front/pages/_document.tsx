import React, { ReactElement } from 'react';
import Document, {Main, NextScript, DocumentContext, Head, Html} from 'next/document';
import { Helmet, HelmetData } from 'react-helmet';
import { commonCss } from '../css/newLayout';

interface Props {
  helmet: HelmetData,
  styles: ReactElement,
}

export default class MyDocument extends Document<Props> {
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
        helmet: Helmet.renderStatic(),
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
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <Html {...htmlAttrs} lang="ko">
        <Head>
          {this.props.styles}
          {Object.values(helmet).map((el) => el.toComponent())}
        </Head>
        <body {...bodyAttrs} css={commonCss}>
          <Main />
          {process.env.NODE_ENV === 'production'
        && <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />}
          <NextScript />
        </body>
      </Html>
    );
  }
}
