import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { BellTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { LOG_OUT_REQUEST } from '../reducers/user';
import ShopBell from './shopperOrder';

const LogOut = () => {
  const { me } = useSelector((state:any) => state.user);
  const { shopIsMe, getOrder, getOrdered } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me && shopIsMe) {
      const shopId = shopIsMe.id;
      console.log({ shopId });
    } else if (me) {
      console.log('customer');
    }
  }, [me, shopIsMe]);

  const logOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };
  useEffect(() => {
    console.log(getOrder);
  }, [getOrdered]);
  return (
    <>
      {me.shopMaster === 0 ? <BellTwoTone /> : <ShopBell />}
      <div className="logout-button" id="admin-logout"><p onClick={logOut}>Log out</p></div>
    </>
  );
};

export default LogOut;
