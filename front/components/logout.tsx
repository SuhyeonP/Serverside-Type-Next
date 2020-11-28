import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { BellTwoTone } from '@ant-design/icons';
import { useCallback } from 'react';
import { LOG_OUT_REQUEST, logoutRequestAction } from '../reducers/user';
import ShopBell from './shopperOrder';

const LogOut = () => {
  const { me } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch({ type: logoutRequestAction });
  }, []);
  return (
    <>
      {me.shopMaster === 0 ? <BellTwoTone /> : <ShopBell />}
      <div className="logout-button" id="admin-logout"><p onClick={logOut}>Log out</p></div>
    </>
  );
};

export default LogOut;
