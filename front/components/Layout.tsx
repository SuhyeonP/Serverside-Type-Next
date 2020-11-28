import Link from 'next/link';
import React, { ReactElement, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { loginRequestAction, loginRequestShopAction } from '../reducers/user';
import LogOut from './logout';
import { headerList } from '../css/newLayout';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const test = 'test';
  const LoginDummy = useCallback((userId) => {
    dispatch(loginRequestAction({ userId, test }));
  }, []);
  const LoginShopDummy = useCallback((userId, shopId) => {
    console.log(userId, test, shopId);
    dispatch(loginRequestShopAction({ userId, shopId }));
  }, []);
  const user = ['user1', 'user2', 'user3'];
  const shop = ['shop1', 'shop2', 'shop3', 'shop4', 'shop5', 'shop6'];

  return (
    <>
      <div css={headerList}>
        {me ? <LogOut /> : (
          <>
            <div className="dummy-login">
              {user.map((ele) => <p onClick={() => LoginDummy(ele)}>{ele}</p>)}
              {shop.map((element, ind) => <p onClick={() => LoginShopDummy(element, ind + 1)} className="shop">{element}</p>)}
              <p><Link href="/admin/signup"><a>SignUp</a></Link></p>
            </div>
          </>
        )}
        <Link href="/">
          <a className="goto-home">
            <HomeOutlined />
            <p>home</p>
          </a>
        </Link>
        <h2 className="main-title">
          이용자들은 주문을 할 수 있고,
          <br />
          {' '}
          가게는 주문을 받을 수 있어요!!
        </h2>
        <div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AppLayout;
