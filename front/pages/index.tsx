import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { GetServerSideProps } from 'next';

import { LOAD_MAIN_SHOPS_REQUEST, LOAD_SHOP_REQUEST } from '../reducers/shop';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import MainShops from '../components/mainShops';
import { mainHomeShops } from '../css/homeShop';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state:any) => state.user);
  const { mainShops, hasMoreShop } = useSelector((state:any) => state.shop);
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

  useEffect(() => {
    if (me) {
      document.getElementById('admin-logout').style.display = 'block';
    }
  }, [me]);

  return (
    <>
      {me && (
        <>
          <ul css={mainHomeShops}>
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
    data: { shopId: 1, lastId: 0 },
  });
  context.store.dispatch(END);
  // @ts-ignore
  await context.store.sagaTask.toPromise();
});

export default Home;
