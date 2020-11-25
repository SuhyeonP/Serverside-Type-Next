import React from 'react';
import { GetServerSideProps } from 'next';
import wrapper from '../store/configureStore';
import { backUrl } from '../exporthing/config';
import AppLayout from '../components/Layout';

function SUhyeon({ Component }) {
  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}
export const getServerSideProps:GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(backUrl);
  const data = await res.json();

  // 객체형태로 전달
  return { props: { data } };
};

export default wrapper.withRedux(SUhyeon);
