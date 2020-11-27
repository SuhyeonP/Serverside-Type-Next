import React from 'react';
import { GetServerSidePropsContext } from 'next-redux-wrapper';
import wrapper from '../store/configureStore';
import AppLayout from '../components/Layout';

function SUhyeon({ Component }) {
  return (
    <AppLayout>
      <Component />
    </AppLayout>
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
