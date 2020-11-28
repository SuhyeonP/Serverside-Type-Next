import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import { END } from '@redux-saga/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { LOAD_SHOP_REQUEST } from '../../reducers/shop';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import PickMenu from '../../components/userPick';
import { singleShopCss } from '../../css/singleShop';

export const menuPart1 = [{ part: 'main' }, { part: 'sub' }, { part: 'drink' }];

const Shop = () => {
  const { single1Shop } = useSelector((state:any) => state.shop);
  const { me, testData } = useSelector((state:any) => state.user);
  const [loading, setLoading] = useState(false);
  const [master, setMaster] = useState(false);
  const [seeN, setSeeN] = useState('123');
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (loading) {
      if (single1Shop.master === me.id) {
        setMaster(true);
      }
    }
  }, [me]);

  useEffect(() => {
    if (testData !== null) {
      alert(`${testData.price}가 ${testData.Shop.shopName}주문 되었습니다.홈으로 돌아갑니다.`);
      router.push('/');
    }
  }, [testData]);

  const changeName = useCallback((part) => {
    const modiName = prompt('바꿀이름을 적어주세요');
    const checking: boolean = confirm(`${modiName}이 맞습니까?`);
    if (checking) {
      console.log(modiName);
    } else {
      alert('취소되었습니다.');
    }
  }, []);
  const openTable = useCallback((part) => {
    document.getElementById(`rmt-${seeN}`).style.display = 'none';
    setSeeN(part);
    document.getElementById(`rmt-${part}`).style.display = 'block';
  }, [seeN]);

  useEffect(() => {
    if (me) {
      document.getElementById('admin-logout').style.display = 'none';
    }
  }, [me]);

  return (
    <>
      <div css={singleShopCss}>
        <h3>
          {single1Shop.shopName}
          &nbsp;
          {master && <ControlOutlined />}
        </h3>
        <p className="address">{single1Shop.address}</p>
        <input hidden id="rmt-123" />
        <div className="shop-image">
          <img
            src="https://m.upinews.kr/data/upi/image/20190920/p1065572263048679_345_thum.jpg"
            id="img-shop"
          />
        </div>
        <PickMenu master={master} me={me} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SHOP_REQUEST,
    data: { shopId: context.params.shopId, lastId: 0 },
  });
  context.store.dispatch(END);
  // @ts-ignore
  await context.store.sagaTask.toPromise();
});

export default Shop;
