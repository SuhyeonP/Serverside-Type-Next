import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { BellOutlined, BellTwoTone } from '@ant-design/icons';
import {alerm, headerList, logout, shop, user} from '../css/layout';
import { LOG_OUT_REQUEST } from '../reducers/user';

const LogOut = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };
  return (
    <>
      <p css={logout} id="admin-logout" onClick={logOut}>Log out</p>
      {me.shopMaster === 0 ? <BellTwoTone css={alerm} /> : <BellOutlined css={alerm} />}
    </>
  );
};

export default LogOut;
