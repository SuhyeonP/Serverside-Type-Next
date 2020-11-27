import React from 'react';
import { GetServerSidePropsContext } from 'next-redux-wrapper';
import { Helmet } from 'react-helmet';
import wrapper from '../store/configureStore';
import AppLayout from '../components/Layout';

function SUhyeon({ Component }) {
  return (
    <>
      <Helmet
        title="suhyeon"
        meta={[{ name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover' }]}
      />
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
}
// SUhyeon.getInitialProps = async (context) => {
//   const { ctx, Component } = context;
//   let pageProps = {};
//   const state = ctx.store.getState();
//   const newState = ctx.store.GetServerSidePropsContext;
//   console.log('thisisstate', newState);
//   if (Component.getInitialProps) {
//     pageProps = await context.Component.getInitialProps(ctx);
//   }
//   return { pageProps };
// };

export default wrapper.withRedux(SUhyeon);
