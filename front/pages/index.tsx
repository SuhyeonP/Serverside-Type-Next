import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { GetServerSideProps } from 'next';

import { GET_ORDER_REQUEST, LOAD_MAIN_SHOPS_REQUEST, LOAD_SHOP_REQUEST } from '../reducers/shop';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import MainShops from '../components/mainShops';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainShops, hasMoreShop } = useSelector((state) => state.shop);
  const countRef = useRef([]);


  const onScroll = useCallback(() => {
    if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) {
      if (hasMoreShop) {
        const lastId = mainShops[mainShops.length - 1]?.id;
        dispatch({
          type: LOAD_MAIN_SHOPS_REQUEST,
          lastId,
        });
        countRef.current.push(lastId);
      }
    }
  }, [hasMoreShop, mainShops.length]);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreShop, mainShops.length]);

  return (
    <>
      {me && (
        <>
          <ul>
            {mainShops.map((ele) => (
              <>
                <MainShops key={ele.id} shopInfo={ele} />
              </>
            ))}
          </ul>
        </>
      )}
      {!me && <p>로그인 이후 이용이 가능합니다.</p>}
    </>
  );
};

export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MAIN_SHOPS_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SHOP_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
