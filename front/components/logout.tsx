import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { BellOutlined, BellTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { alerm, logout } from '../css/layout';
import { LOG_OUT_REQUEST } from '../reducers/user';

const LogOut = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { getOrderError, getOrdered } = useSelector((state) => state.shop);
  const [shopBell, setShopBell] = useState('.shop-notOrder');

  useEffect(() => {
    if (getOrdered) {
      setShopBell('.shop-orderIn');
    }
    if (getOrderError) {
      setShopBell('.shop-notOrder');
      console.log(getOrderError);
    }
  }, [getOrderError, getOrdered]);

  const logOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };
  return (
    <>
      <p css={logout} id="admin-logout" onClick={logOut}>Log out</p>
      {me.shopMaster === 0 ? <BellTwoTone className={shopBell} css={alerm} /> : <BellOutlined css={alerm} />}
    </>
  );
};

export default LogOut;
