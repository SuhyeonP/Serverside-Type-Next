import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { BellOutlined, BellTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { alerm, logout, Nalerm } from '../css/layout';
import { LOG_OUT_REQUEST } from '../reducers/user';
import { GET_ORDER_REQUEST } from '../reducers/shop';

const LogOut = () => {
  const { me } = useSelector((state) => state.user);
  const { shopIsMe } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { getOrderError, getOrdered, getOrder } = useSelector((state) => state.shop);
  const [shopBell, setShopBell] = useState('Nalerm');

  useEffect(() => {
    if (me && shopIsMe) {
      const shopId = shopIsMe.id;
      console.log({ shopId });
      dispatch({
        type: GET_ORDER_REQUEST,
        data: { shopId },
      });
    } else if (me) {
      console.log('customer');
    }
  }, [me, shopIsMe]);

  useEffect(() => {
    if (getOrdered) {
      setShopBell('alerm');
    }
    if (getOrderError) {
      setShopBell('Nalerm');
      console.log(getOrderError);
    }
    if (getOrder) {
      setShopBell('alerm');
    } else {
      setShopBell('Nalerm');
    }
  }, [getOrderError, getOrdered, getOrder]);

  const logOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };
  return (
    <>
      <p css={logout} id="admin-logout" onClick={logOut}>Log out</p>
      {me.shopMaster === 0 ? <BellTwoTone css={shopBell} /> : <BellOutlined css={alerm} />}
    </>
  );
};

export default LogOut;
