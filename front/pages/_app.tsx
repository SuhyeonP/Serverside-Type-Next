import React from 'react';
import wrapper from '../store/configureStore';
import AppLayout from '../components/Layout';

function SUhyeon({ Component }) {
  return (
    <>
      <Component />
    </>
  );
}

export default wrapper.withRedux(SUhyeon);
